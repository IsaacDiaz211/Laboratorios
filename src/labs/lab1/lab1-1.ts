import {
  askFileName,
  askNumbersList,
  askPositiveInteger,
} from "../../core/input";
import { readNumbersFromJson } from "../../core/files";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

const RANGE_MIN = 0;
const RANGE_MAX = 255;

function sumNumbers(values: number[]): number {
  return values.reduce((acc, value) => acc + value, 0);
}

async function loadNumbersFromFile(count: number): Promise<number[]> {
  while (true) {
    const fileName = await askFileName(
      "Ingrese el nombre del archivo JSON en data/"
    );
    try {
      return await readNumbersFromJson(fileName, {
        expectedCount: count,
        integerOnly: true,
        min: RANGE_MIN,
        max: RANGE_MAX,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Error: ${message}`);
    }
  }
}

export async function runLab1Exercise1(): Promise<void> {
  console.log("Laboratorio 1 - Ejercicio 1");
  const count = await askPositiveInteger("Cuantos numeros va a sumar?");

  let numbers: number[] = [];
  if (count <= 9) {
    numbers = await askNumbersList(count, {
      integerOnly: true,
      min: RANGE_MIN,
      max: RANGE_MAX,
      label: "Ingrese el numero",
    });
  } else {
    numbers = await loadNumbersFromFile(count);
  }

  const { result: sum, ms } = await timeExecution(() => sumNumbers(numbers));

  console.log(`Cantidad de numeros: ${numbers.length}`);
  console.log(`Suma: ${sum}`);
  printExecutionTime(ms);
}
