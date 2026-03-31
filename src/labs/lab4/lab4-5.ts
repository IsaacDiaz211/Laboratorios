import { faddeevLeverrier } from "../../algorithms/lab4/eigen";
import { formatVector, printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import {
  askSquareMatrixInput,
  formatCharacteristicPolynomial,
  printLab4Error,
  printMatrixAndVector,
} from "./common";

/**
 * Ejecuta desde la CLI el metodo de Fadeev-Leverrier para el polinomio caracteristico.
 * @returns Promesa que finaliza cuando la interaccion y la impresion concluyen.
 */
export async function runLab4Exercise5(): Promise<void> {
  console.log("Laboratorio 4 - Ejercicio 5");

  const { dimension, matrix } = await askSquareMatrixInput();

  try {
    const { result, ms } = await timeExecution(() => faddeevLeverrier(matrix));

    console.log("Metodo: Fadeev-Leverrier");
    printMatrixAndVector(matrix);
    console.log(`Dimension: ${dimension}`);
    console.log(`Coeficientes: ${formatVector(result.coefficients)}`);
    console.log(
      `Polinomio caracteristico: ${formatCharacteristicPolynomial(result.coefficients)}`
    );

    if (result.eigenvalues !== undefined) {
      console.log(`Autovalores: ${formatVector(result.eigenvalues)}`);
    } else {
      console.log(
        "Autovalores y autovectores: solo se calculan automaticamente para matrices 3x3."
      );
    }

    if (result.eigenpairs !== undefined) {
      for (const eigenpair of result.eigenpairs) {
        console.log(
          `Autovalor ${eigenpair.eigenvalue} (multiplicidad ${eigenpair.multiplicity}): autovector = ${formatVector(eigenpair.eigenvector)}`
        );
      }
    }

    printExecutionTime(ms);
  } catch (error) {
    printLab4Error(error);
  }
}
