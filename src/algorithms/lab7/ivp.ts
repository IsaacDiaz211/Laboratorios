import type { Vector } from "../../core/matrix";

const GRID_TOLERANCE = 1e-9;
const ERROR_TOLERANCE = 1e-12;

export type DifferentialFunction = (x: number, y: number) => number;
export type ExactSolutionFunction = (x: number) => number;

export type OdeGridInput = {
  x0: number;
  h: number;
  steps?: number;
  xEnd?: number;
};

export type OdeGrid = {
  x0: number;
  h: number;
  steps: number;
  xEnd: number;
  xValues: Vector;
};

export type OdeMethodInput = {
  f: DifferentialFunction;
  x0: number;
  y0: number;
  h: number;
  steps: number;
  exactSolution?: ExactSolutionFunction;
};

export type ErrorMetrics = {
  absoluteError: number;
  relativeError: number | null;
  warning?: string;
};

export type OdeStepResult = {
  step: number;
  x: number;
  y: number;
  derivative: number;
  predictor?: number;
  corrector?: number;
  exactValue?: number;
  absoluteError?: number;
  relativeError?: number | null;
};

export type OdeMethodResult = {
  method: string;
  formula: string;
  x0: number;
  y0: number;
  h: number;
  steps: number;
  xEnd: number;
  finalValue: number;
  results: OdeStepResult[];
  warnings: string[];
};

type BuildStepResultOptions = {
  derivative?: number;
  predictor?: number;
  corrector?: number;
};

function validateFiniteNumber(value: number, label: string): void {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error(`${label} debe ser un numero valido.`);
  }
}

function normalizeExpression(expression: string): string {
  return expression.trim().replace(/\^/g, "**");
}

function buildMathScopeDeclarations(): string {
  return "const { abs, acos, asin, atan, ceil, cos, exp, floor, log, max, min, pow, round, sin, sqrt, tan, E, PI } = Math;";
}

/**
 * Crea una funcion f(x, y) a partir de una expresion escrita en formato JS/TS.
 * @param expression Expresion de la ecuacion diferencial y' = f(x, y).
 * @returns Funcion numerica evaluable en pares (x, y).
 */
export function createDifferentialFunctionFromString(
  expression: string
): DifferentialFunction {
  const normalized = normalizeExpression(expression);
  if (normalized.length === 0) {
    throw new Error("La expresion de la ecuacion diferencial no puede estar vacia.");
  }

  let evaluator: (x: number, y: number) => unknown;
  try {
    evaluator = new Function(
      "x",
      "y",
      `${buildMathScopeDeclarations()} return ${normalized};`
    ) as (x: number, y: number) => unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudo interpretar f(x, y): ${message}`);
  }

  return (x: number, y: number): number => {
    try {
      const result = evaluator(x, y);
      if (typeof result !== "number" || Number.isNaN(result) || !Number.isFinite(result)) {
        throw new Error("La expresion devolvio un valor no numerico.");
      }
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo evaluar f(x, y) en x=${x}, y=${y}: ${message}`);
    }
  };
}

/**
 * Crea una funcion y(x) a partir de una expresion escrita en formato JS/TS.
 * @param expression Expresion de la solucion exacta en funcion de x.
 * @returns Funcion numerica evaluable en un valor de x.
 */
export function createSingleVariableFunctionFromString(
  expression: string
): ExactSolutionFunction {
  const normalized = normalizeExpression(expression);
  if (normalized.length === 0) {
    throw new Error("La expresion de la solucion exacta no puede estar vacia.");
  }

  let evaluator: (x: number) => unknown;
  try {
    evaluator = new Function(
      "x",
      `${buildMathScopeDeclarations()} return ${normalized};`
    ) as (x: number) => unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudo interpretar y(x): ${message}`);
  }

  return (x: number): number => {
    try {
      const result = evaluator(x);
      if (typeof result !== "number" || Number.isNaN(result) || !Number.isFinite(result)) {
        throw new Error("La expresion devolvio un valor no numerico.");
      }
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo evaluar y(x) en x=${x}: ${message}`);
    }
  };
}

/**
 * Valida el paso h usado por los metodos de EDO.
 * @param h Paso de integracion.
 * @returns No retorna valor; lanza error si h no es valido.
 */
export function validateStepSize(h: number): void {
  validateFiniteNumber(h, "h");
  if (h <= 0) {
    throw new Error("El paso h debe ser mayor que 0.");
  }
}

/**
 * Valida la cantidad de pasos de integracion.
 * @param steps Cantidad de pasos.
 * @returns No retorna valor; lanza error si la cantidad no es valida.
 */
export function validateStepCount(steps: number): void {
  if (!Number.isInteger(steps) || steps <= 0) {
    throw new Error("La cantidad de pasos debe ser un entero positivo.");
  }
}

/**
 * Valida que el intervalo final sea consistente con el punto inicial.
 * @param x0 Punto inicial.
 * @param xEnd Punto final.
 * @returns No retorna valor; lanza error si el intervalo es invalido.
 */
export function validateInterval(x0: number, xEnd: number): void {
  validateFiniteNumber(x0, "x0");
  validateFiniteNumber(xEnd, "xEnd");
  if (xEnd <= x0) {
    throw new Error("xEnd debe ser mayor que x0.");
  }
}

/**
 * Construye la grilla x a partir del punto inicial, el paso y la cantidad de pasos.
 * @param x0 Punto inicial.
 * @param h Paso de integracion.
 * @param steps Cantidad de pasos.
 * @returns Estructura con xEnd calculado y todos los nodos de la grilla.
 */
export function buildGrid(x0: number, h: number, steps: number): OdeGrid {
  validateFiniteNumber(x0, "x0");
  validateStepSize(h);
  validateStepCount(steps);

  const xValues = Array.from({ length: steps + 1 }, (_, index) => x0 + index * h);

  return {
    x0,
    h,
    steps,
    xEnd: xValues[xValues.length - 1],
    xValues,
  };
}

/**
 * Resuelve la grilla final a partir de h junto con pasos o xEnd.
 * @param input Datos de construccion de la grilla.
 * @returns Grilla consistente con x0, h y el criterio de parada dado.
 */
export function resolveGrid(input: OdeGridInput): OdeGrid {
  validateFiniteNumber(input.x0, "x0");
  validateStepSize(input.h);

  const hasSteps = input.steps !== undefined;
  const hasXEnd = input.xEnd !== undefined;

  if (!hasSteps && !hasXEnd) {
    throw new Error("Debe indicar xEnd o la cantidad de pasos.");
  }

  if (hasSteps) {
    validateStepCount(input.steps as number);
  }

  if (hasXEnd) {
    validateInterval(input.x0, input.xEnd as number);
  }

  if (hasSteps && !hasXEnd) {
    return buildGrid(input.x0, input.h, input.steps as number);
  }

  const rawSteps = ((input.xEnd as number) - input.x0) / input.h;
  const roundedSteps = Math.round(rawSteps);
  const allowedDifference = GRID_TOLERANCE * Math.max(1, Math.abs(rawSteps));
  if (Math.abs(rawSteps - roundedSteps) > allowedDifference) {
    throw new Error("x0, xEnd y h no son consistentes entre si.");
  }

  validateStepCount(roundedSteps);

  if (hasSteps && roundedSteps !== input.steps) {
    throw new Error("La cantidad de pasos no coincide con los valores x0, xEnd y h.");
  }

  return buildGrid(input.x0, input.h, roundedSteps);
}

/**
 * Valida un problema de valor inicial antes de ejecutar un metodo numerico.
 * @param problem Datos del problema y' = f(x, y), y(x0) = y0.
 * @param methodName Nombre del metodo para contextualizar errores.
 * @returns No retorna valor; lanza error si la entrada no es valida.
 */
export function validateInitialValueProblemInput(
  problem: OdeMethodInput,
  methodName: string
): void {
  if (typeof problem.f !== "function") {
    throw new Error(`${methodName} requiere una funcion diferencial valida.`);
  }

  validateFiniteNumber(problem.x0, "x0");
  validateFiniteNumber(problem.y0, "y0");
  validateStepSize(problem.h);
  validateStepCount(problem.steps);

  if (problem.exactSolution !== undefined && typeof problem.exactSolution !== "function") {
    throw new Error(`${methodName} requiere una solucion exacta valida.`);
  }

  evaluateDifferentialFunction(problem.f, problem.x0, problem.y0, methodName);
  if (problem.exactSolution !== undefined) {
    evaluateExactSolution(problem.exactSolution, problem.x0, methodName);
  }
}

/**
 * Evalua la funcion diferencial y verifica que produzca un valor finito.
 * @param f Funcion diferencial y' = f(x, y).
 * @param x Valor actual de x.
 * @param y Valor actual de y.
 * @param methodName Metodo que realiza la evaluacion.
 * @returns Valor de la derivada y' en el punto dado.
 */
export function evaluateDifferentialFunction(
  f: DifferentialFunction,
  x: number,
  y: number,
  methodName: string
): number {
  let value: number;
  try {
    value = f(x, y);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${methodName} no pudo evaluar f(x, y): ${message}`);
  }

  validateFiniteNumber(value, `f(${x}, ${y})`);
  return value;
}

/**
 * Evalua la solucion exacta cuando el usuario la proporciona.
 * @param exactSolution Funcion exacta y(x).
 * @param x Punto donde se desea evaluar la referencia.
 * @param methodName Metodo que realiza la evaluacion.
 * @returns Valor exacto en el punto x.
 */
export function evaluateExactSolution(
  exactSolution: ExactSolutionFunction,
  x: number,
  methodName: string
): number {
  let value: number;
  try {
    value = exactSolution(x);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${methodName} no pudo evaluar la solucion exacta: ${message}`);
  }

  validateFiniteNumber(value, `y_exacta(${x})`);
  return value;
}

/**
 * Calcula el error absoluto entre un valor aproximado y un valor de referencia.
 * @param approximate Valor obtenido por el metodo numerico.
 * @param reference Valor exacto o de referencia.
 * @returns Error absoluto |referencia - aproximado|.
 */
export function calculateAbsoluteError(approximate: number, reference: number): number {
  return Math.abs(reference - approximate);
}

/**
 * Calcula el error relativo usando la referencia como denominador.
 * @param approximate Valor obtenido por el metodo numerico.
 * @param reference Valor exacto o de referencia.
 * @returns Error relativo o null si la referencia es 0.
 */
export function calculateRelativeError(
  approximate: number,
  reference: number
): number | null {
  if (Math.abs(reference) <= ERROR_TOLERANCE) {
    return null;
  }

  return Math.abs((reference - approximate) / reference);
}

/**
 * Agrupa el error absoluto y relativo para comparaciones con solucion exacta.
 * @param approximate Valor aproximado calculado.
 * @param reference Valor exacto o de referencia.
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
        ? "No se puede calcular el error relativo cuando el valor exacto es 0."
        : undefined,
  };
}

/**
 * Construye una fila de salida para la tabla de resultados de un metodo.
 * @param step Indice del paso dentro de la grilla.
 * @param x Valor de x en el paso.
 * @param y Aproximacion de y en el paso.
 * @param problem Problema de valor inicial usado por el metodo.
 * @param methodName Nombre del metodo para contextualizar errores.
 * @param options Datos adicionales del paso, por ejemplo predictor o corrector.
 * @returns Fila completa con y, y' y errores si existe solucion exacta.
 */
export function buildStepResult(
  step: number,
  x: number,
  y: number,
  problem: OdeMethodInput,
  methodName: string,
  options: BuildStepResultOptions = {}
): OdeStepResult {
  const derivative =
    options.derivative ?? evaluateDifferentialFunction(problem.f, x, y, methodName);

  const result: OdeStepResult = {
    step,
    x,
    y,
    derivative,
    predictor: options.predictor,
    corrector: options.corrector,
  };

  if (problem.exactSolution !== undefined) {
    const exactValue = evaluateExactSolution(problem.exactSolution, x, methodName);
    const metrics = calculateErrorMetrics(y, exactValue);

    result.exactValue = exactValue;
    result.absoluteError = metrics.absoluteError;
    result.relativeError = metrics.relativeError;
  }

  return result;
}

/**
 * Construye el resultado final de un metodo de EDO a partir de su tabla de pasos.
 * @param method Nombre del metodo usado.
 * @param formula Formula aplicada por el algoritmo.
 * @param problem Problema de valor inicial resuelto.
 * @param results Tabla completa de aproximaciones por paso.
 * @param warnings Advertencias relevantes del metodo.
 * @returns Resultado final con parametros, tabla y valor aproximado final.
 */
export function createMethodResult(
  method: string,
  formula: string,
  problem: OdeMethodInput,
  results: OdeStepResult[],
  warnings: string[] = []
): OdeMethodResult {
  const grid = buildGrid(problem.x0, problem.h, problem.steps);

  return {
    method,
    formula,
    x0: problem.x0,
    y0: problem.y0,
    h: problem.h,
    steps: problem.steps,
    xEnd: grid.xEnd,
    finalValue: results[results.length - 1].y,
    results,
    warnings,
  };
}
