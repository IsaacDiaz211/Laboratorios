import type { Matrix, Vector } from "./matrix";

function trimFixedNumber(value: string): string {
  return value.includes(".") ? value.replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1") : value;
}

function trimExponentialNumber(value: string): string {
  return value.replace(/\.0+e/, "e").replace(/(\.\d*?[1-9])0+e/, "$1e");
}

/**
 * Convierte un numero a un formato compacto y legible para consola.
 * @param value Numero a formatear.
 * @param decimals Cantidad maxima de decimales a conservar.
 * @returns Cadena con decimales recortados o notacion cientifica si conviene.
 */
export function formatNumber(value: number, decimals = 6): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  if (Object.is(value, -0)) {
    return "0";
  }

  const absoluteValue = Math.abs(value);
  if (absoluteValue !== 0 && (absoluteValue < 10 ** -decimals || absoluteValue >= 10 ** (decimals + 2))) {
    return trimExponentialNumber(value.toExponential(decimals));
  }

  return trimFixedNumber(value.toFixed(decimals));
}

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
  return `[${vector.map((value) => formatNumber(value)).join(", ")}]`;
}

/**
 * Convierte una matriz numerica a un bloque de texto legible para consola.
 * @param matrix Matriz a mostrar.
 * @returns Cadena multilinea con una fila por linea.
 */
export function formatMatrix(matrix: Matrix): string {
  return matrix.map((row) => formatVector(row)).join("\n");
}
