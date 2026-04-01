import { integrateCompositeAuto } from "../../algorithms/lab6/integration";
import { calculateErrorMetrics } from "../../algorithms/lab6/tabulated";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askOptionalReferenceValue,
  askTabulatedInput,
  printErrorMetrics,
  printInputTable,
  printIntegrationSegments,
  printLab6Error,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI la integracion numerica combinada con seleccion automatica.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab6Exercise7(): Promise<void> {
  console.log("Laboratorio 6 - Ejercicio 7");

  const { xValues, yValues } = await askTabulatedInput(2);
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() => integrateCompositeAuto(xValues, yValues));

    console.log("Metodo: Integracion combinada");
    printInputTable(xValues, yValues);
    console.log(`Intervalo de integracion: [${result.intervalStart}, ${result.intervalEnd}]`);
    console.log(`Formula aplicada: ${result.formula}`);
    console.log(`Cantidad de subintervalos: ${result.subintervals}`);
    console.log(`Integral aproximada: ${result.value}`);
    printIntegrationSegments(result.segments);
    printWarnings(result.warnings);

    if (referenceValue !== undefined) {
      printErrorMetrics(calculateErrorMetrics(result.value, referenceValue));
    }

    printExecutionTime(ms);
  } catch (error) {
    printLab6Error(error);
  }
}
