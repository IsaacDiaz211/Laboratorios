import { solveLU } from "../../algorithms/lab4/linear-systems";
import { formatMatrix, formatVector, printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askLinearSystemInput,
  printLab4Error,
  printMatrixAndVector,
} from "./common";

/**
 * Ejecuta desde la CLI la factorizacion LU con pivoteo parcial para resolver Ax = b.
 * @returns Promesa que finaliza cuando la interaccion y la impresion concluyen.
 */
export async function runLab4Exercise3(): Promise<void> {
  console.log("Laboratorio 4 - Ejercicio 3");

  const { matrix, vector } = await askLinearSystemInput();

  try {
    const { result, ms } = await timeExecution(() => solveLU(matrix, vector));

    console.log("Metodo: Descomposicion LU");
    printMatrixAndVector(matrix, vector);
    console.log("Matriz L:");
    console.log(formatMatrix(result.L));
    console.log("Matriz U:");
    console.log(formatMatrix(result.U));
    console.log("Matriz P:");
    console.log(formatMatrix(result.P));
    console.log(`Solucion x: ${formatVector(result.solution)}`);
    console.log(`Residuo Ax - b: ${formatVector(result.residual)}`);
    printExecutionTime(ms);
  } catch (error) {
    printLab4Error(error);
  }
}
