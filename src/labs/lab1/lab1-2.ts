import { askFileName } from "../../core/input";
import { readNumbersFromJson } from "../../core/files";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

const EXPECTED_COUNT = 200;

function sumEven(values: number[]): number {
  return values.reduce((acc, value) => (value % 2 === 0 ? acc + value : acc), 0);
}

async function loadNumbersFromFile(): Promise<number[]> {
  while (true) {
    const fileName = await askFileName(
      "Ingrese el nombre del archivo JSON en data/"
    );
    try {
      return await readNumbersFromJson(fileName, {
        expectedCount: EXPECTED_COUNT,
        integerOnly: true,
        positiveOnly: true,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Error: ${message}`);
    }
  }
}

export async function runLab1Exercise2(): Promise<void> {
  console.log("Laboratorio 1 - Ejercicio 2");
  const numbers = await loadNumbersFromFile();

  const { result: sum, ms } = await timeExecution(() => sumEven(numbers));

  console.log(`Cantidad de numeros: ${numbers.length}`);
  console.log(`Suma de pares: ${sum}`);
  printExecutionTime(ms);
}
