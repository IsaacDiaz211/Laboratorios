import { integrateSimpsonOneThird } from "../../algorithms/lab6/integration";
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
 * Ejecuta desde la CLI la integracion numerica por la regla de Simpson 1/3.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab6Exercise5(): Promise<void> {
  console.log("Laboratorio 6 - Ejercicio 5");

  const { xValues, yValues } = await askTabulatedInput(3);
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() =>
      integrateSimpsonOneThird(xValues, yValues)
    );

    console.log("Metodo: Regla de Simpson 1/3");
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
