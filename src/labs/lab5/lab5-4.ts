import {
  calculateErrorMetrics,
  inverseQuadraticInterpolation,
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
  printSelectedPoints,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI interpolacion inversa cuadratica para estimar x a partir de y.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab5Exercise4(): Promise<void> {
  console.log("Laboratorio 5 - Ejercicio 4");

  const { xValues, yValues } = await askInterpolationTableInput(3);
  const yTarget = await askNumber("Ingrese el valor de y objetivo", {
    float: true,
  });
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() =>
      inverseQuadraticInterpolation(xValues, yValues, yTarget)
    );

    console.log("Metodo: Interpolacion Inversa Cuadratica");
    printInputTable(xValues, yValues);
    console.log(`y objetivo: ${yTarget}`);
    printSelectedPoints(result.selectedPoints);
    console.log(`Valor interpolado de x: ${result.value}`);
    printWarnings(result.warnings);

    if (referenceValue !== undefined) {
      printErrorMetrics(calculateErrorMetrics(result.value, referenceValue));
    }

    printExecutionTime(ms);
  } catch (error) {
    printLab5Error(error);
  }
}
