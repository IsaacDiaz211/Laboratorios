import prompts from "prompts";

type SelectChoice<T> = {
  title: string;
  value: T;
  description?: string;
  disabled?: boolean;
};

type NumberOptions = {
  min?: number;
  max?: number;
  float?: boolean;
  initial?: number;
};

type NumbersListOptions = NumberOptions & {
  label?: string;
  integerOnly?: boolean;
};

function handleCancel(): void {
  console.log("Operacion cancelada.");
  process.exit(0);
}

function validateNumber(value: number, options: NumberOptions): true | string {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    return "Ingrese un numero valido.";
  }
  if (!options.float && !Number.isInteger(value)) {
    return "Ingrese un numero entero.";
  }
  if (options.min !== undefined && value < options.min) {
    return `El numero debe ser >= ${options.min}.`;
  }
  if (options.max !== undefined && value > options.max) {
    return `El numero debe ser <= ${options.max}.`;
  }
  return true;
}

export async function askSelect<T>(
  message: string,
  choices: SelectChoice<T>[]
): Promise<T> {
  const response = await prompts(
    {
      type: "select",
      name: "value",
      message,
      choices,
    },
    { onCancel: handleCancel }
  );
  return response.value as T;
}

export async function askConfirm(
  message: string,
  initial = true
): Promise<boolean> {
  const response = await prompts(
    {
      type: "confirm",
      name: "value",
      message,
      initial,
    },
    { onCancel: handleCancel }
  );
  return Boolean(response.value);
}

export async function askText(message: string): Promise<string> {
  const response = await prompts(
    {
      type: "text",
      name: "value",
      message,
      validate: (value: string) =>
        value && String(value).trim().length > 0
          ? true
          : "Ingrese un valor valido.",
    },
    { onCancel: handleCancel }
  );
  return String(response.value).trim();
}

export async function askNumber(
  message: string,
  options: NumberOptions = {}
): Promise<number> {
  const response = await prompts(
    {
      type: "number",
      name: "value",
      message,
      min: options.min,
      max: options.max,
      float: options.float ?? false,
      initial: options.initial,
      validate: (value: number) => validateNumber(value, options),
    },
    { onCancel: handleCancel }
  );
  return Number(response.value);
}

export async function askInteger(
  message: string,
  options: Omit<NumberOptions, "float"> = {}
): Promise<number> {
  return askNumber(message, { ...options, float: false });
}

export async function askPositiveInteger(message: string): Promise<number> {
  return askInteger(message, { min: 1 });
}

export async function askFileName(message: string): Promise<string> {
  return askText(message);
}

export async function askNumbersList(
  count: number,
  options: NumbersListOptions = {}
): Promise<number[]> {
  const numbers: number[] = [];
  const label = options.label ?? "Ingrese el numero";
  for (let i = 0; i < count; i += 1) {
    const value = await askNumber(`${label} ${i + 1}`, {
      min: options.min,
      max: options.max,
      float: options.integerOnly ? false : options.float,
    });
    numbers.push(value);
  }
  return numbers;
}
