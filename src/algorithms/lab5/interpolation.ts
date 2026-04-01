import type { Vector } from "../../core/matrix";

const EPSILON = 1e-12;
const EQUIDISTANT_TOLERANCE = 1e-9;

export type DataPoint = {
  x: number;
  y: number;
};

export type FiniteDifferenceDirection = "forward" | "backward";

export type FiniteDifferenceTable = {
  xValues: Vector;
  columns: Vector[];
  direction: FiniteDifferenceDirection;
};

export type InterpolationErrorMetrics = {
  absoluteError: number;
  relativeError: number | null;
  warning?: string;
};

export type InterpolationResult = {
  value: number;
  warnings: string[];
};

export type NewtonGregoryResult = InterpolationResult & {
  differenceTable: FiniteDifferenceTable;
};

export type SelectedPointsInterpolationResult = InterpolationResult & {
  selectedPoints: DataPoint[];
};

export type ProgressiveParabolicResult = SelectedPointsInterpolationResult & {
  differenceTable: FiniteDifferenceTable;
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

function pairPoints(xValues: Vector, yValues: Vector): DataPoint[] {
  return xValues.map((x, index) => ({ x, y: yValues[index] }));
}

function getBounds(values: Vector): { min: number; max: number } {
  let min = values[0];
  let max = values[0];

  for (let index = 1; index < values.length; index += 1) {
    min = Math.min(min, values[index]);
    max = Math.max(max, values[index]);
  }

  return { min, max };
}

function pushWarning(warnings: string[], warning: string): void {
  if (!warnings.includes(warning)) {
    warnings.push(warning);
  }
}

function buildRangeWarnings(
  values: Vector,
  target: number,
  variableName: "x" | "y"
): string[] {
  const { min, max } = getBounds(values);
  if (target < min || target > max) {
    return [
      `El valor objetivo de ${variableName} esta fuera del intervalo tabulado; el resultado corresponde a una extrapolacion.`,
    ];
  }

  return [];
}

function distanceToInterval(target: number, left: number, right: number): number {
  const min = Math.min(left, right);
  const max = Math.max(left, right);

  if (target < min) {
    return min - target;
  }

  if (target > max) {
    return target - max;
  }

  return 0;
}

function factorial(order: number): number {
  let result = 1;
  for (let index = 2; index <= order; index += 1) {
    result *= index;
  }
  return result;
}

function getEquidistantStep(xValues: Vector, methodName: string): number {
  const step = xValues[1] - xValues[0];
  if (Math.abs(step) <= EPSILON) {
    throw new Error(`${methodName} no admite nodos repetidos en x.`);
  }

  if (!areEquidistantNodes(xValues)) {
    throw new Error(`${methodName} requiere nodos equidistantes.`);
  }

  return step;
}

function evaluateLagrangePolynomial(
  nodeValues: Vector,
  outputValues: Vector,
  target: number
): number {
  let result = 0;

  for (let i = 0; i < nodeValues.length; i += 1) {
    let basis = 1;
    for (let j = 0; j < nodeValues.length; j += 1) {
      if (i === j) {
        continue;
      }

      const denominator = nodeValues[i] - nodeValues[j];
      if (Math.abs(denominator) <= EPSILON) {
        throw new Error("Division por cero en los denominadores del polinomio de Lagrange.");
      }

      basis *= (target - nodeValues[j]) / denominator;
    }

    result += outputValues[i] * basis;
  }

  return result;
}

function buildSubsetWarnings(
  fullValues: Vector,
  subsetValues: Vector,
  target: number,
  variableName: "x" | "y"
): string[] {
  const warnings = buildRangeWarnings(fullValues, target, variableName);
  const { min, max } = getBounds(subsetValues);

  if (target < min || target > max) {
    pushWarning(
      warnings,
      `El valor objetivo de ${variableName} queda fuera del subconjunto usado; se esta extrapolando con los puntos seleccionados.`
    );
  }

  return warnings;
}

/**
 * Valida que las tablas x e y existan, tengan numeros validos y la misma longitud.
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
 * Verifica que una tabla tenga al menos la cantidad minima de puntos requerida.
 * @param values Vector cuya longitud se desea validar.
 * @param minPoints Cantidad minima exigida por el metodo.
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
 * Verifica que un vector no contenga valores repetidos para evitar denominadores nulos.
 * @param values Vector de valores a revisar.
 * @param label Nombre del vector usado en el mensaje de error.
 * @returns No retorna valor; lanza error si detecta repeticiones.
 */
export function validateNoRepeatedValues(values: Vector, label: string): void {
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
 * Verifica si existen puntos exactamente repetidos dentro de la tabla.
 * @param xValues Vector de nodos en x.
 * @param yValues Vector de valores en y.
 * @returns No retorna valor; lanza error si encuentra el mismo punto mas de una vez.
 */
export function validateNoRepeatedPoints(xValues: Vector, yValues: Vector): void {
  validatePairedData(xValues, yValues);

  for (let i = 0; i < xValues.length; i += 1) {
    for (let j = i + 1; j < xValues.length; j += 1) {
      if (
        Math.abs(xValues[i] - xValues[j]) <= EPSILON &&
        Math.abs(yValues[i] - yValues[j]) <= EPSILON
      ) {
        throw new Error(
          `El punto (${xValues[i]}, ${yValues[i]}) esta repetido en las posiciones ${i + 1} y ${j + 1}.`
        );
      }
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
 * Selecciona los puntos cuyo valor en x o y es mas cercano al objetivo solicitado.
 * @param xValues Vector de nodos en x.
 * @param yValues Vector de valores en y.
 * @param target Valor objetivo usado para medir cercania.
 * @param count Cantidad de puntos a seleccionar.
 * @param axis Eje sobre el cual se mide la cercania.
 * @returns Arreglo de puntos conservando el orden original dentro de la tabla.
 */
export function selectClosestPoints(
  xValues: Vector,
  yValues: Vector,
  target: number,
  count: number,
  axis: "x" | "y"
): DataPoint[] {
  validatePairedData(xValues, yValues);

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("La cantidad de puntos a seleccionar debe ser un entero positivo.");
  }

  if (count > xValues.length) {
    throw new Error(`No hay suficientes puntos para seleccionar ${count} nodos.`);
  }

  const points = pairPoints(xValues, yValues)
    .map((point, index) => ({
      point,
      index,
      distance: Math.abs((axis === "x" ? point.x : point.y) - target),
    }))
    .sort((left, right) => left.distance - right.distance || left.index - right.index)
    .slice(0, count)
    .sort((left, right) => left.index - right.index)
    .map((entry) => entry.point);

  return points;
}

/**
 * Selecciona una ventana de puntos consecutivos cercana al valor objetivo.
 * @param xValues Vector de nodos en x.
 * @param yValues Vector de valores en y.
 * @param target Valor x objetivo que guia la seleccion.
 * @param count Cantidad de nodos consecutivos requeridos.
 * @param requireEquidistant Indica si la ventana debe tener paso constante.
 * @returns Subconjunto consecutivo de la tabla original.
 */
export function selectConsecutivePoints(
  xValues: Vector,
  yValues: Vector,
  target: number,
  count: number,
  requireEquidistant = false
): DataPoint[] {
  validatePairedData(xValues, yValues);

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("La cantidad de puntos consecutivos debe ser un entero positivo.");
  }

  if (count > xValues.length) {
    throw new Error(`No hay suficientes puntos para seleccionar ${count} nodos consecutivos.`);
  }

  const points = pairPoints(xValues, yValues);
  const candidates: Array<{ points: DataPoint[]; score: number; firstDistance: number }> = [];

  for (let start = 0; start <= points.length - count; start += 1) {
    const window = points.slice(start, start + count);
    const windowXValues = window.map((point) => point.x);

    if (requireEquidistant && !areEquidistantNodes(windowXValues)) {
      continue;
    }

    candidates.push({
      points: window,
      score: distanceToInterval(target, window[0].x, window[window.length - 1].x),
      firstDistance: Math.abs(target - window[0].x),
    });
  }

  if (candidates.length === 0) {
    throw new Error(
      requireEquidistant
        ? `No se encontro un subconjunto consecutivo de ${count} puntos equidistantes.`
        : `No se pudo seleccionar un subconjunto consecutivo de ${count} puntos.`
    );
  }

  candidates.sort(
    (left, right) => left.score - right.score || left.firstDistance - right.firstDistance
  );

  return candidates[0].points;
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
 * Agrupa el error absoluto y relativo cuando el usuario provee una referencia.
 * @param approximate Valor obtenido por interpolacion.
 * @param reference Valor de referencia dado por el usuario.
 * @returns Errores calculados y una advertencia si el relativo no puede evaluarse.
 */
export function calculateErrorMetrics(
  approximate: number,
  reference: number
): InterpolationErrorMetrics {
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

/**
 * Evalua un valor usando Newton-Gregory ascendente sobre nodos equidistantes.
 * @param xValues Nodos de la tabla en x.
 * @param yValues Valores de la tabla en y.
 * @param xTarget Valor x donde se desea interpolar.
 * @returns Valor interpolado, advertencias y tabla de diferencias hacia adelante.
 */
export function newtonGregoryForward(
  xValues: Vector,
  yValues: Vector,
  xTarget: number
): NewtonGregoryResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 2, "Newton-Gregory ascendente");
  validateNoRepeatedPoints(xValues, yValues);
  validateNoRepeatedValues(xValues, "xValues");

  const step = getEquidistantStep(xValues, "Newton-Gregory ascendente");
  const differenceTable = buildFiniteDifferenceTable(xValues, yValues, "forward");
  const u = (xTarget - xValues[0]) / step;

  let value = differenceTable.columns[0][0];
  let product = 1;

  for (let order = 1; order < differenceTable.columns.length; order += 1) {
    product *= u - (order - 1);
    value += (product * differenceTable.columns[order][0]) / factorial(order);
  }

  return {
    value,
    warnings: buildRangeWarnings(xValues, xTarget, "x"),
    differenceTable,
  };
}

/**
 * Evalua un valor usando Newton-Gregory descendente sobre nodos equidistantes.
 * @param xValues Nodos de la tabla en x.
 * @param yValues Valores de la tabla en y.
 * @param xTarget Valor x donde se desea interpolar.
 * @returns Valor interpolado, advertencias y tabla de diferencias hacia atras.
 */
export function newtonGregoryBackward(
  xValues: Vector,
  yValues: Vector,
  xTarget: number
): NewtonGregoryResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 2, "Newton-Gregory descendente");
  validateNoRepeatedPoints(xValues, yValues);
  validateNoRepeatedValues(xValues, "xValues");

  const step = getEquidistantStep(xValues, "Newton-Gregory descendente");
  const differenceTable = buildFiniteDifferenceTable(xValues, yValues, "backward");
  const lastIndex = xValues.length - 1;
  const u = (xTarget - xValues[lastIndex]) / step;

  let value = differenceTable.columns[0][lastIndex];
  let product = 1;

  for (let order = 1; order < differenceTable.columns.length; order += 1) {
    product *= u + (order - 1);
    const column = differenceTable.columns[order];
    value += (product * column[column.length - 1]) / factorial(order);
  }

  return {
    value,
    warnings: buildRangeWarnings(xValues, xTarget, "x"),
    differenceTable,
  };
}

/**
 * Estima x a partir de un valor y usando interpolacion inversa lineal con 2 puntos.
 * @param xValues Nodos de la tabla en x.
 * @param yValues Valores de la tabla en y.
 * @param yTarget Valor y objetivo para despejar x.
 * @returns Valor x interpolado, advertencias y los 2 puntos utilizados.
 */
export function inverseLinearInterpolation(
  xValues: Vector,
  yValues: Vector,
  yTarget: number
): SelectedPointsInterpolationResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 2, "Interpolacion inversa lineal");
  validateNoRepeatedPoints(xValues, yValues);
  validateNoRepeatedValues(yValues, "yValues");

  const selectedPoints = selectClosestPoints(xValues, yValues, yTarget, 2, "y");
  const denominator = selectedPoints[1].y - selectedPoints[0].y;

  if (Math.abs(denominator) <= EPSILON) {
    throw new Error("Division por cero en la interpolacion inversa lineal.");
  }

  const value =
    selectedPoints[0].x +
    ((yTarget - selectedPoints[0].y) * (selectedPoints[1].x - selectedPoints[0].x)) /
      denominator;

  return {
    value,
    warnings: buildSubsetWarnings(
      yValues,
      selectedPoints.map((point) => point.y),
      yTarget,
      "y"
    ),
    selectedPoints,
  };
}

/**
 * Estima x a partir de un valor y usando interpolacion inversa cuadratica con 3 puntos.
 * @param xValues Nodos de la tabla en x.
 * @param yValues Valores de la tabla en y.
 * @param yTarget Valor y objetivo para despejar x.
 * @returns Valor x interpolado, advertencias y los 3 puntos utilizados.
 */
export function inverseQuadraticInterpolation(
  xValues: Vector,
  yValues: Vector,
  yTarget: number
): SelectedPointsInterpolationResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 3, "Interpolacion inversa cuadratica");
  validateNoRepeatedPoints(xValues, yValues);
  validateNoRepeatedValues(yValues, "yValues");

  const selectedPoints = selectClosestPoints(xValues, yValues, yTarget, 3, "y");
  const value = evaluateLagrangePolynomial(
    selectedPoints.map((point) => point.y),
    selectedPoints.map((point) => point.x),
    yTarget
  );

  return {
    value,
    warnings: buildSubsetWarnings(
      yValues,
      selectedPoints.map((point) => point.y),
      yTarget,
      "y"
    ),
    selectedPoints,
  };
}

/**
 * Evalua el polinomio interpolante de Lagrange para nodos no necesariamente equidistantes.
 * @param xValues Nodos de la tabla en x.
 * @param yValues Valores de la tabla en y.
 * @param xTarget Valor x donde se desea interpolar.
 * @returns Valor interpolado y advertencias asociadas al objetivo.
 */
export function lagrangeInterpolation(
  xValues: Vector,
  yValues: Vector,
  xTarget: number
): InterpolationResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 2, "Interpolacion de Lagrange");
  validateNoRepeatedPoints(xValues, yValues);
  validateNoRepeatedValues(xValues, "xValues");

  return {
    value: evaluateLagrangePolynomial(xValues, yValues, xTarget),
    warnings: buildRangeWarnings(xValues, xTarget, "x"),
  };
}

/**
 * Aplica la formula parabolica progresiva de grado 2 usando 3 nodos consecutivos.
 * @param xValues Nodos de la tabla en x.
 * @param yValues Valores de la tabla en y.
 * @param xTarget Valor x donde se desea interpolar.
 * @returns Valor interpolado, advertencias, puntos usados y su tabla de diferencias.
 */
export function progressiveParabolicInterpolation(
  xValues: Vector,
  yValues: Vector,
  xTarget: number
): ProgressiveParabolicResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 3, "Interpolacion parabolica progresiva");
  validateNoRepeatedPoints(xValues, yValues);
  validateNoRepeatedValues(xValues, "xValues");

  const selectedPoints = selectConsecutivePoints(xValues, yValues, xTarget, 3, true);
  const selectedXValues = selectedPoints.map((point) => point.x);
  const selectedYValues = selectedPoints.map((point) => point.y);
  const step = getEquidistantStep(selectedXValues, "Interpolacion parabolica progresiva");
  const differenceTable = buildFiniteDifferenceTable(
    selectedXValues,
    selectedYValues,
    "forward"
  );
  const u = (xTarget - selectedXValues[0]) / step;
  const value =
    differenceTable.columns[0][0] +
    u * differenceTable.columns[1][0] +
    ((u * (u - 1)) / 2) * differenceTable.columns[2][0];

  return {
    value,
    warnings: buildSubsetWarnings(xValues, selectedXValues, xTarget, "x"),
    selectedPoints,
    differenceTable,
  };
}
