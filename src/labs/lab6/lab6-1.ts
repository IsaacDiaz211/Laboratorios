import { buildFiniteDifferenceTable } from "../../algorithms/lab6/tabulated";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askFiniteDifferenceDirection,
  askTabulatedInput,
  printFiniteDifferenceTable,
  printInputTable,
  printLab6Error,
} from "./common";

/**
 * Ejecuta desde la CLI la construccion de una tabla de diferencias finitas.
 * @returns Promesa que finaliza cuando la captura y la impresion concluyen.
 */
export async function runLab6Exercise1(): Promise<void> {
  console.log("Laboratorio 6 - Ejercicio 1");

  const direction = await askFiniteDifferenceDirection();
  const { xValues, yValues } = await askTabulatedInput(2);

  try {
    const { result, ms } = await timeExecution(() =>
      buildFiniteDifferenceTable(xValues, yValues, direction)
    );

    console.log("Metodo: Construccion de tabla de diferencias finitas");
    printInputTable(xValues, yValues);
    printFiniteDifferenceTable(result);
    printExecutionTime(ms);
  } catch (error) {
    printLab6Error(error);
  }
}
