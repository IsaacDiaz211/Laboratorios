import type {
  ExactSolutionFunction,
  OdeMethodInput,
  OdeMethodResult,
  OdeStepResult,
} from "../../algorithms/lab7/ivp";
import {
  createDifferentialFunctionFromString,
  createSingleVariableFunctionFromString,
  resolveGrid,
} from "../../algorithms/lab7/ivp";
import type { MilneSeedPoint } from "../../algorithms/lab7/milne";
import type { RK2Variant } from "../../algorithms/lab7/runge-kutta";
import {
  askConfirm,
  askNumber,
  askPositiveInteger,
  askSelect,
  askText,
} from "../../core/input";

type GridMode = "steps" | "xEnd";
type MilneSeedMode = "rk4" | "manual";

export type Lab7ProblemInput = OdeMethodInput & {
  functionExpression: string;
  xEnd: number;
  exactExpression?: string;
};

export type MethodComparisonRow = {
  method: string;
  finalValue: number;
  absoluteError?: number;
  relativeError?: number | null;
  timeMs: number;
};

function formatCell(value: number | string | null | undefined): string {
  if (value === undefined) {
    return "";
  }

  if (value === null) {
    return "N/A";
  }

  return String(value);
}

async function askDifferentialFunctionExpression(): Promise<{
  expression: string;
  fn: OdeMethodInput["f"];
}> {
  while (true) {
    const expression = await askText("Ingrese f(x, y) en formato JS/TS");
    try {
      return {
        expression,
        fn: createDifferentialFunctionFromString(expression),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Error: ${message}`);
      console.log("Ejemplos validos: x + y, y - x**2 + 1, sin(x) - y, x*y");
    }
  }
}

async function askOptionalExactSolution(): Promise<{
  expression?: string;
  fn?: ExactSolutionFunction;
}> {
  const wantsExactSolution = await askConfirm(
    "Desea ingresar una solucion exacta para comparar errores?",
    false
  );

  if (!wantsExactSolution) {
    return {};
  }

  while (true) {
    const expression = await askText("Ingrese y(x) en formato JS/TS");
    try {
      return {
        expression,
        fn: createSingleVariableFunctionFromString(expression),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Error: ${message}`);
      console.log("Ejemplos validos: exp(x), (x + 1)**2 - 0.5*exp(x), cos(x)");
    }
  }
}

async function askGridMode(): Promise<GridMode> {
  return askSelect<GridMode>("Seleccione como desea definir la grilla", [
    { title: "1) Ingresar x final", value: "xEnd" },
    { title: "2) Ingresar cantidad de pasos", value: "steps" },
  ]);
}

/**
 * Solicita por consola los datos base de un problema de valor inicial.
 * @returns Problema listo para resolver con los metodos de Lab 7.
 */
export async function askInitialValueProblemInput(): Promise<Lab7ProblemInput> {
  const { expression, fn } = await askDifferentialFunctionExpression();
  const x0 = await askNumber("Ingrese x0", { float: true });
  const y0 = await askNumber("Ingrese y0", { float: true });
  const h = await askNumber("Ingrese el paso h", {
    float: true,
    min: Number.EPSILON,
  });

  const mode = await askGridMode();
  let grid;
  if (mode === "steps") {
    grid = resolveGrid({
      x0,
      h,
      steps: await askPositiveInteger("Ingrese la cantidad de pasos"),
    });
  } else {
    while (true) {
      const xEnd = await askNumber("Ingrese x final", { float: true });
      try {
        grid = resolveGrid({ x0, h, xEnd });
        break;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log(`Error: ${message}`);
      }
    }
  }

  const exactSolution = await askOptionalExactSolution();

  return {
    functionExpression: expression,
    f: fn,
    x0,
    y0,
    h,
    steps: grid.steps,
    xEnd: grid.xEnd,
    exactExpression: exactSolution.expression,
    exactSolution: exactSolution.fn,
  };
}

/**
 * Solicita la variante deseada de Runge-Kutta de segundo orden.
 * @returns Variante seleccionada: punto medio o Heun.
 */
export async function askRK2Variant(): Promise<RK2Variant> {
  return askSelect<RK2Variant>("Seleccione la variante de RK2", [
    { title: "1) Punto medio", value: "punto_medio" },
    { title: "2) Heun", value: "heun" },
  ]);
}

/**
 * Solicita como se obtendran los valores iniciales de Milne.
 * @returns Modo de semillas: automatico con RK4 o manual.
 */
export async function askMilneSeedMode(): Promise<MilneSeedMode> {
  return askSelect<MilneSeedMode>("Seleccione como obtener los valores iniciales de Milne", [
    { title: "1) Generar con RK4", value: "rk4" },
    { title: "2) Ingresar manualmente", value: "manual" },
  ]);
}

/**
 * Solicita manualmente los valores y1, y2 y y3 requeridos por Milne.
 * @param x0 Punto inicial del problema.
 * @param y0 Valor inicial y(x0).
 * @param h Paso de integracion.
 * @returns Los 4 puntos iniciales consecutivos que usara Milne.
 */
export async function askMilneManualSeedPoints(
  x0: number,
  y0: number,
  h: number
): Promise<MilneSeedPoint[]> {
  const points: MilneSeedPoint[] = [{ x: x0, y: y0 }];

  for (let index = 1; index <= 3; index += 1) {
    const xValue = x0 + index * h;
    const yValue = await askNumber(`Ingrese y para x = ${xValue}`, { float: true });
    points.push({ x: xValue, y: yValue });
  }

  return points;
}

/**
 * Imprime los parametros de entrada del problema de valor inicial.
 * @param input Problema capturado desde la CLI.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printProblemInput(input: Lab7ProblemInput): void {
  console.log(`Ecuacion diferencial: y' = ${input.functionExpression}`);
  console.log(`x0: ${input.x0}`);
  console.log(`y0: ${input.y0}`);
  console.log(`h: ${input.h}`);
  console.log(`Pasos: ${input.steps}`);
  console.log(`x final: ${input.xEnd}`);

  if (input.exactExpression !== undefined) {
    console.log(`Solucion exacta: y(x) = ${input.exactExpression}`);
  }
}

/**
 * Convierte la tabla de resultados paso a paso a un bloque legible para consola.
 * @param results Filas calculadas por un metodo numerico.
 * @returns Texto tabular con las columnas disponibles segun el metodo.
 */
export function formatOdeResultsTable(results: OdeStepResult[]): string {
  const includePredictor = results.some((row) => row.predictor !== undefined);
  const includeCorrector = results.some((row) => row.corrector !== undefined);
  const includeExact = results.some((row) => row.exactValue !== undefined);

  const headers = ["n", "x", "y", "y'"];
  if (includePredictor) {
    headers.push("predictor");
  }
  if (includeCorrector) {
    headers.push("corrector");
  }
  if (includeExact) {
    headers.push("y exacta", "error abs", "error rel");
  }

  const rows = [headers.join("\t")];
  for (const row of results) {
    const values = [
      formatCell(row.step),
      formatCell(row.x),
      formatCell(row.y),
      formatCell(row.derivative),
    ];

    if (includePredictor) {
      values.push(formatCell(row.predictor));
    }
    if (includeCorrector) {
      values.push(formatCell(row.corrector));
    }
    if (includeExact) {
      values.push(
        formatCell(row.exactValue),
        formatCell(row.absoluteError),
        formatCell(row.relativeError)
      );
    }

    rows.push(values.join("\t"));
  }

  return rows.join("\n");
}

/**
 * Imprime la tabla paso a paso generada por el metodo numerico.
 * @param results Filas calculadas por un metodo de Lab 7.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printOdeResultsTable(results: OdeStepResult[]): void {
  console.log(formatOdeResultsTable(results));
}

/**
 * Imprime el error final cuando existe solucion exacta disponible.
 * @param result Resultado completo del metodo numerico.
 * @returns No retorna valor; solo imprime el error final si aplica.
 */
export function printFinalErrorMetrics(result: OdeMethodResult): void {
  const lastStep = result.results[result.results.length - 1];
  if (lastStep.exactValue === undefined) {
    return;
  }

  console.log(`Valor exacto final: ${lastStep.exactValue}`);
  console.log(`Error absoluto final: ${lastStep.absoluteError}`);
  console.log(
    `Error relativo final: ${lastStep.relativeError === null ? "N/A" : lastStep.relativeError}`
  );
}

/**
 * Imprime advertencias relevantes del metodo actual.
 * @param warnings Lista de advertencias a mostrar.
 * @returns No retorna valor; solo imprime las advertencias.
 */
export function printWarnings(warnings: string[]): void {
  for (const warning of warnings) {
    console.log(`Advertencia: ${warning}`);
  }
}

/**
 * Convierte una comparacion entre metodos a un formato tabular para consola.
 * @param rows Filas de resumen con resultados finales por metodo.
 * @returns Texto tabular listo para imprimir.
 */
export function formatComparisonTable(rows: MethodComparisonRow[]): string {
  const includeErrors = rows.some((row) => row.absoluteError !== undefined);
  const headers = ["Metodo", "y(x final)"];
  if (includeErrors) {
    headers.push("error abs", "error rel");
  }
  headers.push("tiempo (ms)");

  const lines = [headers.join("\t")];
  for (const row of rows) {
    const values = [formatCell(row.method), formatCell(row.finalValue)];
    if (includeErrors) {
      values.push(formatCell(row.absoluteError), formatCell(row.relativeError));
    }
    values.push(formatCell(row.timeMs));
    lines.push(values.join("\t"));
  }

  return lines.join("\n");
}

/**
 * Imprime el resumen comparativo entre varios metodos numericos.
 * @param rows Filas con valor final, error y tiempo por metodo.
 * @returns No retorna valor; solo imprime la tabla en consola.
 */
export function printComparisonTable(rows: MethodComparisonRow[]): void {
  console.log(formatComparisonTable(rows));
}

/**
 * Imprime en consola un mensaje legible a partir de un error capturado.
 * @param error Valor atrapado en un bloque catch.
 * @returns No retorna valor; solo imprime el mensaje final.
 */
export function printLab7Error(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`Error: ${message}`);
}
