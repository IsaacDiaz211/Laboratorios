import { askMatrix, askPositiveInteger, askVector } from "../../core/input";
import { formatMatrix, formatVector } from "../../core/output";
import type { Matrix, Vector } from "../../core/matrix";

export type LinearSystemInput = {
  dimension: number;
  matrix: Matrix;
  vector: Vector;
};

/**
 * Solicita una matriz cuadrada A y un vector b para un sistema Ax = b.
 * @returns Dimension, matriz y vector capturados manualmente por teclado.
 */
export async function askLinearSystemInput(): Promise<LinearSystemInput> {
  const dimension = await askPositiveInteger("Ingrese la dimension n del sistema");
  const matrix = await askMatrix(dimension, {
    float: true,
    label: "Ingrese el valor de",
  });
  const vector = await askVector(dimension, "Ingrese el valor de b", {
    float: true,
  });

  return {
    dimension,
    matrix,
    vector,
  };
}

/**
 * Solicita una matriz cuadrada A para metodos de autovalores.
 * @returns Dimension y matriz capturadas manualmente por teclado.
 */
export async function askSquareMatrixInput(): Promise<{
  dimension: number;
  matrix: Matrix;
}> {
  const dimension = await askPositiveInteger("Ingrese la dimension n de la matriz");
  const matrix = await askMatrix(dimension, {
    float: true,
    label: "Ingrese el valor de",
  });

  return {
    dimension,
    matrix,
  };
}

/**
 * Imprime una matriz A y, opcionalmente, un vector b de forma legible.
 * @param matrix Matriz a mostrar.
 * @param vector Vector opcional asociado al sistema.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printMatrixAndVector(matrix: Matrix, vector?: Vector): void {
  console.log("Matriz A:");
  console.log(formatMatrix(matrix));

  if (vector !== undefined) {
    console.log(`Vector b: ${formatVector(vector)}`);
  }
}

/**
 * Da formato legible a un polinomio a partir de sus coeficientes.
 * @param coefficients Coeficientes ordenados desde el mayor grado al termino independiente.
 * @returns Cadena del polinomio caracteristico en funcion de lambda.
 */
export function formatCharacteristicPolynomial(coefficients: number[]): string {
  const degree = coefficients.length - 1;
  return coefficients
    .map((coefficient, index) => {
      const currentDegree = degree - index;
      if (index === 0) {
        if (currentDegree === 0) {
          return `${coefficient}`;
        }

        if (currentDegree === 1) {
          return "lambda";
        }

        return `lambda^${currentDegree}`;
      }

      const sign = coefficient >= 0 ? "+" : "-";
      const absoluteValue = Math.abs(coefficient);

      if (currentDegree === 0) {
        return `${sign} ${absoluteValue}`;
      }

      if (currentDegree === 1) {
        return `${sign} ${absoluteValue}*lambda`;
      }

      return `${sign} ${absoluteValue}*lambda^${currentDegree}`;
    })
    .join(" ");
}

/**
 * Convierte un valor numerico opcional a texto para impresion en consola.
 * @param value Valor numerico o null cuando el dato no esta disponible.
 * @returns Numero como texto o la marca N/A.
 */
export function formatOptionalNumber(value: number | null): string {
  return value === null ? "N/A" : String(value);
}

/**
 * Imprime en consola el mensaje asociado a un error capturado.
 * @param error Valor capturado en un bloque catch.
 * @returns No retorna valor; solo imprime el mensaje resultante.
 */
export function printLab4Error(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`Error: ${message}`);
}
