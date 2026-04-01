import type { Vector } from "../../core/matrix";

const EPSILON = 1e-12;
const EQUIDISTANT_TOLERANCE = 1e-9;

export type FiniteDifferenceDirection = "forward" | "backward";

export type FiniteDifferenceTable = {
  xValues: Vector;
  columns: Vector[];
  direction: FiniteDifferenceDirection;
};

export type ErrorMetrics = {
  absoluteError: number;
  relativeError: number | null;
  warning?: string;
};

function validateNumericArray(values: Vector, label: string): void {
  if (values.length === 0) {
    throw new Error(`El arreglo ${label} no puede estar vacio.`);
  }

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error(`El valor ${label}[${index + 1}] no es un numero valido.`);
    }
  }
}

/**
 * Valida que dos vectores tabulados tengan numeros validos y la misma longitud.
 * @param xValues Vector de nodos en x.
 * @param yValues Vector de valores en y.
 * @returns No retorna valor; lanza error si la tabla no es valida.
 */
export function validatePairedData(xValues: Vector, yValues: Vector): void {
  validateNumericArray(xValues, "xValues");
  validateNumericArray(yValues, "yValues");

  if (xValues.length !== yValues.length) {
    throw new Error("xValues e yValues deben tener la misma longitud.");
  }
}

/**
 * Verifica que un vector tenga la cantidad minima de puntos requerida.
 * @param values Vector cuya longitud se desea validar.
 * @param minPoints Cantidad minima exigida.
 * @param methodName Nombre del metodo para el mensaje de error.
 * @returns No retorna valor; lanza error si faltan puntos.
 */
export function validateMinimumPoints(
  values: Vector,
  minPoints: number,
  methodName: string
): void {
  if (values.length < minPoints) {
    throw new Error(`${methodName} requiere al menos ${minPoints} puntos.`);
  }
}

/**
 * Verifica que un vector tenga exactamente la cantidad de puntos esperada.
 * @param values Vector cuya longitud se desea validar.
 * @param expectedPoints Cantidad exacta exigida por la formula.
 * @param methodName Nombre del metodo para el mensaje de error.
 * @returns No retorna valor; lanza error si la longitud no coincide.
 */
export function validateExactPoints(
  values: Vector,
  expectedPoints: number,
  methodName: string
): void {
  if (values.length !== expectedPoints) {
    throw new Error(`${methodName} requiere exactamente ${expectedPoints} puntos.`);
  }
}

/**
 * Verifica que no existan nodos repetidos dentro de un vector numerico.
 * @param values Vector de valores a revisar.
 * @param label Nombre del vector usado en el mensaje de error.
 * @returns No retorna valor; lanza error si detecta repeticiones.
 */
export function validateNoRepeatedValues(values: Vector, label: string): void {
  validateNumericArray(values, label);

  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      if (Math.abs(values[i] - values[j]) <= EPSILON) {
        throw new Error(
          `No se permiten valores repetidos en ${label} (posiciones ${i + 1} y ${j + 1}).`
        );
      }
    }
  }
}

/**
 * Verifica que los nodos x esten ordenados de forma estrictamente monotona.
 * @param xValues Vector de nodos en x.
 * @param methodName Nombre del metodo para el mensaje de error.
 * @returns No retorna valor; lanza error si el orden no es valido.
 */
export function validateStrictlyMonotonicNodes(
  xValues: Vector,
  methodName: string
): void {
  validateNumericArray(xValues, "xValues");
  if (xValues.length < 2) {
    return;
  }

  const firstDelta = xValues[1] - xValues[0];
  if (Math.abs(firstDelta) <= EPSILON) {
    throw new Error(`${methodName} no admite nodos repetidos en x.`);
  }

  const isIncreasing = firstDelta > 0;
  for (let index = 1; index < xValues.length; index += 1) {
    const delta = xValues[index] - xValues[index - 1];
    if (Math.abs(delta) <= EPSILON) {
      throw new Error(`${methodName} no admite nodos repetidos en x.`);
    }

    if ((delta > 0) !== isIncreasing) {
      throw new Error(`${methodName} requiere nodos ordenados de forma estrictamente monotona.`);
    }
  }
}

/**
 * Determina si los nodos tienen una separacion constante dentro de una tolerancia.
 * @param xValues Vector de nodos en x.
 * @param tolerance Tolerancia relativa para comparar el paso entre nodos.
 * @returns true si el paso es constante; false en caso contrario.
 */
export function areEquidistantNodes(
  xValues: Vector,
  tolerance = EQUIDISTANT_TOLERANCE
): boolean {
  validateNumericArray(xValues, "xValues");
  if (xValues.length < 2) {
    return true;
  }

  const step = xValues[1] - xValues[0];
  if (Math.abs(step) <= EPSILON) {
    return false;
  }

  for (let index = 2; index < xValues.length; index += 1) {
    const currentStep = xValues[index] - xValues[index - 1];
    const allowedDifference = tolerance * Math.max(1, Math.abs(step));
    if (Math.abs(currentStep - step) > allowedDifference) {
      return false;
    }
  }

  return true;
}

/**
 * Calcula el paso h entre nodos consecutivos cuando la tabla es equidistante.
 * @param xValues Vector de nodos en x.
 * @param methodName Nombre del metodo para el mensaje de error.
 * @returns Paso h, que puede ser positivo o negativo segun el orden de la tabla.
 */
export function getStepSize(xValues: Vector, methodName: string): number {
  validateMinimumPoints(xValues, 2, methodName);
  validateStrictlyMonotonicNodes(xValues, methodName);

  if (!areEquidistantNodes(xValues)) {
    throw new Error(`${methodName} requiere nodos equidistantes.`);
  }

  return xValues[1] - xValues[0];
}

/**
 * Devuelve el intervalo cubierto por un vector numerico.
 * @param values Vector numerico no vacio.
 * @returns Extremos minimo y maximo del vector.
 */
export function getIntervalBounds(values: Vector): { min: number; max: number } {
  validateNumericArray(values, "values");

  let min = values[0];
  let max = values[0];
  for (let index = 1; index < values.length; index += 1) {
    min = Math.min(min, values[index]);
    max = Math.max(max, values[index]);
  }

  return { min, max };
}

/**
 * Verifica que un valor objetivo se encuentre dentro del rango tabulado.
 * @param target Valor a validar.
 * @param values Vector de referencia para el rango.
 * @param variableName Nombre de la variable usado en el mensaje.
 * @param methodName Nombre del metodo que realiza la validacion.
 * @returns No retorna valor; lanza error si el objetivo queda fuera del rango.
 */
export function ensureValueInRange(
  target: number,
  values: Vector,
  variableName: string,
  methodName: string
): void {
  const { min, max } = getIntervalBounds(values);
  if (target < min - EPSILON || target > max + EPSILON) {
    throw new Error(`${methodName} no permite ${variableName} fuera del rango tabulado.`);
  }
}

/**
 * Construye la tabla triangular de diferencias finitas a partir de los valores y.
 * @param xValues Vector de nodos en x asociado a la tabla.
 * @param yValues Vector de valores en y.
 * @param direction Sentido preferido para mostrar la tabla en consola.
 * @returns Tabla con la columna original y todas sus diferencias sucesivas.
 */
export function buildFiniteDifferenceTable(
  xValues: Vector,
  yValues: Vector,
  direction: FiniteDifferenceDirection = "forward"
): FiniteDifferenceTable {
  validatePairedData(xValues, yValues);

  const columns: Vector[] = [[...yValues]];
  while (columns[columns.length - 1].length > 1) {
    const previousColumn = columns[columns.length - 1];
    const nextColumn: number[] = [];

    for (let index = 0; index < previousColumn.length - 1; index += 1) {
      nextColumn.push(previousColumn[index + 1] - previousColumn[index]);
    }

    columns.push(nextColumn);
  }

  return {
    xValues: [...xValues],
    columns,
    direction,
  };
}

/**
 * Calcula el error absoluto entre un valor aproximado y un valor de referencia.
 * @param approximate Valor obtenido por el metodo numerico.
 * @param reference Valor considerado correcto o esperado.
 * @returns Error absoluto |referencia - aproximado|.
 */
export function calculateAbsoluteError(approximate: number, reference: number): number {
  return Math.abs(reference - approximate);
}

/**
 * Calcula el error relativo usando el valor de referencia como denominador.
 * @param approximate Valor obtenido por el metodo numerico.
 * @param reference Valor considerado correcto o esperado.
 * @returns Error relativo o null cuando la referencia es cero.
 */
export function calculateRelativeError(
  approximate: number,
  reference: number
): number | null {
  if (Math.abs(reference) <= EPSILON) {
    return null;
  }

  return Math.abs((reference - approximate) / reference);
}

/**
 * Agrupa el error absoluto y relativo cuando existe un valor de referencia.
 * @param approximate Valor obtenido por el metodo numerico.
 * @param reference Valor de referencia dado por el usuario.
 * @returns Estructura con ambos errores y advertencia si el relativo no aplica.
 */
export function calculateErrorMetrics(
  approximate: number,
  reference: number
): ErrorMetrics {
  const relativeError = calculateRelativeError(approximate, reference);

  return {
    absoluteError: calculateAbsoluteError(approximate, reference),
    relativeError,
    warning:
      relativeError === null
        ? "No se puede calcular el error relativo cuando el valor de referencia es 0."
        : undefined,
  };
}
