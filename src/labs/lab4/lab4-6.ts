import { powerMethod } from "../../algorithms/lab4/eigen";
import {
  askNumber,
  askPositiveInteger,
  askSelect,
  askVector,
} from "../../core/input";
import { formatVector, printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askSquareMatrixInput,
  formatOptionalNumber,
  printLab4Error,
  printMatrixAndVector,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de las potencias para aproximar el autovalor dominante.
 * @returns Promesa que finaliza cuando la interaccion y la impresion concluyen.
 */
export async function runLab4Exercise6(): Promise<void> {
  console.log("Laboratorio 4 - Ejercicio 6");

  const { dimension, matrix } = await askSquareMatrixInput();
  const initialVector = await askVector(dimension, "Ingrese el valor de x0", {
    float: true,
  });
  const mode = await askSelect<"tolerance" | "fixed">(
    "Seleccione el criterio de parada",
    [
      { title: "Tolerancia + maximo de iteraciones", value: "tolerance" },
      { title: "Cantidad fija de iteraciones", value: "fixed" },
    ]
  );

  let tolerance: number | undefined;
  let maxIterations: number;

  if (mode === "tolerance") {
    tolerance = await askNumber("Ingrese la tolerancia", { float: true });
    maxIterations = await askPositiveInteger("Ingrese el maximo de iteraciones");
  } else {
    maxIterations = await askPositiveInteger("Ingrese la cantidad de iteraciones");
  }

  try {
    const { result, ms } = await timeExecution(() =>
      powerMethod(matrix, {
        initialVector,
        tolerance,
        maxIterations,
      })
    );

    console.log("Metodo: Metodo de las potencias");
    printMatrixAndVector(matrix);
    console.log(`Vector inicial x0: ${formatVector(initialVector)}`);
    if (tolerance !== undefined) {
      console.log(`Tolerancia: ${tolerance}`);
    } else {
      console.log("Tolerancia: no aplica (iteraciones fijas)");
    }
    console.log(`Iteraciones realizadas: ${result.iterations}`);
    console.log(
      `Convergencia: ${
        tolerance === undefined
          ? "No evaluada (iteraciones fijas)"
          : result.converged
            ? "Si"
            : "No"
      }`
    );
    console.log(`Autovalor dominante: ${result.dominantEigenvalue}`);
    console.log(`Autovector dominante: ${formatVector(result.eigenvector)}`);
    console.log("Historial de iteraciones:");
    for (const iteration of result.history) {
      console.log(
        `Iteracion ${iteration.iteration}: lambda = ${iteration.eigenvalue}, error lambda = ${formatOptionalNumber(iteration.eigenvalueError)}, error x = ${iteration.vectorError}, x = ${formatVector(iteration.eigenvector)}`
      );
    }
    printExecutionTime(ms);
  } catch (error) {
    printLab4Error(error);
  }
}
