import {
  calculateErrorMetrics,
  newtonGregoryForward,
} from "../../algorithms/lab5/interpolation";
import { askNumber } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askInterpolationTableInput,
  askOptionalReferenceValue,
  printErrorMetrics,
  printFiniteDifferenceTable,
  printInputTable,
  printLab5Error,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI Newton-Gregory ascendente para interpolacion directa.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab5Exercise1(): Promise<void> {
  console.log("Laboratorio 5 - Ejercicio 1");

  const { xValues, yValues } = await askInterpolationTableInput(2);
  const xTarget = await askNumber("Ingrese el valor de x a interpolar", {
    float: true,
  });
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() =>
      newtonGregoryForward(xValues, yValues, xTarget)
    );

    console.log("Metodo: Newton-Gregory Ascendente");
    printInputTable(xValues, yValues);
    console.log(`x objetivo: ${xTarget}`);
    printFiniteDifferenceTable(result.differenceTable);
    console.log(`Valor interpolado: ${result.value}`);
    printWarnings(result.warnings);

    if (referenceValue !== undefined) {
      printErrorMetrics(calculateErrorMetrics(result.value, referenceValue));
    }

    printExecutionTime(ms);
  } catch (error) {
    printLab5Error(error);
  }
}
