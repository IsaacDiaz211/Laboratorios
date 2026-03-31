import { printExecutionTime } from "../../core/output";
import { solveQuadratic } from "../../core/quadratic";
import { timeExecution } from "../../core/timer";

export async function runLab1Exercise4(): Promise<void> {
  console.log("Laboratorio 1 - Ejercicio 4");
  console.log("Ecuacion: 3*x^2 + 2*x - 1 = 0");

  const { result: solution, ms } = await timeExecution(() =>
    solveQuadratic(3, 2, -1)
  );

  if (solution.type === "real") {
    console.log(`x1: ${solution.roots[0]}`);
    console.log(`x2: ${solution.roots[1]}`);
  } else if (solution.type === "double") {
    console.log(`x: ${solution.root}`);
  } else {
    console.log(`x1: ${solution.real} + ${solution.imag}i`);
    console.log(`x2: ${solution.real} - ${solution.imag}i`);
  }

  printExecutionTime(ms);
}
