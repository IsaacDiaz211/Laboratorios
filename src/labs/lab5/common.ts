import type {
  DataPoint,
  FiniteDifferenceTable,
  InterpolationErrorMetrics,
} from "../../algorithms/lab5/interpolation";
import {
  askConfirm,
  askNumber,
  askPositiveInteger,
  askVector,
} from "../../core/input";

export type InterpolationTableInput = {
  count: number;
  xValues: number[];
  yValues: number[];
};

function formatCell(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

function formatPointsRows(points: DataPoint[]): string[] {
  return points.map(
    (point, index) => `${index + 1}\t${formatCell(point.x)}\t${formatCell(point.y)}`
  );
}

/**
 * Solicita una tabla de puntos (x, y) por teclado.
 * @param minPoints Cantidad minima de nodos exigida por el metodo elegido.
 * @returns Cantidad de puntos y los vectores x e y capturados.
 */
export async function askInterpolationTableInput(
  minPoints = 1
): Promise<InterpolationTableInput> {
  let count = await askPositiveInteger("Ingrese la cantidad de puntos");
  while (count < minPoints) {
    console.log(`Se requieren al menos ${minPoints} puntos para este metodo.`);
    count = await askPositiveInteger("Ingrese la cantidad de puntos");
  }

  const xValues = await askVector(count, "Ingrese x", { float: true });
  const yValues = await askVector(count, "Ingrese y", { float: true });

  return {
    count,
    xValues,
    yValues,
  };
}

/**
 * Pregunta de forma opcional un valor de referencia para calcular errores.
 * @returns Valor de referencia o undefined si el usuario no desea ingresarlo.
 */
export async function askOptionalReferenceValue(): Promise<number | undefined> {
  const wantsReference = await askConfirm(
    "Desea ingresar un valor de referencia para calcular el error?",
    false
  );

  if (!wantsReference) {
    return undefined;
  }

  return askNumber("Ingrese el valor de referencia", { float: true });
}

/**
 * Da formato tabular a la tabla original de puntos ingresada por el usuario.
 * @param xValues Vector de nodos x.
 * @param yValues Vector de valores y.
 * @returns Texto multilinea listo para imprimir en consola.
 */
export function formatInputTable(xValues: number[], yValues: number[]): string {
  const points = xValues.map((x, index) => ({ x, y: yValues[index] }));
  return ["i\tx\ty", ...formatPointsRows(points)].join("\n");
}

/**
 * Imprime la tabla original de puntos x e y.
 * @param xValues Vector de nodos x.
 * @param yValues Vector de valores y.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printInputTable(xValues: number[], yValues: number[]): void {
  console.log("Tabla ingresada:");
  console.log(formatInputTable(xValues, yValues));
}

/**
 * Da formato a un subconjunto de puntos usado por metodos con 2 o 3 nodos.
 * @param points Puntos seleccionados por el algoritmo.
 * @returns Texto tabular para consola.
 */
export function formatSelectedPoints(points: DataPoint[]): string {
  return ["i\tx\ty", ...formatPointsRows(points)].join("\n");
}

/**
 * Imprime el subconjunto de puntos usado por el metodo actual.
 * @param points Puntos seleccionados por el algoritmo.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printSelectedPoints(points: DataPoint[]): void {
  console.log("Puntos utilizados:");
  console.log(formatSelectedPoints(points));
}

/**
 * Convierte la tabla triangular de diferencias a un bloque legible para consola.
 * @param table Tabla de diferencias con su direccion preferida de despliegue.
 * @returns Texto tabular con columnas y, d1, d2, etc.
 */
export function formatFiniteDifferenceTable(table: FiniteDifferenceTable): string {
  const headers = ["i", "x", "y"];
  for (let order = 1; order < table.columns.length; order += 1) {
    headers.push(`d${order}`);
  }

  const rows = [headers.join("\t")];
  for (let row = 0; row < table.xValues.length; row += 1) {
    const values = [String(row + 1), String(table.xValues[row]), formatCell(table.columns[0][row])];

    for (let order = 1; order < table.columns.length; order += 1) {
      const column = table.columns[order];
      const entryIndex = table.direction === "forward" ? row : row - order;
      values.push(
        entryIndex >= 0 && entryIndex < column.length
          ? formatCell(column[entryIndex])
          : ""
      );
    }

    rows.push(values.join("\t"));
  }

  return rows.join("\n");
}

/**
 * Imprime la tabla de diferencias finitas cuando el metodo la produce.
 * @param table Tabla de diferencias calculada por el algoritmo.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printFiniteDifferenceTable(table: FiniteDifferenceTable): void {
  console.log(
    `Tabla de diferencias ${
      table.direction === "forward" ? "hacia adelante" : "hacia atras"
    }:`
  );
  console.log(formatFiniteDifferenceTable(table));
}

/**
 * Imprime errores absoluto y relativo cuando existe valor de referencia.
 * @param metrics Estructura con los errores ya calculados.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printErrorMetrics(metrics: InterpolationErrorMetrics): void {
  console.log(`Error absoluto: ${metrics.absoluteError}`);
  console.log(
    `Error relativo: ${metrics.relativeError === null ? "N/A" : metrics.relativeError}`
  );

  if (metrics.warning !== undefined) {
    console.log(`Advertencia: ${metrics.warning}`);
  }
}

/**
 * Imprime advertencias relevantes del metodo, por ejemplo extrapolacion.
 * @param warnings Lista de advertencias a mostrar.
 * @returns No retorna valor; solo imprime en consola.
 */
export function printWarnings(warnings: string[]): void {
  for (const warning of warnings) {
    console.log(`Advertencia: ${warning}`);
  }
}

/**
 * Imprime en consola un mensaje legible a partir de un error capturado.
 * @param error Valor atrapado en un bloque catch.
 * @returns No retorna valor; solo imprime el mensaje final.
 */
export function printLab5Error(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`Error: ${message}`);
}
