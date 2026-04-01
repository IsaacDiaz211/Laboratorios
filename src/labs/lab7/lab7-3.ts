import { solveRungeKuttaSecondOrder } from "../../algorithms/lab7/runge-kutta";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askInitialValueProblemInput,
  askRK2Variant,
  printFinalErrorMetrics,
  printLab7Error,
  printOdeResultsTable,
  printProblemInput,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI Runge-Kutta de segundo orden para un problema de valor inicial.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab7Exercise3(): Promise<void> {
  console.log("Laboratorio 7 - Ejercicio 3");

  const variant = await askRK2Variant();
  const input = await askInitialValueProblemInput();

  try {
    const { result, ms } = await timeExecution(() =>
      solveRungeKuttaSecondOrder(input, variant)
    );

    console.log(`Metodo: ${result.method}`);
    printProblemInput(input);
    console.log(`Formula aplicada: ${result.formula}`);
    console.log("Tabla por paso:");
    printOdeResultsTable(result.results);
    console.log(`Valor final aproximado: ${result.finalValue}`);
    printFinalErrorMetrics(result);
    printWarnings(result.warnings);
    printExecutionTime(ms);
  } catch (error) {
    printLab7Error(error);
  }
}
