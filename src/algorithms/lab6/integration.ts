import type { Vector } from "../../core/matrix";
import {
  getStepSize,
  validateExactPoints,
  validateMinimumPoints,
  validateNoRepeatedValues,
  validatePairedData,
  validateStrictlyMonotonicNodes,
} from "./tabulated";

export type IntegrationMethod = "trapecio" | "simpson_13" | "simpson_38";

export type IntegrationPlanSegment = {
  method: IntegrationMethod;
  startIndex: number;
  endIndex: number;
  subintervals: number;
};

export type IntegrationSegment = {
  method: IntegrationMethod;
  formula: string;
  startIndex: number;
  endIndex: number;
  xStart: number;
  xEnd: number;
  subintervals: number;
  value: number;
};

export type IntegrationResult = {
  value: number;
  formula: string;
  intervalStart: number;
  intervalEnd: number;
  subintervals: number;
  warnings: string[];
  segments: IntegrationSegment[];
};

function getSubintervalCount(xValues: Vector): number {
  return xValues.length - 1;
}

function validateIntegrationInput(
  xValues: Vector,
  yValues: Vector,
  methodName: string
): void {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 2, methodName);
  validateNoRepeatedValues(xValues, "xValues");
  validateStrictlyMonotonicNodes(xValues, methodName);
}

function createIntegrationSegment(
  method: IntegrationMethod,
  xValues: Vector,
  value: number
): IntegrationSegment {
  const subintervals = getSubintervalCount(xValues);

  return {
    method,
    formula: getFormulaName(method, subintervals),
    startIndex: 0,
    endIndex: subintervals,
    xStart: xValues[0],
    xEnd: xValues[xValues.length - 1],
    subintervals,
    value,
  };
}

function createIntegrationResult(
  xValues: Vector,
  value: number,
  segments: IntegrationSegment[],
  formula: string,
  warnings: string[] = []
): IntegrationResult {
  return {
    value,
    formula,
    intervalStart: xValues[0],
    intervalEnd: xValues[xValues.length - 1],
    subintervals: getSubintervalCount(xValues),
    warnings,
    segments,
  };
}

function getFormulaName(method: IntegrationMethod, subintervals: number): string {
  if (method === "trapecio") {
    return subintervals === 1
      ? "Regla del Trapecio simple"
      : "Regla del Trapecio compuesta";
  }

  if (method === "simpson_13") {
    return subintervals === 2
      ? "Regla de Simpson 1/3 simple"
      : "Regla de Simpson 1/3 compuesta";
  }

  return subintervals === 3
    ? "Regla de Simpson 3/8 simple"
    : "Regla de Simpson 3/8 compuesta";
}

function createPlanSegments(
  entries: Array<{ method: IntegrationMethod; subintervals: number }>
): IntegrationPlanSegment[] {
  const segments: IntegrationPlanSegment[] = [];
  let startIndex = 0;

  for (const entry of entries) {
    segments.push({
      method: entry.method,
      startIndex,
      endIndex: startIndex + entry.subintervals,
      subintervals: entry.subintervals,
    });
    startIndex += entry.subintervals;
  }

  return segments;
}

function sliceSegmentValues(
  xValues: Vector,
  yValues: Vector,
  segment: IntegrationPlanSegment
): { xSegment: Vector; ySegment: Vector } {
  return {
    xSegment: xValues.slice(segment.startIndex, segment.endIndex + 1),
    ySegment: yValues.slice(segment.startIndex, segment.endIndex + 1),
  };
}

function executePlanSegment(
  xValues: Vector,
  yValues: Vector,
  segment: IntegrationPlanSegment
): IntegrationSegment {
  const { xSegment, ySegment } = sliceSegmentValues(xValues, yValues, segment);
  const result =
    segment.method === "trapecio"
      ? integrateTrapezoidal(xSegment, ySegment)
      : segment.method === "simpson_13"
        ? integrateSimpsonOneThird(xSegment, ySegment)
        : integrateSimpsonThreeEighths(xSegment, ySegment);

  return {
    method: segment.method,
    formula: result.formula,
    startIndex: segment.startIndex,
    endIndex: segment.endIndex,
    xStart: xSegment[0],
    xEnd: xSegment[xSegment.length - 1],
    subintervals: segment.subintervals,
    value: result.value,
  };
}

/**
 * Selecciona una combinacion razonable de formulas segun la cantidad de subintervalos.
 * @param subintervals Cantidad total de subintervalos del rango tabulado.
 * @returns Segmentos consecutivos con la formula recomendada para cada tramo.
 */
export function selectIntegrationPlan(subintervals: number): IntegrationPlanSegment[] {
  if (!Number.isInteger(subintervals) || subintervals <= 0) {
    throw new Error("La cantidad de subintervalos debe ser un entero positivo.");
  }

  if (subintervals === 1) {
    return createPlanSegments([{ method: "trapecio", subintervals: 1 }]);
  }

  if (subintervals % 2 === 0) {
    return createPlanSegments([{ method: "simpson_13", subintervals }]);
  }

  if (subintervals % 3 === 0) {
    return createPlanSegments([{ method: "simpson_38", subintervals }]);
  }

  return createPlanSegments([
    { method: "simpson_13", subintervals: subintervals - 3 },
    { method: "simpson_38", subintervals: 3 },
  ]);
}

/**
 * Aplica la regla del Trapecio simple usando exactamente 2 puntos tabulados.
 * @param xValues Nodos x del intervalo.
 * @param yValues Valores y en los extremos del intervalo.
 * @returns Integral aproximada y metadatos del calculo.
 */
export function trapezoidalSimple(xValues: Vector, yValues: Vector): IntegrationResult {
  const methodName = "Regla del Trapecio simple";
  validateIntegrationInput(xValues, yValues, methodName);
  validateExactPoints(xValues, 2, methodName);

  const value = ((xValues[1] - xValues[0]) * (yValues[0] + yValues[1])) / 2;
  const segment = createIntegrationSegment("trapecio", xValues, value);
  return createIntegrationResult(xValues, value, [segment], segment.formula);
}

/**
 * Aplica la regla del Trapecio compuesta sobre toda la tabla ingresada.
 * @param xValues Nodos x consecutivos del intervalo tabulado.
 * @param yValues Valores y asociados a cada nodo.
 * @returns Integral aproximada y metadatos del calculo.
 */
export function trapezoidalComposite(xValues: Vector, yValues: Vector): IntegrationResult {
  const methodName = "Regla del Trapecio compuesta";
  validateIntegrationInput(xValues, yValues, methodName);

  let value = 0;
  for (let index = 0; index < xValues.length - 1; index += 1) {
    const width = xValues[index + 1] - xValues[index];
    value += (width * (yValues[index] + yValues[index + 1])) / 2;
  }

  const segment = createIntegrationSegment("trapecio", xValues, value);
  return createIntegrationResult(xValues, value, [segment], segment.formula);
}

/**
 * Ejecuta Trapecio simple o compuesto segun la cantidad de subintervalos disponibles.
 * @param xValues Nodos x del intervalo tabulado.
 * @param yValues Valores y asociados a la tabla.
 * @returns Integral aproximada y metadatos del metodo aplicado.
 */
export function integrateTrapezoidal(xValues: Vector, yValues: Vector): IntegrationResult {
  return getSubintervalCount(xValues) === 1
    ? trapezoidalSimple(xValues, yValues)
    : trapezoidalComposite(xValues, yValues);
}

/**
 * Aplica la regla de Simpson 1/3 simple usando exactamente 3 puntos equidistantes.
 * @param xValues Nodos x equidistantes del intervalo.
 * @param yValues Valores y asociados a los nodos.
 * @returns Integral aproximada y metadatos del calculo.
 */
export function simpsonOneThirdSimple(xValues: Vector, yValues: Vector): IntegrationResult {
  const methodName = "Regla de Simpson 1/3 simple";
  validateIntegrationInput(xValues, yValues, methodName);
  validateExactPoints(xValues, 3, methodName);

  const step = getStepSize(xValues, methodName);
  const value = (step / 3) * (yValues[0] + 4 * yValues[1] + yValues[2]);
  const segment = createIntegrationSegment("simpson_13", xValues, value);
  return createIntegrationResult(xValues, value, [segment], segment.formula);
}

/**
 * Aplica la regla de Simpson 1/3 compuesta sobre toda la tabla equidistante.
 * @param xValues Nodos x equidistantes del intervalo tabulado.
 * @param yValues Valores y asociados a cada nodo.
 * @returns Integral aproximada y metadatos del calculo.
 */
export function simpsonOneThirdComposite(xValues: Vector, yValues: Vector): IntegrationResult {
  const methodName = "Regla de Simpson 1/3 compuesta";
  validateIntegrationInput(xValues, yValues, methodName);
  validateMinimumPoints(xValues, 3, methodName);

  const subintervals = getSubintervalCount(xValues);
  if (subintervals % 2 !== 0) {
    throw new Error("Simpson 1/3 compuesta requiere una cantidad par de subintervalos.");
  }

  const step = getStepSize(xValues, methodName);
  let oddSum = 0;
  let evenSum = 0;

  for (let index = 1; index < yValues.length - 1; index += 1) {
    if (index % 2 === 0) {
      evenSum += yValues[index];
      continue;
    }

    oddSum += yValues[index];
  }

  const value = (step / 3) * (yValues[0] + yValues[yValues.length - 1] + 4 * oddSum + 2 * evenSum);
  const segment = createIntegrationSegment("simpson_13", xValues, value);
  return createIntegrationResult(xValues, value, [segment], segment.formula);
}

/**
 * Ejecuta Simpson 1/3 simple o compuesta segun la cantidad de subintervalos disponibles.
 * @param xValues Nodos x del intervalo tabulado.
 * @param yValues Valores y asociados a la tabla.
 * @returns Integral aproximada y metadatos del metodo aplicado.
 */
export function integrateSimpsonOneThird(
  xValues: Vector,
  yValues: Vector
): IntegrationResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 3, "Regla de Simpson 1/3");

  return getSubintervalCount(xValues) === 2
    ? simpsonOneThirdSimple(xValues, yValues)
    : simpsonOneThirdComposite(xValues, yValues);
}

/**
 * Aplica la regla de Simpson 3/8 simple usando exactamente 4 puntos equidistantes.
 * @param xValues Nodos x equidistantes del intervalo.
 * @param yValues Valores y asociados a los nodos.
 * @returns Integral aproximada y metadatos del calculo.
 */
export function simpsonThreeEighthsSimple(
  xValues: Vector,
  yValues: Vector
): IntegrationResult {
  const methodName = "Regla de Simpson 3/8 simple";
  validateIntegrationInput(xValues, yValues, methodName);
  validateExactPoints(xValues, 4, methodName);

  const step = getStepSize(xValues, methodName);
  const value =
    ((3 * step) / 8) * (yValues[0] + 3 * yValues[1] + 3 * yValues[2] + yValues[3]);
  const segment = createIntegrationSegment("simpson_38", xValues, value);
  return createIntegrationResult(xValues, value, [segment], segment.formula);
}

/**
 * Aplica la regla de Simpson 3/8 compuesta sobre toda la tabla equidistante.
 * @param xValues Nodos x equidistantes del intervalo tabulado.
 * @param yValues Valores y asociados a cada nodo.
 * @returns Integral aproximada y metadatos del calculo.
 */
export function simpsonThreeEighthsComposite(
  xValues: Vector,
  yValues: Vector
): IntegrationResult {
  const methodName = "Regla de Simpson 3/8 compuesta";
  validateIntegrationInput(xValues, yValues, methodName);
  validateMinimumPoints(xValues, 4, methodName);

  const subintervals = getSubintervalCount(xValues);
  if (subintervals % 3 !== 0) {
    throw new Error("Simpson 3/8 compuesta requiere una cantidad multiplo de 3 de subintervalos.");
  }

  const step = getStepSize(xValues, methodName);
  let tripleSum = 0;
  let otherSum = 0;

  for (let index = 1; index < yValues.length - 1; index += 1) {
    if (index % 3 === 0) {
      tripleSum += yValues[index];
      continue;
    }

    otherSum += yValues[index];
  }

  const value =
    ((3 * step) / 8) *
    (yValues[0] + yValues[yValues.length - 1] + 3 * otherSum + 2 * tripleSum);
  const segment = createIntegrationSegment("simpson_38", xValues, value);
  return createIntegrationResult(xValues, value, [segment], segment.formula);
}

/**
 * Ejecuta Simpson 3/8 simple o compuesta segun la cantidad de subintervalos disponibles.
 * @param xValues Nodos x del intervalo tabulado.
 * @param yValues Valores y asociados a la tabla.
 * @returns Integral aproximada y metadatos del metodo aplicado.
 */
export function integrateSimpsonThreeEighths(
  xValues: Vector,
  yValues: Vector
): IntegrationResult {
  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, 4, "Regla de Simpson 3/8");

  return getSubintervalCount(xValues) === 3
    ? simpsonThreeEighthsSimple(xValues, yValues)
    : simpsonThreeEighthsComposite(xValues, yValues);
}

/**
 * Combina automaticamente Trapecio, Simpson 1/3 y Simpson 3/8 segun la tabla ingresada.
 * @param xValues Nodos x del intervalo tabulado.
 * @param yValues Valores y asociados a la tabla.
 * @returns Integral aproximada, formula global y detalle de cada tramo usado.
 */
export function integrateCompositeAuto(xValues: Vector, yValues: Vector): IntegrationResult {
  const methodName = "Integracion combinada";
  validateIntegrationInput(xValues, yValues, methodName);

  const plan = selectIntegrationPlan(getSubintervalCount(xValues));
  if (plan.some((segment) => segment.method !== "trapecio")) {
    getStepSize(xValues, methodName);
  }

  const segments = plan.map((segment) => executePlanSegment(xValues, yValues, segment));
  const value = segments.reduce((sum, segment) => sum + segment.value, 0);
  const formula =
    segments.length === 1
      ? `Integracion combinada automatica (${segments[0].formula})`
      : `Integracion combinada automatica (${segments
          .map((segment) => segment.formula)
          .join(" + ")})`;

  const warnings =
    segments.length > 1
      ? ["Se combinaron varias formulas para cubrir todos los subintervalos del rango tabulado."]
      : [];

  return createIntegrationResult(xValues, value, segments, formula, warnings);
}
