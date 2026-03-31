import { askNumber } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { solveQuadratic } from "../../core/quadratic";
import { timeExecution } from "../../core/timer";

export async function runLab2Exercise3(): Promise<void> {
  console.log("Laboratorio 2 - Ejercicio 3");
  let a = await askNumber("Ingrese a", { float: true });
  while (a === 0) {
    console.log("El valor de a no puede ser 0.");
    a = await askNumber("Ingrese a", { float: true });
  }
  const b = await askNumber("Ingrese b", { float: true });
  const c = await askNumber("Ingrese c", { float: true });

  const { result: solution, ms } = await timeExecution(() =>
    solveQuadratic(a, b, c)
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
