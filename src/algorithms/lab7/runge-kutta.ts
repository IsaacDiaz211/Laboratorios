import type { OdeMethodInput, OdeMethodResult, OdeStepResult } from "./ivp";
import {
  buildStepResult,
  createMethodResult,
  evaluateDifferentialFunction,
  validateInitialValueProblemInput,
} from "./ivp";

export type RK2Variant = "punto_medio" | "heun";

/**
 * Resuelve un problema de valor inicial con Runge-Kutta de segundo orden.
 * @param problem Problema y' = f(x, y), y(x0) = y0.
 * @param variant Variante de segundo orden: punto medio o Heun.
 * @returns Tabla completa de resultados y aproximacion final.
 */
export function solveRungeKuttaSecondOrder(
  problem: OdeMethodInput,
  variant: RK2Variant = "punto_medio"
): OdeMethodResult {
  const methodName = "Runge-Kutta de 2do orden";
  validateInitialValueProblemInput(problem, methodName);

  const results: OdeStepResult[] = [
    buildStepResult(0, problem.x0, problem.y0, problem, methodName),
  ];

  let x = problem.x0;
  let y = problem.y0;

  for (let step = 1; step <= problem.steps; step += 1) {
    const k1 = evaluateDifferentialFunction(problem.f, x, y, methodName);

    let yNext: number;
    if (variant === "punto_medio") {
      const k2 = evaluateDifferentialFunction(
        problem.f,
        x + problem.h / 2,
        y + (problem.h * k1) / 2,
        methodName
      );
      yNext = y + problem.h * k2;
    } else {
      const k2 = evaluateDifferentialFunction(
        problem.f,
        x + problem.h,
        y + problem.h * k1,
        methodName
      );
      yNext = y + (problem.h / 2) * (k1 + k2);
    }

    x = problem.x0 + step * problem.h;
    y = yNext;
    results.push(buildStepResult(step, x, y, problem, methodName));
  }

  const formula =
    variant === "punto_medio"
      ? "RK2 punto medio: k1 = f(x_n, y_n), k2 = f(x_n + h/2, y_n + h*k1/2), y_{n+1} = y_n + h*k2"
      : "RK2 Heun: k1 = f(x_n, y_n), k2 = f(x_n + h, y_n + h*k1), y_{n+1} = y_n + (h/2)*(k1 + k2)";

  return createMethodResult(
    variant === "punto_medio" ? `${methodName} (Punto medio)` : `${methodName} (Heun)`,
    formula,
    problem,
    results
  );
}

/**
 * Resuelve un problema de valor inicial con Runge-Kutta clasico de cuarto orden.
 * @param problem Problema y' = f(x, y), y(x0) = y0.
 * @returns Tabla completa de resultados y aproximacion final.
 */
export function solveRungeKuttaFourthOrder(problem: OdeMethodInput): OdeMethodResult {
  const methodName = "Runge-Kutta de 4to orden";
  validateInitialValueProblemInput(problem, methodName);

  const results: OdeStepResult[] = [
    buildStepResult(0, problem.x0, problem.y0, problem, methodName),
  ];

  let x = problem.x0;
  let y = problem.y0;

  for (let step = 1; step <= problem.steps; step += 1) {
    const k1 = evaluateDifferentialFunction(problem.f, x, y, methodName);
    const k2 = evaluateDifferentialFunction(
      problem.f,
      x + problem.h / 2,
      y + (problem.h * k1) / 2,
      methodName
    );
    const k3 = evaluateDifferentialFunction(
      problem.f,
      x + problem.h / 2,
      y + (problem.h * k2) / 2,
      methodName
    );
    const k4 = evaluateDifferentialFunction(
      problem.f,
      x + problem.h,
      y + problem.h * k3,
      methodName
    );

    y += (problem.h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    x = problem.x0 + step * problem.h;
    results.push(buildStepResult(step, x, y, problem, methodName));
  }

  return createMethodResult(
    methodName,
    "RK4 clasico: y_{n+1} = y_n + (h/6)*(k1 + 2*k2 + 2*k3 + k4)",
    problem,
    results
  );
}
