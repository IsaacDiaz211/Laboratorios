import {
  cloneMatrix,
  createIdentityMatrix,
  multiplyMatrices,
  multiplyMatrixVector,
  swapRows,
  validateMatrixVectorDimensions,
  validateSquareMatrix,
  vectorNorm,
  type Matrix,
  type Vector,
} from "../../core/matrix";

const EPSILON = 1e-12;
const EIGENVALUE_TOLERANCE = 1e-8;

export type Eigenpair = {
  eigenvalue: number;
  multiplicity: number;
  eigenvector: Vector;
};

export type CharacteristicPolynomialResult = {
  coefficients: number[];
  eigenvalues?: number[];
  eigenpairs?: Eigenpair[];
};

export type PowerMethodOptions = {
  initialVector: Vector;
  tolerance?: number;
  maxIterations: number;
};

export type PowerMethodIteration = {
  iteration: number;
  eigenvalue: number;
  eigenvector: Vector;
  eigenvalueError: number | null;
  vectorError: number;
};

export type PowerMethodResult = {
  dominantEigenvalue: number;
  eigenvector: Vector;
  history: PowerMethodIteration[];
  iterations: number;
  converged: boolean;
};

function cleanSmallValue(value: number): number {
  return Math.abs(value) <= EPSILON ? 0 : value;
}

function traceMatrix(matrix: Matrix): number {
  return matrix.reduce((acc, row, index) => acc + row[index], 0);
}

function addScalarIdentity(matrix: Matrix, scalar: number): Matrix {
  return matrix.map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      rowIndex === columnIndex ? value + scalar : value
    )
  );
}

function sortRoots(roots: number[]): number[] {
  return [...roots].sort((left, right) => left - right);
}

function groupEigenvalues(roots: number[]): Array<{ value: number; multiplicity: number }> {
  const groups: Array<{ value: number; multiplicity: number }> = [];

  for (const root of sortRoots(roots)) {
    const currentGroup = groups[groups.length - 1];
    if (currentGroup && Math.abs(currentGroup.value - root) <= EIGENVALUE_TOLERANCE) {
      const updatedMultiplicity = currentGroup.multiplicity + 1;
      currentGroup.value =
        (currentGroup.value * currentGroup.multiplicity + root) / updatedMultiplicity;
      currentGroup.multiplicity = updatedMultiplicity;
      continue;
    }

    groups.push({ value: root, multiplicity: 1 });
  }

  return groups.map((group) => ({
    value: cleanSmallValue(group.value),
    multiplicity: group.multiplicity,
  }));
}

function solveCubicRealRoots(a: number, b: number, c: number): number[] {
  const p = b - (a * a) / 3;
  const q = (2 * a * a * a) / 27 - (a * b) / 3 + c;
  const discriminant = (q * q) / 4 + (p * p * p) / 27;
  const offset = -a / 3;

  if (discriminant > EPSILON) {
    throw new Error(
      "El polinomio caracteristico tiene autovalores complejos no soportados."
    );
  }

  if (Math.abs(discriminant) <= EPSILON) {
    if (Math.abs(p) <= EPSILON && Math.abs(q) <= EPSILON) {
      return [offset, offset, offset].map(cleanSmallValue);
    }

    const u = Math.cbrt(-q / 2);
    return sortRoots([
      cleanSmallValue(2 * u + offset),
      cleanSmallValue(-u + offset),
      cleanSmallValue(-u + offset),
    ]);
  }

  const radius = 2 * Math.sqrt(-p / 3);
  const angle = Math.acos((-q / 2) / Math.sqrt(-(p * p * p) / 27));

  return sortRoots(
    [0, 1, 2].map((k) =>
      cleanSmallValue(radius * Math.cos((angle + 2 * Math.PI * k) / 3) + offset)
    )
  );
}

function normalizeVector(vector: Vector): Vector {
  const norm = vectorNorm(vector);
  if (norm <= EPSILON) {
    throw new Error("No se puede normalizar un vector nulo.");
  }

  const normalized = vector.map((value) => cleanSmallValue(value / norm));
  const firstNonZero = normalized.find((value) => Math.abs(value) > EPSILON);
  if (firstNonZero !== undefined && firstNonZero < 0) {
    return normalized.map((value) => -value);
  }
  return normalized;
}

function dotProduct(left: Vector, right: Vector): number {
  if (left.length !== right.length) {
    throw new Error("Dimensiones incompatibles para producto punto.");
  }

  return left.reduce((acc, value, index) => acc + value * right[index], 0);
}

function buildShiftedMatrix(matrix: Matrix, eigenvalue: number): Matrix {
  return cloneMatrix(matrix).map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      cleanSmallValue(rowIndex === columnIndex ? value - eigenvalue : value)
    )
  );
}

function findEigenvector(matrix: Matrix, eigenvalue: number): Vector {
  const shiftedMatrix = buildShiftedMatrix(matrix, eigenvalue);
  const size = shiftedMatrix.length;
  const pivotColumns: number[] = [];
  let pivotRow = 0;

  for (let column = 0; column < size && pivotRow < size; column += 1) {
    let bestRow = pivotRow;
    for (let row = pivotRow + 1; row < size; row += 1) {
      if (Math.abs(shiftedMatrix[row][column]) > Math.abs(shiftedMatrix[bestRow][column])) {
        bestRow = row;
      }
    }

    if (Math.abs(shiftedMatrix[bestRow][column]) <= EPSILON) {
      continue;
    }

    swapRows(shiftedMatrix, pivotRow, bestRow);

    for (let row = pivotRow + 1; row < size; row += 1) {
      const factor = shiftedMatrix[row][column] / shiftedMatrix[pivotRow][column];
      if (Math.abs(factor) <= EPSILON) {
        continue;
      }

      for (let innerColumn = column; innerColumn < size; innerColumn += 1) {
        shiftedMatrix[row][innerColumn] -= factor * shiftedMatrix[pivotRow][innerColumn];
        shiftedMatrix[row][innerColumn] = cleanSmallValue(
          shiftedMatrix[row][innerColumn]
        );
      }
    }

    pivotColumns.push(column);
    pivotRow += 1;
  }

  const freeColumns = Array.from({ length: size }, (_, index) => index).filter(
    (column) => !pivotColumns.includes(column)
  );

  if (freeColumns.length === 0) {
    throw new Error(
      `No se pudo obtener un autovector para el autovalor ${eigenvalue}.`
    );
  }

  const eigenvector = new Array<number>(size).fill(0);
  const freeColumn = freeColumns[freeColumns.length - 1];
  eigenvector[freeColumn] = 1;

  for (let row = pivotColumns.length - 1; row >= 0; row -= 1) {
    const pivotColumn = pivotColumns[row];
    const pivotValue = shiftedMatrix[row][pivotColumn];
    if (Math.abs(pivotValue) <= EPSILON) {
      continue;
    }

    let sum = 0;
    for (let column = pivotColumn + 1; column < size; column += 1) {
      sum += shiftedMatrix[row][column] * eigenvector[column];
    }

    eigenvector[pivotColumn] = -sum / pivotValue;
  }

  return normalizeVector(eigenvector);
}

/**
 * Calcula el polinomio caracteristico mediante Fadeev-Leverrier.
 * @param matrix Matriz cuadrada A de la cual se quiere el polinomio caracteristico.
 * @returns Coeficientes del polinomio y, para matrices 3x3, autovalores y autovectores.
 */
export function faddeevLeverrier(matrix: Matrix): CharacteristicPolynomialResult {
  validateSquareMatrix(matrix, "A");

  const size = matrix.length;
  let previousMatrix = createIdentityMatrix(size);
  const coefficients = [1];

  for (let step = 1; step <= size; step += 1) {
    const product = multiplyMatrices(matrix, previousMatrix);
    const coefficient = cleanSmallValue(-traceMatrix(product) / step);
    coefficients.push(coefficient);
    previousMatrix = addScalarIdentity(product, coefficient);
  }

  if (size !== 3) {
    return { coefficients };
  }

  const eigenvalues = solveCubicRealRoots(
    coefficients[1],
    coefficients[2],
    coefficients[3]
  );
  const groupedEigenvalues = groupEigenvalues(eigenvalues);
  const eigenpairs = groupedEigenvalues.map((group) => ({
    eigenvalue: group.value,
    multiplicity: group.multiplicity,
    eigenvector: findEigenvector(matrix, group.value),
  }));

  return {
    coefficients,
    eigenvalues,
    eigenpairs,
  };
}

/**
 * Aproxima el autovalor dominante y su autovector con el metodo de las potencias.
 * @param matrix Matriz cuadrada A del problema de autovalores.
 * @param options Vector inicial, tolerancia opcional y maximo de iteraciones.
 * @returns Autovalor dominante aproximado, autovector normalizado e historial iterativo.
 */
export function powerMethod(
  matrix: Matrix,
  options: PowerMethodOptions
): PowerMethodResult {
  validateSquareMatrix(matrix, "A");
  validateMatrixVectorDimensions(matrix, options.initialVector, "A", "x0");

  if (vectorNorm(options.initialVector, "infinity") <= EPSILON) {
    throw new Error("El vector inicial del metodo de potencias no puede ser nulo.");
  }

  if (options.tolerance !== undefined && options.tolerance <= 0) {
    throw new Error("La tolerancia debe ser mayor que 0.");
  }

  if (!Number.isInteger(options.maxIterations) || options.maxIterations <= 0) {
    throw new Error("El maximo de iteraciones debe ser un entero positivo.");
  }

  let currentVector = normalizeVector(options.initialVector);
  let previousEigenvalue: number | null = null;
  const history: PowerMethodIteration[] = [];

  for (let iteration = 1; iteration <= options.maxIterations; iteration += 1) {
    const multipliedVector = multiplyMatrixVector(matrix, currentVector);
    if (vectorNorm(multipliedVector, "infinity") <= EPSILON) {
      throw new Error(
        "El metodo de potencias produjo un vector nulo; no se puede continuar."
      );
    }

    const nextVector = normalizeVector(multipliedVector);
    const numerator = dotProduct(currentVector, multipliedVector);
    const denominator = dotProduct(currentVector, currentVector);
    const eigenvalue = numerator / denominator;
    const vectorDifference = nextVector.map(
      (value, index) => value - currentVector[index]
    );
    const vectorError = vectorNorm(vectorDifference, "infinity");
    const eigenvalueError =
      previousEigenvalue === null ? null : Math.abs(eigenvalue - previousEigenvalue);

    history.push({
      iteration,
      eigenvalue,
      eigenvector: [...nextVector],
      eigenvalueError,
      vectorError,
    });

    currentVector = nextVector;
    previousEigenvalue = eigenvalue;

    if (
      options.tolerance !== undefined &&
      eigenvalueError !== null &&
      eigenvalueError <= options.tolerance &&
      vectorError <= options.tolerance
    ) {
      return {
        dominantEigenvalue: eigenvalue,
        eigenvector: currentVector,
        history,
        iterations: iteration,
        converged: true,
      };
    }
  }

  return {
    dominantEigenvalue: previousEigenvalue ?? 0,
    eigenvector: currentVector,
    history,
    iterations: options.maxIterations,
    converged: false,
  };
}
