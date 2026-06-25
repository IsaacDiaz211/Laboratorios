import {
  algo_bisection,
  algo_iteration,
  algo_iteration_aitken,
  algo_linear_interpolation,
  algo_newton_raphson,
  createFunctionFromString,
  evaluateFourierConditions,
  guessIntervals,
  type FourierConditionResult,
  type NewtonIterationInfo,
  type Root,
} from "../../algorithms/lab3";
import { askNumber, askSelect, askText } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";
import { startWebPlot } from "../../core/web-plot";

type Lab3Part = "grafico" | "tanteo" | "raices";

type RootMethod =
  | "biseccion"
  | "regula_falsi"
  | "newton"
  | "iteracion"
  | "iteracion_aitken";

const RESIDUAL_EPS = 1e-12;

function clearConsole(): void {
  console.clear();
}

function trimTrailingZeros(value: string): string {
  if (!value.includes(".")) return value;
  return value.replace(/\.?0+$/, "");
}

function formatHighPrecision(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  if (Object.is(value, -0)) return "0";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs < 1e-4 || abs >= 1e5)) {
    return value.toExponential(16).replace(/(\.\d*?)0+e/, "$1e").replace(/\.e/, "e");
  }
  return trimTrailingZeros(value.toPrecision(17));
}

function formatResidual(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  if (Math.abs(value) < RESIDUAL_EPS) {
    if (Object.is(value, -0) || value === 0) return "≈ 0 (residual = 0)";
    return `≈ 0 (residual = ${formatHighPrecision(value)})`;
  }
  return formatHighPrecision(value);
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
    const intervals = guessIntervals(expression, xLower, xUpper, (xUpper - xLower) / samples);
    const plotHandle = await startWebPlot({
      expression,
      fn,
      xLower,
      xUpper,
      samples,
      markRoot: false,
    });
    return { plotHandle, intervals };
  });

  printIntervals(result.intervals);
  printExecutionTime(ms);
  console.log(`Grafico web disponible en: ${result.plotHandle.url}`);
  console.log("El servidor se cerrara automaticamente tras un periodo de inactividad.");
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

function printFourierResults(label: string, results: FourierConditionResult[]): void {
  console.log(label);
  for (const result of results) {
    const status = result.satisfied ? "cumple" : "no cumple";
    console.log(`  ${result.id}) ${result.description} -> ${result.details} [${status}]`);
  }
}

function printRootResult(result: Root, fn: (x: number) => number): void {
  console.log(`Raiz aproximada: ${formatHighPrecision(result.root)}`);
  console.log(`f(raiz): ${formatResidual(fn(result.root))}`);
  console.log(`Error relativo final: ${formatHighPrecision(result.error_a)}`);
  console.log(`Iteraciones: ${result.iterations}`);
}

export async function runPartRoots(): Promise<void> {
  clearConsole();
  console.log("Laboratorio 3 - Parte 3: Aproximacion de raices");

  const method = await askRootMethod();
  const { expression, fn } = await askFunctionExpression("Ingrese f(x) en formato JS/TS");
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
    const a = await askNumber("Ingrese a (extremo izquierdo del intervalo y x0)", {
      float: true,
      initial: 1,
    });
    const b = await askNumber("Ingrese b (extremo derecho del intervalo)", {
      float: true,
      initial: 2,
    });
    if (b <= a) {
      throw new Error("b debe ser mayor que a.");
    }

    const initialEval = evaluateFourierConditions(fn, a, b);
    console.log("Condiciones de Fourier (intervalo inicial):");
    printFourierResults("", initialEval.results);
    if (!initialEval.ok) {
      const failed = initialEval.results.filter((r) => !r.satisfied);
      const labels = failed.map((r) => r.id).join(", ");
      throw new Error(
        `Las condiciones de Fourier no se cumplen en [${a}, ${b}]: ${labels}.`
      );
    }

    const onIteration = (info: NewtonIterationInfo): void => {
      const lo = Math.min(info.previousApprox, info.approx);
      const hi = Math.max(info.previousApprox, info.approx);
      const iterEval = evaluateFourierConditions(fn, lo, hi, 50);
      console.log(
        `  y = ${formatResidual(info.y)} | f'(x) = ${formatHighPrecision(info.derivative)} | f''(x) = ${formatHighPrecision(info.secondDerivative)} | f(x)·f''(x) = ${formatHighPrecision(info.fourierProduct)}`
      );
      printFourierResults(
        `  Condiciones de Fourier en [${lo}, ${hi}]:`,
        iterEval.results
      );
    };

    const { result, ms } = await timeExecution(() =>
      algo_newton_raphson(fn, a, maxIterations, tolerance, onIteration)
    );

    printRootResult(result, fn);
    printExecutionTime(ms);

    const plotHandle = await startWebPlot({
      expression,
      root: result.root,
      fn,
    });
    console.log(`Grafico web disponible en: ${plotHandle.url}`);
    console.log("El servidor se cerrara automaticamente tras un periodo de inactividad.");
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
  console.log("Laboratorio 3 - Parte 1");

  const part = await askSelect<Lab3Part>("Seleccione un método", [
    { title: "1) Metodo grafico", value: "grafico" },
    { title: "2) Metodo de tanteo", value: "tanteo" },
    { title: "3) Metodos de aproximacion", value: "raices" },
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