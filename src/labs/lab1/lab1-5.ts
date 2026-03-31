import { askPositiveInteger } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

function computeE(terms: number): number {
  let sum = 1;
  let factorial = 1;
  for (let i = 1; i <= terms; i += 1) {
    factorial *= i;
    sum += 1 / factorial;
  }
  return sum;
}

export async function runLab1Exercise5(): Promise<void> {
  console.log("Laboratorio 1 - Ejercicio 5");
  const terms = await askPositiveInteger("Ingrese N");

  const { result: value, ms } = await timeExecution(() => computeE(terms));

  console.log(`N: ${terms}`);
  console.log(`e: ${value}`);
  printExecutionTime(ms);
}
