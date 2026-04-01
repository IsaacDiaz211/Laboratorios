import type { Vector } from "../../core/matrix";
import {
  buildFiniteDifferenceTable,
  ensureValueInRange,
  getStepSize,
  type FiniteDifferenceDirection,
  type FiniteDifferenceTable,
  validateMinimumPoints,
  validateNoRepeatedValues,
  validatePairedData,
  validateStrictlyMonotonicNodes,
} from "./tabulated";

export type DerivativeOrder = 1 | 2;

export type NumericalDerivativeResult = {
  value: number;
  order: DerivativeOrder;
  xTarget: number;
  step: number;
  formula: string;
  warnings: string[];
  differenceTable: FiniteDifferenceTable;
};

function factorial(order: number): number {
  let result = 1;
  for (let index = 2; index <= order; index += 1) {
    result *= index;
  }
  return result;
}

function multiplyPolynomials(left: Vector, right: Vector): Vector {
  const result = new Array<number>(left.length + right.length - 1).fill(0);

  for (let i = 0; i < left.length; i += 1) {
    for (let j = 0; j < right.length; j += 1) {
      result[i + j] += left[i] * right[j];
    }
  }

  return result;
}

function differentiatePolynomial(coefficients: Vector): Vector {
  if (coefficients.length <= 1) {
    return [0];
  }

  const derivative: number[] = [];
  for (let degree = 1; degree < coefficients.length; degree += 1) {
    derivative.push(coefficients[degree] * degree);
  }

  return derivative;
}

function evaluatePolynomial(coefficients: Vector, value: number): number {
  let result = 0;
  let power = 1;

  for (const coefficient of coefficients) {
    result += coefficient * power;
    power *= value;
  }

  return result;
}

function getDifferenceAnchorValue(
  table: FiniteDifferenceTable,
  order: number,
  direction: FiniteDifferenceDirection
): number {
  const column = table.columns[order];
  return direction === "forward" ? column[0] : column[column.length - 1];
}

function buildMethodWarning(
  xValues: Vector,
  xTarget: number,
  direction: FiniteDifferenceDirection
): string[] {
  const distanceToStart = Math.abs(xTarget - xValues[0]);
  const distanceToEnd = Math.abs(xTarget - xValues[xValues.length - 1]);

  if (direction === "forward" && distanceToStart > distanceToEnd) {
    return [
      "El punto objetivo esta mas cerca del final de la tabla; Newton-Gregory descendente puede ser mas conveniente.",
    ];
  }

  if (direction === "backward" && distanceToEnd > distanceToStart) {
    return [
      "El punto objetivo esta mas cerca del inicio de la tabla; Newton-Gregory ascendente puede ser mas conveniente.",
    ];
  }

  return [];
}

function buildDerivativeFormula(
  direction: FiniteDifferenceDirection,
  order: DerivativeOrder
): string {
  const derivativeName = order === 1 ? "Primera" : "Segunda";
  const directionName = direction === "forward" ? "ascendente" : "descendente";
  return `${derivativeName} derivada del polinomio de Newton-Gregory ${directionName}`;
}

function evaluateNewtonGregoryDerivative(
  xValues: Vector,
  yValues: Vector,
  xTarget: number,
  order: DerivativeOrder,
  direction: FiniteDifferenceDirection
): NumericalDerivativeResult {
  const methodName =
    direction === "forward"
      ? "Derivacion por Newton-Gregory ascendente"
      : "Derivacion por Newton-Gregory descendente";

  validatePairedData(xValues, yValues);
  validateMinimumPoints(xValues, order + 1, methodName);
  validateNoRepeatedValues(xValues, "xValues");
  validateStrictlyMonotonicNodes(xValues, methodName);
  ensureValueInRange(xTarget, xValues, "x", methodName);

  const step = getStepSize(xValues, methodName);
  const differenceTable = buildFiniteDifferenceTable(xValues, yValues, direction);
  const anchorIndex = direction === "forward" ? 0 : xValues.length - 1;
  const u = (xTarget - xValues[anchorIndex]) / step;

  let value = 0;
  let basis: Vector = [1];

  for (let degree = 1; degree < differenceTable.columns.length; degree += 1) {
    const shift = degree - 1;
    basis = multiplyPolynomials(
      basis,
      direction === "forward" ? [-shift, 1] : [shift, 1]
    );

    const firstDerivative = differentiatePolynomial(basis);
    const secondDerivative = differentiatePolynomial(firstDerivative);
    const anchorDifference = getDifferenceAnchorValue(differenceTable, degree, direction);
    const coefficient = anchorDifference / factorial(degree);

    if (order === 1) {
      value += (coefficient * evaluatePolynomial(firstDerivative, u)) / step;
      continue;
    }

    value += (coefficient * evaluatePolynomial(secondDerivative, u)) / (step * step);
  }

  return {
    value,
    order,
    xTarget,
    step,
    formula: buildDerivativeFormula(direction, order),
    warnings: buildMethodWarning(xValues, xTarget, direction),
    differenceTable,
  };
}

/**
 * Calcula derivadas numericas mediante el polinomio de Newton-Gregory ascendente.
 * @param xValues Nodos x tabulados y equidistantes.
 * @param yValues Valores y asociados a cada nodo.
 * @param xTarget Punto del intervalo donde se desea derivar.
 * @param order Orden de derivada soportado: 1 o 2.
 * @returns Derivada aproximada, tabla de diferencias y datos de apoyo.
 */
export function newtonGregoryForwardDerivative(
  xValues: Vector,
  yValues: Vector,
  xTarget: number,
  order: DerivativeOrder = 1
): NumericalDerivativeResult {
  return evaluateNewtonGregoryDerivative(xValues, yValues, xTarget, order, "forward");
}

/**
 * Calcula derivadas numericas mediante el polinomio de Newton-Gregory descendente.
 * @param xValues Nodos x tabulados y equidistantes.
 * @param yValues Valores y asociados a cada nodo.
 * @param xTarget Punto del intervalo donde se desea derivar.
 * @param order Orden de derivada soportado: 1 o 2.
 * @returns Derivada aproximada, tabla de diferencias y datos de apoyo.
 */
export function newtonGregoryBackwardDerivative(
  xValues: Vector,
  yValues: Vector,
  xTarget: number,
  order: DerivativeOrder = 1
): NumericalDerivativeResult {
  return evaluateNewtonGregoryDerivative(xValues, yValues, xTarget, order, "backward");
}
