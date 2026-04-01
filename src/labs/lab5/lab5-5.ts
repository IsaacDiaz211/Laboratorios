import {
  calculateErrorMetrics,
  lagrangeInterpolation,
} from "../../algorithms/lab5/interpolation";
import { askNumber } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askInterpolationTableInput,
  askOptionalReferenceValue,
  printErrorMetrics,
  printInputTable,
  printLab5Error,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI el polinomio interpolante de Lagrange.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab5Exercise5(): Promise<void> {
  console.log("Laboratorio 5 - Ejercicio 5");

  const { xValues, yValues } = await askInterpolationTableInput(2);
  const xTarget = await askNumber("Ingrese el valor de x a interpolar", {
    float: true,
  });
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() =>
      lagrangeInterpolation(xValues, yValues, xTarget)
    );

    console.log("Metodo: Lagrange");
    printInputTable(xValues, yValues);
    console.log(`x objetivo: ${xTarget}`);
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
