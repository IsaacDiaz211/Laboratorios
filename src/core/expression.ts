const MATH_SCOPE_DECLARATIONS =
  "const { abs, acos, asin, atan, ceil, cos, exp, floor, log, max, min, pow, round, sin, sqrt, tan, E, PI } = Math;";

function normalizeExpression(expression: string, label: string): string {
  const normalized = expression.trim().replace(/\^/g, "**");
  if (normalized.length === 0) {
    throw new Error(`La expresion de ${label} no puede estar vacia.`);
  }

  return normalized;
}

function ensureNumericResult(result: unknown, label: string): number {
  if (typeof result !== "number" || Number.isNaN(result) || !Number.isFinite(result)) {
    throw new Error(`La expresion de ${label} devolvio un valor no numerico.`);
  }

  return result;
}

/**
 * Crea una funcion numerica de una variable a partir de una expresion en formato JS/TS.
 * @param expression Expresion a evaluar.
 * @param label Etiqueta usada en mensajes de error, por ejemplo f(x) o y(x).
 * @returns Funcion evaluable en un valor de x.
 */
export function createSingleVariableExpression(
  expression: string,
  label = "f(x)"
): (x: number) => number {
  const normalized = normalizeExpression(expression, label);

  let evaluator: (x: number) => unknown;
  try {
    evaluator = new Function(
      "x",
      `${MATH_SCOPE_DECLARATIONS} return ${normalized};`
    ) as (x: number) => unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudo interpretar ${label}: ${message}`);
  }

  return (x: number): number => {
    try {
      return ensureNumericResult(evaluator(x), label);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo evaluar ${label} en x=${x}: ${message}`);
    }
  };
}

/**
 * Crea una funcion numerica de dos variables a partir de una expresion en formato JS/TS.
 * @param expression Expresion a evaluar.
 * @param label Etiqueta usada en mensajes de error, por ejemplo f(x, y).
 * @returns Funcion evaluable en un par (x, y).
 */
export function createTwoVariableExpression(
  expression: string,
  label = "f(x, y)"
): (x: number, y: number) => number {
  const normalized = normalizeExpression(expression, label);

  let evaluator: (x: number, y: number) => unknown;
  try {
    evaluator = new Function(
      "x",
      "y",
      `${MATH_SCOPE_DECLARATIONS} return ${normalized};`
    ) as (x: number, y: number) => unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudo interpretar ${label}: ${message}`);
  }

  return (x: number, y: number): number => {
    try {
      return ensureNumericResult(evaluator(x, y), label);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo evaluar ${label} en x=${x}, y=${y}: ${message}`);
    }
  };
}
