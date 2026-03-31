import { solveGauss } from "../../algorithms/lab4/linear-systems";
import { askConfirm, askPositiveInteger } from "../../core/input";
import { formatVector, printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askLinearSystemInput,
  printLab4Error,
  printMatrixAndVector,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de eliminacion de Gauss para resolver Ax = b.
 * @returns Promesa que finaliza cuando la interaccion y la impresion concluyen.
 */
export async function runLab4Exercise1(): Promise<void> {
  console.log("Laboratorio 4 - Ejercicio 1");

  const { matrix, vector } = await askLinearSystemInput();
  const useRounding = await askConfirm(
    "Desea redondear por cifras significativas durante Gauss?",
    false
  );
  const significantDigits = useRounding
    ? await askPositiveInteger("Ingrese la cantidad de cifras significativas")
    : undefined;

  try {
    const { result, ms } = await timeExecution(() =>
      solveGauss(matrix, vector, { significantDigits })
    );

    console.log("Metodo: Eliminacion de Gauss");
    printMatrixAndVector(matrix, vector);
    if (significantDigits !== undefined) {
      console.log(`Cifras significativas: ${significantDigits}`);
    }
    console.log(`Solucion x: ${formatVector(result.solution)}`);
    console.log(`Residuo Ax - b: ${formatVector(result.residual)}`);
    printExecutionTime(ms);
  } catch (error) {
    printLab4Error(error);
  }
}
