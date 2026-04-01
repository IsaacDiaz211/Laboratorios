import { solveMilnePredictorCorrector } from "../../algorithms/lab7/milne";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askInitialValueProblemInput,
  askMilneManualSeedPoints,
  askMilneSeedMode,
  printFinalErrorMetrics,
  printLab7Error,
  printOdeResultsTable,
  printProblemInput,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de Milne predictor-corrector.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab7Exercise5(): Promise<void> {
  console.log("Laboratorio 7 - Ejercicio 5");

  const input = await askInitialValueProblemInput();
  const seedMode = await askMilneSeedMode();
  const initialPoints =
    seedMode === "manual"
      ? await askMilneManualSeedPoints(input.x0, input.y0, input.h)
      : undefined;

  try {
    const { result, ms } = await timeExecution(() =>
      solveMilnePredictorCorrector(input, initialPoints)
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
