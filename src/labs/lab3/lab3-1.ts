import {
  algo_bisection,
  algo_iteration,
  algo_iteration_aitken,
  algo_linear_interpolation,
  algo_newton_raphson,
  createFunctionFromString,
  guessIntervals,
  type Root,
} from "../../algorithms/lab3";
import { askNumber, askSelect, askText } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { generateFunctionPlot, openFile } from "../../core/plot";
import { timeExecution } from "../../core/timer";

type Lab3Part = "grafico" | "tanteo" | "raices";
type RootMethod =
  | "biseccion"
  | "regula_falsi"
  | "newton"
  | "iteracion"
  | "iteracion_aitken";

function clearConsole(): void {
  console.clear();
}

async function askRange(
  xLowerMessage: string,
  xUpperMessage: string,
  initialLower: number,
  initialUpper: number
): Promise<{ xLower: number; xUpper: number }> {
  while (true) {
    const xLower = await askNumber(xLowerMessage, {
      float: true,
      initial: initialLower,
    });
    const xUpper = await askNumber(xUpperMessage, {
      float: true,
      initial: initialUpper,
    });

    if (xUpper > xLower) {
      return { xLower, xUpper };
    }

    console.log("x_upper debe ser mayor que x_lower.");
  }
}

function buildFunction(expression: string): (x: number) => number {
  return createFunctionFromString(expression);
}

async function askFunctionExpression(message: string): Promise<{
  expression: string;
  fn: (x: number) => number;
}> {
  while (true) {
    const expression = await askText(message);
    try {
      const fn = buildFunction(expression);
      return { expression, fn };
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.log(`Error: ${detail}`);
      console.log("Ejemplos validos: x**2 - 4, Math.sin(x), sin(x), exp(x) - 3*x");
    }
  }
}

function printIntervals(intervals: [number, number][]): void {
  if (intervals.length === 0) {
    console.log("No se detectaron intervalos con cambio de signo en el rango evaluado.");
    return;
  }

  console.log("Intervalos detectados:");
  for (const [index, interval] of intervals.entries()) {
    console.log(`${index + 1}. [${interval[0]}, ${interval[1]}]`);
  }
}

async function runPartGraph(): Promise<void> {
  clearConsole();
  console.log("Laboratorio 3 - Parte 1: Metodo grafico");

  const { expression, fn } = await askFunctionExpression(
    "Ingrese f(x) en formato JS/TS"
  );
  const { xLower, xUpper } = await askRange(
    "Ingrese x_lower para el grafico",
    "Ingrese x_upper para el grafico",
    -10,
    10
  );
  const samples = await askNumber("Ingrese la cantidad de muestras", {
    min: 100,
    max: 5000,
    initial: 800,
  });

  const { result, ms } = await timeExecution(async () => {
    const plot = await generateFunctionPlot(fn, {
      xLower,
      xUpper,
      samples,
      filePrefix: "lab3-grafico",
    });
    const intervals = guessIntervals(expression, xLower, xUpper, (xUpper - xLower) / samples);
    await openFile(plot.filePath);
    return { plot, intervals };
  });

  console.log("Vista ASCII del grafico:");
  console.log(result.plot.ascii);
  console.log(`Archivo PNG: ${result.plot.filePath}`);
  console.log(`Rango X: [${result.plot.xLower}, ${result.plot.xUpper}]`);
  console.log(`Rango Y: [${result.plot.yLower}, ${result.plot.yUpper}]`);
  printIntervals(result.intervals);
  printExecutionTime(ms);
}

async function runPartTanteo(): Promise<void> {
  clearConsole();
  console.log("Laboratorio 3 - Parte 2: Metodo de tanteo");

  const { expression } = await askFunctionExpression(
    "Ingrese f(x) en formato JS/TS"
  );
  const { xLower, xUpper } = await askRange(
    "Ingrese x_lower para el tanteo",
    "Ingrese x_upper para el tanteo",
    -100,
    100
  );
  const increment = await askNumber("Ingrese el incremento", {
    float: true,
    min: Number.EPSILON,
    initial: 0.5,
  });

  const { result: intervals, ms } = await timeExecution(() =>
    guessIntervals(expression, xLower, xUpper, increment)
  );

  console.log(`Rango evaluado: [${xLower}, ${xUpper}]`);
  console.log(`Incremento: ${increment}`);
  printIntervals(intervals);
  printExecutionTime(ms);
}

async function askRootMethod(): Promise<RootMethod> {
  return askSelect<RootMethod>("Seleccione el algoritmo", [
    { title: "1) Biseccion", value: "biseccion" },
    { title: "2) Interpolacion Lineal (Regula Falsi)", value: "regula_falsi" },
    { title: "3) Newton-Raphson", value: "newton" },
    { title: "4) Iteracion", value: "iteracion" },
    { title: "5) Iteracion con Aceleracion de Aitken", value: "iteracion_aitken" },
  ]);
}

function printRootResult(result: Root, fn: (x: number) => number): void {
  console.log(`Raiz aproximada: ${result.root}`);
  console.log(`f(raiz): ${fn(result.root)}`);
  console.log(`Error relativo final: ${result.error_a}`);
  console.log(`Iteraciones: ${result.iterations}`);
}

async function runPartRoots(): Promise<void> {
  clearConsole();
  console.log("Laboratorio 3 - Parte 3: Aproximacion de raices");

  const method = await askRootMethod();
  const { fn } = await askFunctionExpression("Ingrese f(x) en formato JS/TS");
  const tolerance = await askNumber("Ingrese la cota de error aceptada", {
    float: true,
    min: Number.EPSILON,
    initial: 0.0001,
  });
  const maxIterations = await askNumber("Ingrese la cantidad maxima de iteraciones", {
    min: 1,
    initial: 50,
  });

  if (method === "newton") {
    const x0 = await askNumber("Ingrese el valor aproximado de la raiz", {
      float: true,
      initial: 1,
    });

    const { result, ms } = await timeExecution(() =>
      algo_newton_raphson(fn, x0, maxIterations, tolerance)
    );

    printRootResult(result, fn);
    printExecutionTime(ms);
    return;
  }

  const x0 = await askNumber("Ingrese el valor aproximado de la raiz", {
    float: true,
    initial: 1,
  });
  const { xLower, xUpper } = await askRange(
    "Ingrese x_lower",
    "Ingrese x_upper",
    x0 - 1,
    x0 + 1
  );

  if (x0 < xLower || x0 > xUpper) {
    throw new Error("La aproximacion inicial debe estar dentro del intervalo [x_lower, x_upper].");
  }

  if (method === "biseccion") {
    const { result, ms } = await timeExecution(() =>
      algo_bisection(fn, xLower, xUpper, maxIterations, tolerance)
    );

    printRootResult(result, fn);
    printExecutionTime(ms);
    return;
  }

  if (method === "regula_falsi") {
    const { result, ms } = await timeExecution(() =>
      algo_linear_interpolation(fn, xLower, xUpper, maxIterations, tolerance)
    );

    printRootResult(result, fn);
    printExecutionTime(ms);
    return;
  }

  const { expression: gExpression, fn: g } = await askFunctionExpression(
    "Ingrese g(x) en formato JS/TS"
  );
  console.log(`Usando g(x): ${gExpression}`);

  if (method === "iteracion") {
    const { result, ms } = await timeExecution(() =>
      algo_iteration(g, xLower, xUpper, maxIterations, tolerance, x0)
    );

    printRootResult(result, fn);
    printExecutionTime(ms);
    return;
  }

  const { result, ms } = await timeExecution(() =>
    algo_iteration_aitken(g, xLower, xUpper, maxIterations, tolerance, x0)
  );

  printRootResult(result, fn);
  printExecutionTime(ms);
}

export async function runLab3Exercise1(): Promise<void> {
  clearConsole();
  console.log("Laboratorio 3 - Ejercicio 1");

  const part = await askSelect<Lab3Part>("Seleccione una parte", [
    { title: "Parte 1) Metodo grafico", value: "grafico" },
    { title: "Parte 2) Metodo de tanteo", value: "tanteo" },
    { title: "Parte 3) Metodos de aproximacion", value: "raices" },
  ]);

  if (part === "grafico") {
    await runPartGraph();
    return;
  }

  if (part === "tanteo") {
    await runPartTanteo();
    return;
  }

  await runPartRoots();
}
