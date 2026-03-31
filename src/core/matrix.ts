import { applySignificantDigits } from "./precision";

export type Matrix = number[][];
export type Vector = number[];
export type VectorNormType = "euclidean" | "infinity";

const EPSILON = 1e-12;

function roundValue(value: number, significantDigits?: number): number {
  return applySignificantDigits(value, significantDigits);
}

/**
 * Crea una copia profunda de una matriz numérica.
 * @param matrix Matriz origen que no debe ser modificada.
 * @returns Nueva matriz con los mismos valores.
 */
export function cloneMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => [...row]);
}

/**
 * Verifica que una matriz sea cuadrada y no vacía.
 * @param matrix Matriz a validar.
 * @param name Nombre mostrado en mensajes de error.
 * @returns No retorna valor; lanza error si la validación falla.
 */
export function validateSquareMatrix(matrix: Matrix, name = "A"): void {
  if (matrix.length === 0) {
    throw new Error(`La matriz ${name} no puede estar vacia.`);
  }

  const size = matrix.length;
  const isSquare = matrix.every((row) => row.length === size);
  if (!isSquare) {
    throw new Error(`La matriz ${name} debe ser cuadrada.`);
  }
}

/**
 * Verifica que una matriz y un vector tengan dimensiones compatibles.
 * @param matrix Matriz de coeficientes de tamaño n x n.
 * @param vector Vector asociado de tamaño n.
 * @param matrixName Nombre mostrado para la matriz en errores.
 * @param vectorName Nombre mostrado para el vector en errores.
 * @returns No retorna valor; lanza error si las dimensiones no coinciden.
 */
export function validateMatrixVectorDimensions(
  matrix: Matrix,
  vector: Vector,
  matrixName = "A",
  vectorName = "b"
): void {
  validateSquareMatrix(matrix, matrixName);

  if (matrix.length !== vector.length) {
    throw new Error(
      `Dimensiones incompatibles entre ${matrixName} y ${vectorName}.`
    );
  }
}

/**
 * Verifica que dos matrices puedan multiplicarse.
 * @param left Matriz izquierda de tamaño m x n.
 * @param right Matriz derecha de tamaño n x p.
 * @returns No retorna valor; lanza error si las dimensiones son incompatibles.
 */
export function validateMatrixMultiplicationDimensions(
  left: Matrix,
  right: Matrix
): void {
  if (left.length === 0 || right.length === 0) {
    throw new Error("Las matrices no pueden estar vacias.");
  }

  const leftColumns = left[0]?.length ?? 0;
  const rightColumns = right[0]?.length ?? 0;
  const leftIsRectangular = left.every((row) => row.length === leftColumns);
  const rightIsRectangular = right.every((row) => row.length === rightColumns);

  if (!leftIsRectangular || !rightIsRectangular) {
    throw new Error("Las matrices deben tener filas de longitud consistente.");
  }

  if (leftColumns !== right.length) {
    throw new Error("Dimensiones incompatibles para multiplicacion de matrices.");
  }
}

/**
 * Construye una matriz identidad de tamaño n x n.
 * @param size Dimensión de la matriz identidad.
 * @returns Matriz identidad correspondiente.
 */
export function createIdentityMatrix(size: number): Matrix {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("La dimension de la matriz identidad debe ser positiva.");
  }

  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => (row === column ? 1 : 0))
  );
}

/**
 * Multiplica una matriz por un vector.
 * @param matrix Matriz de tamaño m x n.
 * @param vector Vector de tamaño n.
 * @returns Vector resultado de tamaño m.
 */
export function multiplyMatrixVector(matrix: Matrix, vector: Vector): Vector {
  if (matrix.length === 0) {
    throw new Error("La matriz no puede estar vacia.");
  }

  const columns = matrix[0]?.length ?? 0;
  const isRectangular = matrix.every((row) => row.length === columns);
  if (!isRectangular) {
    throw new Error("La matriz debe tener filas de longitud consistente.");
  }

  if (columns !== vector.length) {
    throw new Error("Dimensiones incompatibles para multiplicacion matriz-vector.");
  }

  return matrix.map((row) =>
    row.reduce((acc, value, index) => acc + value * vector[index], 0)
  );
}

/**
 * Multiplica dos matrices numéricas.
 * @param left Matriz izquierda de tamaño m x n.
 * @param right Matriz derecha de tamaño n x p.
 * @returns Matriz resultado de tamaño m x p.
 */
export function multiplyMatrices(left: Matrix, right: Matrix): Matrix {
  validateMatrixMultiplicationDimensions(left, right);

  const rightTransposed = right[0].map((_, columnIndex) =>
    right.map((row) => row[columnIndex])
  );

  return left.map((row) =>
    rightTransposed.map((column) =>
      row.reduce((acc, value, index) => acc + value * column[index], 0)
    )
  );
}

/**
 * Intercambia dos filas dentro de una matriz mutable.
 * @param matrix Matriz sobre la cual se realiza el intercambio.
 * @param firstRow Índice de la primera fila.
 * @param secondRow Índice de la segunda fila.
 * @returns No retorna valor; modifica la matriz recibida.
 */
export function swapRows(
  matrix: Matrix,
  firstRow: number,
  secondRow: number
): void {
  if (firstRow === secondRow) {
    return;
  }

  [matrix[firstRow], matrix[secondRow]] = [matrix[secondRow], matrix[firstRow]];
}

/**
 * Resuelve un sistema triangular inferior Ly = b por sustitución hacia adelante.
 * @param lowerMatrix Matriz triangular inferior con diagonal no nula.
 * @param vector Vector del lado derecho del sistema.
 * @param significantDigits Cifras significativas opcionales para redondear operaciones.
 * @returns Vector solución y.
 */
export function forwardSubstitution(
  lowerMatrix: Matrix,
  vector: Vector,
  significantDigits?: number
): Vector {
  validateMatrixVectorDimensions(lowerMatrix, vector, "L", "b");

  const size = lowerMatrix.length;
  const solution = new Array<number>(size).fill(0);

  for (let row = 0; row < size; row += 1) {
    const diagonal = lowerMatrix[row][row];
    if (Math.abs(diagonal) <= EPSILON) {
      throw new Error("Pivote cero durante la sustitucion hacia adelante.");
    }

    let sum = 0;
    for (let column = 0; column < row; column += 1) {
      sum = roundValue(
        sum + roundValue(lowerMatrix[row][column] * solution[column], significantDigits),
        significantDigits
      );
    }

    solution[row] = roundValue((vector[row] - sum) / diagonal, significantDigits);
  }

  return solution;
}

/**
 * Resuelve un sistema triangular superior Ux = y por sustitución hacia atrás.
 * @param upperMatrix Matriz triangular superior con diagonal no nula.
 * @param vector Vector del lado derecho del sistema.
 * @param significantDigits Cifras significativas opcionales para redondear operaciones.
 * @returns Vector solución x.
 */
export function backSubstitution(
  upperMatrix: Matrix,
  vector: Vector,
  significantDigits?: number
): Vector {
  validateMatrixVectorDimensions(upperMatrix, vector, "U", "y");

  const size = upperMatrix.length;
  const solution = new Array<number>(size).fill(0);

  for (let row = size - 1; row >= 0; row -= 1) {
    const diagonal = upperMatrix[row][row];
    if (Math.abs(diagonal) <= EPSILON) {
      throw new Error("Pivote cero durante la sustitucion hacia atras.");
    }

    let sum = 0;
    for (let column = row + 1; column < size; column += 1) {
      sum = roundValue(
        sum + roundValue(upperMatrix[row][column] * solution[column], significantDigits),
        significantDigits
      );
    }

    solution[row] = roundValue((vector[row] - sum) / diagonal, significantDigits);
  }

  return solution;
}

/**
 * Calcula el residuo de un sistema lineal como Ax - b.
 * @param matrix Matriz de coeficientes A.
 * @param solution Vector solución x.
 * @param vector Vector del lado derecho b.
 * @returns Vector residuo resultante.
 */
export function calculateResidual(
  matrix: Matrix,
  solution: Vector,
  vector: Vector
): Vector {
  const product = multiplyMatrixVector(matrix, solution);
  if (product.length !== vector.length) {
    throw new Error("Dimensiones incompatibles al calcular el residuo.");
  }

  return product.map((value, index) => value - vector[index]);
}

/**
 * Calcula la norma euclidiana o infinito de un vector.
 * @param vector Vector sobre el cual se calcula la norma.
 * @param type Tipo de norma a usar: euclidiana o infinito.
 * @returns Valor numérico de la norma calculada.
 */
export function vectorNorm(
  vector: Vector,
  type: VectorNormType = "euclidean"
): number {
  if (type === "infinity") {
    return vector.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
  }

  const squaredSum = vector.reduce((acc, value) => acc + value * value, 0);
  return Math.sqrt(squaredSum);
}

/**
 * Verifica si una matriz cumple dominancia diagonal estricta por filas.
 * @param matrix Matriz cuadrada a revisar.
 * @returns true si la matriz es estrictamente dominante; false en caso contrario.
 */
export function isStrictlyDiagonallyDominant(matrix: Matrix): boolean {
  validateSquareMatrix(matrix);

  return matrix.every((row, rowIndex) => {
    const diagonal = Math.abs(row[rowIndex]);
    const others = row.reduce(
      (acc, value, columnIndex) =>
        columnIndex === rowIndex ? acc : acc + Math.abs(value),
      0
    );
    return diagonal > others;
  });
}
