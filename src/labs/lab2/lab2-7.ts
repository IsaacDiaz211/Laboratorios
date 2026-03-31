import { askPositiveInteger } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

function sumSeriesAscending(limit: number): number {
  let sum = 0;
  for (let i = 1; i <= limit; i += 1) {
    sum += 1 / (i * i);
  }
  return sum;
}

function sumSeriesDescending(limit: number): number {
  let sum = 0;
  for (let i = limit; i >= 1; i -= 1) {
    sum += 1 / (i * i);
  }
  return sum;
}

export async function runLab2Exercise7(): Promise<void> {
  console.log("Laboratorio 2 - Ejercicio 7");
  const limit = await askPositiveInteger("Ingrese m");

  const { result, ms } = await timeExecution(() => {
    const ascending = sumSeriesAscending(limit);
    const descending = sumSeriesDescending(limit);
    return { ascending, descending };
  });

  console.log(`Suma 1..m: ${result.ascending}`);
  console.log(`Suma m..1: ${result.descending}`);
  printExecutionTime(ms);
}
