import type { Matrix, Vector } from "./matrix";

export function formatExecutionTime(ms: number): string {
  return `Tiempo de ejecucion: ${ms.toFixed(6)} ms`;
}

export function printExecutionTime(ms: number): void {
  console.log(formatExecutionTime(ms));
}

/**
 * Convierte un vector numerico a un formato legible para consola.
 * @param vector Vector a mostrar.
 * @returns Cadena con el vector entre corchetes.
 */
export function formatVector(vector: Vector): string {
  return `[${vector.join(", ")}]`;
}

/**
 * Convierte una matriz numerica a un bloque de texto legible para consola.
 * @param matrix Matriz a mostrar.
 * @returns Cadena multilinea con una fila por linea.
 */
export function formatMatrix(matrix: Matrix): string {
  return matrix.map((row) => formatVector(row)).join("\n");
}
