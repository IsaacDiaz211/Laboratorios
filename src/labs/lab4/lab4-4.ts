import { solveGaussSeidel } from "../../algorithms/lab4/linear-systems";
import { askNumber, askPositiveInteger, askVector } from "../../core/input";
import { formatVector, printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askLinearSystemInput,
  printLab4Error,
  printMatrixAndVector,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de Gauss-Seidel para aproximar la solucion de Ax = b.
 * @returns Promesa que finaliza cuando la interaccion y la impresion concluyen.
 */
export async function runLab4Exercise4(): Promise<void> {
  console.log("Laboratorio 4 - Ejercicio 4");

  const { dimension, matrix, vector } = await askLinearSystemInput();
  const initialGuess = await askVector(dimension, "Ingrese el valor de x0", {
    float: true,
  });
  const tolerance = await askNumber("Ingrese la tolerancia", { float: true });
  const maxIterations = await askPositiveInteger("Ingrese el maximo de iteraciones");

  try {
    const { result, ms } = await timeExecution(() =>
      solveGaussSeidel(matrix, vector, {
        initialGuess,
        tolerance,
        maxIterations,
      })
    );

    console.log("Metodo: Gauss-Seidel");
    printMatrixAndVector(matrix, vector);
    console.log(`Vector inicial x0: ${formatVector(initialGuess)}`);
    console.log(`Tolerancia: ${tolerance}`);
    console.log(`Maximo de iteraciones: ${maxIterations}`);
    console.log(`Convergencia: ${result.converged ? "Si" : "No"}`);
    console.log(`Solucion aproximada: ${formatVector(result.solution)}`);
    console.log(`Iteraciones realizadas: ${result.iterations}`);
    console.log(`Residuo Ax - b: ${formatVector(result.residual)}`);
    console.log("Historial de iteraciones:");
    for (const iteration of result.history) {
      console.log(
        `Iteracion ${iteration.iteration}: x = ${formatVector(iteration.approximation)}, error = ${iteration.error}, residuo = ${formatVector(iteration.residual)}, norma residuo = ${iteration.residualNorm}`
      );
    }
    printExecutionTime(ms);
  } catch (error) {
    printLab4Error(error);
  }
}
