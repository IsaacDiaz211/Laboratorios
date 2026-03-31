import { askPositiveInteger } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

function fibonacciSequence(count: number): number[] {
  if (count <= 0) {
    return [];
  }
  if (count === 1) {
    return [0];
  }
  const sequence = [0, 1];
  while (sequence.length < count) {
    const last = sequence[sequence.length - 1];
    const prev = sequence[sequence.length - 2];
    sequence.push(last + prev);
  }
  return sequence;
}

export async function runLab1Exercise3(): Promise<void> {
  console.log("Laboratorio 1 - Ejercicio 3");
  const count = await askPositiveInteger("Ingrese N");

  const { result: sequence, ms } = await timeExecution(() =>
    fibonacciSequence(count)
  );

  console.log(`N: ${count}`);
  console.log(`Secuencia: ${sequence.join(", ")}`);
  printExecutionTime(ms);
}
