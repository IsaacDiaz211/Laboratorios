import { solveEuler, solveModifiedEuler } from "../../algorithms/lab7/euler";
import { solveMilnePredictorCorrector } from "../../algorithms/lab7/milne";
import { solveRungeKuttaFourthOrder, solveRungeKuttaSecondOrder } from "../../algorithms/lab7/runge-kutta";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askInitialValueProblemInput,
  type MethodComparisonRow,
  printComparisonTable,
  printLab7Error,
  printProblemInput,
  printWarnings,
} from "./common";

function createComparisonRow(
  method: string,
  finalValue: number,
  absoluteError: number | undefined,
  relativeError: number | null | undefined,
  timeMs: number
): MethodComparisonRow {
  return {
    method,
    finalValue,
    absoluteError,
    relativeError,
    timeMs,
  };
}

/**
 * Ejecuta desde la CLI una comparacion resumida entre varios metodos de Lab 7.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab7Exercise6(): Promise<void> {
  console.log("Laboratorio 7 - Ejercicio 6");

  const input = await askInitialValueProblemInput();

  try {
    const { result, ms } = await timeExecution(async () => {
      const rows: MethodComparisonRow[] = [];
      const warnings: string[] = [];

      const euler = await timeExecution(() => solveEuler(input));
      rows.push(
        createComparisonRow(
          euler.result.method,
          euler.result.finalValue,
          euler.result.results[euler.result.results.length - 1].absoluteError,
          euler.result.results[euler.result.results.length - 1].relativeError,
          euler.ms
        )
      );

      const modifiedEuler = await timeExecution(() => solveModifiedEuler(input));
      rows.push(
        createComparisonRow(
          modifiedEuler.result.method,
          modifiedEuler.result.finalValue,
          modifiedEuler.result.results[modifiedEuler.result.results.length - 1].absoluteError,
          modifiedEuler.result.results[modifiedEuler.result.results.length - 1].relativeError,
          modifiedEuler.ms
        )
      );

      const rk2Midpoint = await timeExecution(() =>
        solveRungeKuttaSecondOrder(input, "punto_medio")
      );
      rows.push(
        createComparisonRow(
          rk2Midpoint.result.method,
          rk2Midpoint.result.finalValue,
          rk2Midpoint.result.results[rk2Midpoint.result.results.length - 1].absoluteError,
          rk2Midpoint.result.results[rk2Midpoint.result.results.length - 1].relativeError,
          rk2Midpoint.ms
        )
      );

      const rk2Heun = await timeExecution(() => solveRungeKuttaSecondOrder(input, "heun"));
      rows.push(
        createComparisonRow(
          rk2Heun.result.method,
          rk2Heun.result.finalValue,
          rk2Heun.result.results[rk2Heun.result.results.length - 1].absoluteError,
          rk2Heun.result.results[rk2Heun.result.results.length - 1].relativeError,
          rk2Heun.ms
        )
      );

      const rk4 = await timeExecution(() => solveRungeKuttaFourthOrder(input));
      rows.push(
        createComparisonRow(
          rk4.result.method,
          rk4.result.finalValue,
          rk4.result.results[rk4.result.results.length - 1].absoluteError,
          rk4.result.results[rk4.result.results.length - 1].relativeError,
          rk4.ms
        )
      );

      if (input.steps >= 4) {
        const milne = await timeExecution(() => solveMilnePredictorCorrector(input));
        rows.push(
          createComparisonRow(
            milne.result.method,
            milne.result.finalValue,
            milne.result.results[milne.result.results.length - 1].absoluteError,
            milne.result.results[milne.result.results.length - 1].relativeError,
            milne.ms
          )
        );
        warnings.push(...milne.result.warnings);
      } else {
        warnings.push("Milne no se incluyo en la comparacion porque requiere al menos 4 pasos.");
      }

      return { rows, warnings };
    });

    console.log("Metodo: Comparacion entre metodos");
    printProblemInput(input);
    console.log("Resumen comparativo:");
    printComparisonTable(result.rows);
    printWarnings(result.warnings);
    printExecutionTime(ms);
  } catch (error) {
    printLab7Error(error);
  }
}
