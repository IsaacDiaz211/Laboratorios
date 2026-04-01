import type { OdeMethodInput, OdeMethodResult, OdeStepResult } from "./ivp";
import {
  buildStepResult,
  createMethodResult,
  evaluateDifferentialFunction,
  validateInitialValueProblemInput,
} from "./ivp";
import { solveRungeKuttaFourthOrder } from "./runge-kutta";

const POSITION_TOLERANCE = 1e-9;

export type MilneSeedPoint = {
  x: number;
  y: number;
};

function validateMilneMinimumSteps(steps: number): void {
  if (steps < 4) {
    throw new Error("Milne requiere al menos 4 pasos para aplicar predictor-corrector.");
  }
}

function validateMilneSeedPoints(
  initialPoints: MilneSeedPoint[],
  problem: OdeMethodInput,
  methodName: string
): void {
  if (initialPoints.length !== 4) {
    throw new Error("Milne requiere exactamente 4 valores iniciales.");
  }

  for (let index = 0; index < initialPoints.length; index += 1) {
    const point = initialPoints[index];
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      throw new Error("Los valores iniciales de Milne deben ser numeros validos.");
    }

    const expectedX = problem.x0 + index * problem.h;
    if (Math.abs(point.x - expectedX) > POSITION_TOLERANCE * Math.max(1, Math.abs(expectedX))) {
      throw new Error("Los valores iniciales de Milne no son consistentes con x0 y h.");
    }
  }

  if (Math.abs(initialPoints[0].y - problem.y0) > POSITION_TOLERANCE * Math.max(1, Math.abs(problem.y0))) {
    throw new Error("El valor inicial manual de Milne no coincide con y0.");
  }

  for (const point of initialPoints) {
    evaluateDifferentialFunction(problem.f, point.x, point.y, methodName);
  }
}

/**
 * Genera los 4 valores iniciales requeridos por Milne usando RK4.
 * @param problem Problema base de valor inicial.
 * @returns Cuatro puntos consecutivos alineados con la grilla del problema.
 */
export function generateMilneSeedsWithRK4(problem: OdeMethodInput): MilneSeedPoint[] {
  const rk4Result = solveRungeKuttaFourthOrder({
    ...problem,
    steps: 3,
  });

  return rk4Result.results.slice(0, 4).map((step) => ({
    x: step.x,
    y: step.y,
  }));
}

/**
 * Resuelve un problema de valor inicial con Milne predictor-corrector.
 * @param problem Problema y' = f(x, y), y(x0) = y0.
 * @param initialPoints Valores iniciales opcionales; si no se dan, se generan con RK4.
 * @returns Tabla completa de resultados y aproximacion final.
 */
export function solveMilnePredictorCorrector(
  problem: OdeMethodInput,
  initialPoints?: MilneSeedPoint[]
): OdeMethodResult {
  const methodName = "Metodo de Milne";
  validateInitialValueProblemInput(problem, methodName);
  validateMilneMinimumSteps(problem.steps);

  const warnings: string[] = [];
  const seedPoints =
    initialPoints === undefined ? generateMilneSeedsWithRK4(problem) : initialPoints;

  if (initialPoints === undefined) {
    warnings.push("Los valores iniciales de Milne se generaron automaticamente con RK4.");
  } else {
    warnings.push("Los valores iniciales de Milne fueron ingresados manualmente.");
  }

  validateMilneSeedPoints(seedPoints, problem, methodName);

  const results: OdeStepResult[] = seedPoints.map((point, index) =>
    buildStepResult(index, point.x, point.y, problem, methodName)
  );

  for (let currentIndex = 3; currentIndex < problem.steps; currentIndex += 1) {
    const xNext = problem.x0 + (currentIndex + 1) * problem.h;
    const predictor =
      results[currentIndex - 3].y +
      ((4 * problem.h) / 3) *
        (2 * results[currentIndex - 2].derivative -
          results[currentIndex - 1].derivative +
          2 * results[currentIndex].derivative);

    const predictorDerivative = evaluateDifferentialFunction(
      problem.f,
      xNext,
      predictor,
      methodName
    );
    const corrector =
      results[currentIndex - 1].y +
      (problem.h / 3) *
        (results[currentIndex - 1].derivative +
          4 * results[currentIndex].derivative +
          predictorDerivative);
    const correctedDerivative = evaluateDifferentialFunction(
      problem.f,
      xNext,
      corrector,
      methodName
    );

    results.push(
      buildStepResult(currentIndex + 1, xNext, corrector, problem, methodName, {
        derivative: correctedDerivative,
        predictor,
        corrector,
      })
    );
  }

  return createMethodResult(
    methodName,
    "Milne predictor-corrector con una correccion por paso.",
    problem,
    results,
    warnings
  );
}
