import { integrateTrapezoidal } from "../../algorithms/lab6/integration";
import { calculateErrorMetrics } from "../../algorithms/lab6/tabulated";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askOptionalReferenceValue,
  askTabulatedInput,
  printErrorMetrics,
  printInputTable,
  printLab6Error,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI la integracion numerica por la regla del Trapecio.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab6Exercise4(): Promise<void> {
  console.log("Laboratorio 6 - Ejercicio 4");

  const { xValues, yValues } = await askTabulatedInput(2);
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() => integrateTrapezoidal(xValues, yValues));

    console.log("Metodo: Regla del Trapecio");
    printInputTable(xValues, yValues);
    console.log(`Intervalo de integracion: [${result.intervalStart}, ${result.intervalEnd}]`);
    console.log(`Formula aplicada: ${result.formula}`);
    console.log(`Cantidad de subintervalos: ${result.subintervals}`);
    console.log(`Integral aproximada: ${result.value}`);
    printWarnings(result.warnings);

    if (referenceValue !== undefined) {
      printErrorMetrics(calculateErrorMetrics(result.value, referenceValue));
    }

    printExecutionTime(ms);
  } catch (error) {
    printLab6Error(error);
  }
}
