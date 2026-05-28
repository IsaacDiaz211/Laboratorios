import { formatNumber } from "./output";

export type PrintableErrorMetrics = {
  absoluteError: number;
  relativeError: number | null;
  warning?: string;
};

/**
 * Imprime errores absoluto y relativo con un formato uniforme de consola.
 * @param metrics Estructura con ambos errores y advertencia opcional.
 * @returns No retorna valor; solo imprime el resumen en consola.
 */
export function printErrorMetrics(metrics: PrintableErrorMetrics): void {
  console.log(`Error absoluto: ${formatNumber(metrics.absoluteError)}`);
  console.log(
    `Error relativo: ${metrics.relativeError === null ? "N/A" : formatNumber(metrics.relativeError)}`
  );

  if (metrics.warning !== undefined) {
    console.log(`Advertencia: ${metrics.warning}`);
  }
}

/**
 * Imprime una lista de advertencias con formato uniforme.
 * @param warnings Advertencias a mostrar.
 * @returns No retorna valor; solo imprime cada advertencia.
 */
export function printWarnings(warnings: string[]): void {
  for (const warning of warnings) {
    console.log(`Advertencia: ${warning}`);
  }
}

/**
 * Imprime el mensaje asociado a un error capturado.
 * @param error Valor atrapado en un bloque catch.
 * @returns No retorna valor; solo imprime el mensaje final.
 */
export function printCapturedError(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`Error: ${message}`);
}
