import { solveEuler } from "../../algorithms/lab7/euler";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askInitialValueProblemInput,
  printFinalErrorMetrics,
  printLab7Error,
  printOdeResultsTable,
  printProblemInput,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de Euler para un problema de valor inicial.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab7Exercise1(): Promise<void> {
  console.log("Laboratorio 7 - Ejercicio 1");

  const input = await askInitialValueProblemInput();

  try {
    const { result, ms } = await timeExecution(() => solveEuler(input));

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
