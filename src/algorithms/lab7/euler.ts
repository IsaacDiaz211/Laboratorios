import type { OdeMethodInput, OdeMethodResult, OdeStepResult } from "./ivp";
import {
  buildStepResult,
  createMethodResult,
  evaluateDifferentialFunction,
  validateInitialValueProblemInput,
} from "./ivp";

/**
 * Resuelve un problema de valor inicial con el metodo de Euler explicito.
 * @param problem Problema y' = f(x, y), y(x0) = y0.
 * @returns Tabla completa de resultados y aproximacion final.
 */
export function solveEuler(problem: OdeMethodInput): OdeMethodResult {
  const methodName = "Metodo de Euler";
  validateInitialValueProblemInput(problem, methodName);

  const results: OdeStepResult[] = [
    buildStepResult(0, problem.x0, problem.y0, problem, methodName),
  ];

  let x = problem.x0;
  let y = problem.y0;

  for (let step = 1; step <= problem.steps; step += 1) {
    const derivative = evaluateDifferentialFunction(problem.f, x, y, methodName);
    y += problem.h * derivative;
    x = problem.x0 + step * problem.h;
    results.push(buildStepResult(step, x, y, problem, methodName));
  }

  return createMethodResult(
    methodName,
    "y_{n+1} = y_n + h*f(x_n, y_n)",
    problem,
    results
  );
}

/**
 * Resuelve un problema de valor inicial con Euler modificado usando Heun.
 * @param problem Problema y' = f(x, y), y(x0) = y0.
 * @returns Tabla completa de resultados, incluyendo predictor y corrector.
 */
export function solveModifiedEuler(problem: OdeMethodInput): OdeMethodResult {
  const methodName = "Metodo Modificado de Euler";
  validateInitialValueProblemInput(problem, methodName);

  const results: OdeStepResult[] = [
    buildStepResult(0, problem.x0, problem.y0, problem, methodName),
  ];

  let x = problem.x0;
  let y = problem.y0;

  for (let step = 1; step <= problem.steps; step += 1) {
    const currentDerivative = evaluateDifferentialFunction(problem.f, x, y, methodName);
    const predictor = y + problem.h * currentDerivative;
    const xNext = problem.x0 + step * problem.h;
    const predictorDerivative = evaluateDifferentialFunction(
      problem.f,
      xNext,
      predictor,
      methodName
    );
    const corrector = y + (problem.h / 2) * (currentDerivative + predictorDerivative);

    x = xNext;
    y = corrector;
    results.push(
      buildStepResult(step, x, y, problem, methodName, {
        predictor,
        corrector,
      })
    );
  }

  return createMethodResult(
    methodName,
    "Heun: y* = y_n + h*f_n, y_{n+1} = y_n + (h/2)*(f_n + f(x_{n+1}, y*))",
    problem,
    results
  );
}
