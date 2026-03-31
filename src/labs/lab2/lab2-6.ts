import { printExecutionTime } from "../../core/output";
import { sumRepeatedDouble, sumRepeatedFloat32 } from "../../core/precision";
import { timeExecution } from "../../core/timer";

const TIMES = 100000;

export async function runLab2Exercise6(): Promise<void> {
  console.log("Laboratorio 2 - Ejercicio 6");

  const { result, ms } = await timeExecution(() => {
    const sumOneFloat32 = sumRepeatedFloat32(1, TIMES);
    const sumSmallFloat32 = sumRepeatedFloat32(0.00001, TIMES);
    const sumSmallDouble = sumRepeatedDouble(0.00001, TIMES);

    return { sumOneFloat32, sumSmallFloat32, sumSmallDouble };
  });

  console.log(`Suma 1 (float32): ${result.sumOneFloat32}`);
  console.log(`Suma 0.00001 (float32): ${result.sumSmallFloat32}`);
  console.log(`Suma 0.00001 (double): ${result.sumSmallDouble}`);
  printExecutionTime(ms);
}
