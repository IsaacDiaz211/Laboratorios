import { readFile } from "fs/promises";
import path from "path";

export type NumberFileOptions = {
  expectedCount?: number;
  min?: number;
  max?: number;
  integerOnly?: boolean;
  positiveOnly?: boolean;
};

function normalizeFileName(fileName: string): string {
  const trimmed = fileName.trim();
  if (trimmed.toLowerCase().endsWith(".json")) {
    return trimmed;
  }
  return `${trimmed}.json`;
}

export async function readNumbersFromJson(
  fileName: string,
  options: NumberFileOptions = {}
): Promise<number[]> {
  const normalizedName = normalizeFileName(fileName);
  const fullPath = path.resolve(process.cwd(), "data", normalizedName);

  let raw: string;
  try {
    raw = await readFile(fullPath, "utf8");
  } catch (error) {
    throw new Error(`No se pudo leer el archivo: ${normalizedName}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`El archivo no contiene JSON valido: ${normalizedName}`);
  }

  const numbers = (parsed as { numeros?: unknown }).numeros;
  if (!Array.isArray(numbers)) {
    throw new Error('El archivo debe tener la propiedad "numeros" con un arreglo.');
  }

  if (options.expectedCount !== undefined && numbers.length !== options.expectedCount) {
    throw new Error(
      `El archivo debe contener ${options.expectedCount} numeros.`
    );
  }

  const result: number[] = [];
  for (let i = 0; i < numbers.length; i += 1) {
    const value = numbers[i];
    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error(`El valor en la posicion ${i + 1} no es un numero valido.`);
    }
    if (options.integerOnly && !Number.isInteger(value)) {
      throw new Error(`El valor en la posicion ${i + 1} debe ser entero.`);
    }
    if (options.positiveOnly && value <= 0) {
      throw new Error(`El valor en la posicion ${i + 1} debe ser positivo.`);
    }
    if (options.min !== undefined && value < options.min) {
      throw new Error(
        `El valor en la posicion ${i + 1} debe ser >= ${options.min}.`
      );
    }
    if (options.max !== undefined && value > options.max) {
      throw new Error(
        `El valor en la posicion ${i + 1} debe ser <= ${options.max}.`
      );
    }
    result.push(value);
  }

  return result;
}
