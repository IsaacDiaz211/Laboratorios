import { askPositiveInteger } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

function computePi(terms: number): number {
  let sum = 0;
  for (let i = 0; i < terms; i += 1) {
    const term = 1 / (2 * i + 1);
    sum += i % 2 === 0 ? term : -term;
  }
  return 4 * sum;
}

export async function runLab1Exercise6(): Promise<void> {
  console.log("Laboratorio 1 - Ejercicio 6");
  const terms = await askPositiveInteger("Ingrese N");

  const { result: value, ms } = await timeExecution(() => computePi(terms));

  console.log(`N: ${terms}`);
  console.log(`pi: ${value}`);
  printExecutionTime(ms);
}
