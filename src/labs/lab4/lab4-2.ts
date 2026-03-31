import { solveGaussJordan } from "../../algorithms/lab4/linear-systems";
import { formatVector, printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askLinearSystemInput,
  printLab4Error,
  printMatrixAndVector,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de Gauss-Jordan para resolver Ax = b.
 * @returns Promesa que finaliza cuando la interaccion y la impresion concluyen.
 */
export async function runLab4Exercise2(): Promise<void> {
  console.log("Laboratorio 4 - Ejercicio 2");

  const { matrix, vector } = await askLinearSystemInput();

  try {
    const { result, ms } = await timeExecution(() => solveGaussJordan(matrix, vector));

    console.log("Metodo: Gauss-Jordan");
    printMatrixAndVector(matrix, vector);
    console.log(`Solucion x: ${formatVector(result.solution)}`);
    console.log(`Residuo Ax - b: ${formatVector(result.residual)}`);
    printExecutionTime(ms);
  } catch (error) {
    printLab4Error(error);
  }
}
