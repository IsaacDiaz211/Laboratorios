export function formatExecutionTime(ms: number): string {
  return `Tiempo de ejecucci\u00f3n: ${ms.toFixed(6)} ms`;
}

export function printExecutionTime(ms: number): void {
  console.log(formatExecutionTime(ms));
}
