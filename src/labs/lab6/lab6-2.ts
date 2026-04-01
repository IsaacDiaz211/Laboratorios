import {
  type DerivativeOrder,
  newtonGregoryForwardDerivative,
} from "../../algorithms/lab6/differentiation";
import { calculateErrorMetrics } from "../../algorithms/lab6/tabulated";
import { askNumber } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askDerivativeOrder,
  askOptionalReferenceValue,
  askTabulatedInput,
  printErrorMetrics,
  printFiniteDifferenceTable,
  printInputTable,
  printLab6Error,
  printWarnings,
} from "./common";

function formatDerivativeOrder(order: DerivativeOrder): string {
  return order === 1 ? "Primera" : "Segunda";
}

/**
 * Ejecuta desde la CLI la derivacion numerica por Newton-Gregory ascendente.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab6Exercise2(): Promise<void> {
  console.log("Laboratorio 6 - Ejercicio 2");

  const order = await askDerivativeOrder();
  const { xValues, yValues } = await askTabulatedInput(order + 1);
  const xTarget = await askNumber("Ingrese el valor de x donde desea derivar", {
    float: true,
  });
  const referenceValue = await askOptionalReferenceValue();

  try {
    const { result, ms } = await timeExecution(() =>
      newtonGregoryForwardDerivative(xValues, yValues, xTarget, order)
    );

    console.log("Metodo: Newton-Gregory Ascendente");
    printInputTable(xValues, yValues);
    console.log(`x objetivo: ${xTarget}`);
    console.log(`Orden de derivada: ${formatDerivativeOrder(order)}`);
    printFiniteDifferenceTable(result.differenceTable);
    console.log(`Formula aplicada: ${result.formula}`);
    console.log(`Paso h: ${result.step}`);
    console.log(`Derivada aproximada: ${result.value}`);
    printWarnings(result.warnings);

    if (referenceValue !== undefined) {
      printErrorMetrics(calculateErrorMetrics(result.value, referenceValue));
    }

    printExecutionTime(ms);
  } catch (error) {
    printLab6Error(error);
  }
}
