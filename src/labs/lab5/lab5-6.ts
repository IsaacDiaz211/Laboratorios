import {
  calculateErrorMetrics,
  progressiveParabolicInterpolation,
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
  printSelectedPoints,
  printWarnings,
} from "./common";

/**
 * Ejecuta desde la CLI la interpolacion parabolica progresiva con 3 nodos consecutivos.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab5Exercise6(): Promise<void> {
  console.log("Laboratorio 5 - Ejercicio 6");

  const { xValues, yValues } = await askInterpolationTableInput(3);
  const xTarget = await askNumber("Ingrese el valor de x a interpolar", {
    float: true,
  });
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() =>
      progressiveParabolicInterpolation(xValues, yValues, xTarget)
    );

    console.log("Metodo: Interpolacion parabolica progresiva");
    printInputTable(xValues, yValues);
    console.log(`x objetivo: ${xTarget}`);
    printSelectedPoints(result.selectedPoints);
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
