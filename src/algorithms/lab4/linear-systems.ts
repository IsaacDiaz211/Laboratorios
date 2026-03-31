import {
  backSubstitution,
  calculateResidual,
  cloneMatrix,
  createIdentityMatrix,
  forwardSubstitution,
  isStrictlyDiagonallyDominant,
  swapRows,
  validateMatrixVectorDimensions,
  vectorNorm,
  type Matrix,
  type Vector,
} from "../../core/matrix";
import { applySignificantDigits } from "../../core/precision";

const EPSILON = 1e-12;

export type LinearSolveResult = {
  solution: Vector;
  residual: Vector;
};

export type GaussOptions = {
  significantDigits?: number;
};

export type LUFactorizationResult = {
  L: Matrix;
  U: Matrix;
  P: Matrix;
};

export type LUSolveResult = LUFactorizationResult & LinearSolveResult;

export type GaussSeidelOptions = {
  initialGuess: Vector;
  tolerance: number;
  maxIterations: number;
};

export type GaussSeidelIteration = {
  iteration: number;
  approximation: Vector;
  error: number;
  residual: Vector;
  residualNorm: number;
};

export type GaussSeidelResult = {
  solution: Vector;
  history: GaussSeidelIteration[];
  iterations: number;
  residual: Vector;
  converged: true;
};

function roundValue(value: number, significantDigits?: number): number {
  return applySignificantDigits(value, significantDigits);
}

function roundInputMatrix(matrix: Matrix, significantDigits?: number): Matrix {
  return cloneMatrix(matrix).map((row) =>
    row.map((value) => roundValue(value, significantDigits))
  );
}

function roundInputVector(vector: Vector, significantDigits?: number): Vector {
  return vector.map((value) => roundValue(value, significantDigits));
}

function cleanSmallValue(value: number): number {
  return Math.abs(value) <= EPSILON ? 0 : value;
}

function swapVectorEntries(vector: Vector, firstIndex: number, secondIndex: number): void {
  [vector[firstIndex], vector[secondIndex]] = [vector[secondIndex], vector[firstIndex]];
}

function getPivotRow(matrix: Matrix, column: number): number {
  let pivotRow = column;
  for (let row = column + 1; row < matrix.length; row += 1) {
    if (Math.abs(matrix[row][column]) > Math.abs(matrix[pivotRow][column])) {
      pivotRow = row;
    }
  }
  return pivotRow;
}

/**
 * Resuelve un sistema Ax = b mediante eliminacion de Gauss con pivoteo parcial.
 * @param matrix Matriz cuadrada de coeficientes A.
 * @param vector Vector de terminos independientes b.
 * @param options Opciones de redondeo por cifras significativas.
 * @returns Solucion del sistema y su residuo Ax - b.
 */
export function solveGauss(
  matrix: Matrix,
  vector: Vector,
  options: GaussOptions = {}
): LinearSolveResult {
  validateMatrixVectorDimensions(matrix, vector, "A", "b");

  const workingMatrix = roundInputMatrix(matrix, options.significantDigits);
  const workingVector = roundInputVector(vector, options.significantDigits);
  const size = workingMatrix.length;

  for (let pivotColumn = 0; pivotColumn < size; pivotColumn += 1) {
    const pivotRow = getPivotRow(workingMatrix, pivotColumn);
    const pivotValue = workingMatrix[pivotRow][pivotColumn];

    if (Math.abs(pivotValue) <= EPSILON) {
      throw new Error(
        `Matriz singular: pivote cero detectado en la columna ${pivotColumn + 1}.`
      );
    }

    swapRows(workingMatrix, pivotColumn, pivotRow);
    swapVectorEntries(workingVector, pivotColumn, pivotRow);

    for (let row = pivotColumn + 1; row < size; row += 1) {
      const factor = roundValue(
        workingMatrix[row][pivotColumn] / workingMatrix[pivotColumn][pivotColumn],
        options.significantDigits
      );

      workingMatrix[row][pivotColumn] = 0;
      for (let column = pivotColumn + 1; column < size; column += 1) {
        const scaledValue = roundValue(
          factor * workingMatrix[pivotColumn][column],
          options.significantDigits
        );
        workingMatrix[row][column] = cleanSmallValue(
          roundValue(
            workingMatrix[row][column] - scaledValue,
            options.significantDigits
          )
        );
      }

      const scaledRightSide = roundValue(
        factor * workingVector[pivotColumn],
        options.significantDigits
      );
      workingVector[row] = roundValue(
        workingVector[row] - scaledRightSide,
        options.significantDigits
      );
    }
  }

  const solution = backSubstitution(
    workingMatrix,
    workingVector,
    options.significantDigits
  );

  return {
    solution,
    residual: calculateResidual(matrix, solution, vector),
  };
}

/**
 * Resuelve un sistema Ax = b mediante Gauss-Jordan sobre la matriz aumentada.
 * @param matrix Matriz cuadrada de coeficientes A.
 * @param vector Vector de terminos independientes b.
 * @returns Solucion exacta del sistema y su residuo Ax - b.
 */
export function solveGaussJordan(matrix: Matrix, vector: Vector): LinearSolveResult {
  validateMatrixVectorDimensions(matrix, vector, "A", "b");

  const size = matrix.length;
  const augmentedMatrix = matrix.map((row, rowIndex) => [...row, vector[rowIndex]]);

  for (let pivotColumn = 0; pivotColumn < size; pivotColumn += 1) {
    const pivotRow = getPivotRow(augmentedMatrix, pivotColumn);
    const pivotValue = augmentedMatrix[pivotRow][pivotColumn];

    if (Math.abs(pivotValue) <= EPSILON) {
      throw new Error(
        `Matriz singular: pivote cero detectado en la columna ${pivotColumn + 1}.`
      );
    }

    swapRows(augmentedMatrix, pivotColumn, pivotRow);

    const normalizedPivot = augmentedMatrix[pivotColumn][pivotColumn];
    for (let column = 0; column <= size; column += 1) {
      augmentedMatrix[pivotColumn][column] /= normalizedPivot;
      augmentedMatrix[pivotColumn][column] = cleanSmallValue(
        augmentedMatrix[pivotColumn][column]
      );
    }

    for (let row = 0; row < size; row += 1) {
      if (row === pivotColumn) {
        continue;
      }

      const factor = augmentedMatrix[row][pivotColumn];
      for (let column = 0; column <= size; column += 1) {
        augmentedMatrix[row][column] -= factor * augmentedMatrix[pivotColumn][column];
        augmentedMatrix[row][column] = cleanSmallValue(augmentedMatrix[row][column]);
      }
    }
  }

  const solution = augmentedMatrix.map((row) => row[size]);
  return {
    solution,
    residual: calculateResidual(matrix, solution, vector),
  };
}

/**
 * Factoriza una matriz cuadrada como PA = LU usando pivoteo parcial.
 * @param matrix Matriz cuadrada A a factorizar.
 * @returns Matrices L, U y P de la factorizacion LU con permutacion.
 */
export function factorizeLU(matrix: Matrix): LUFactorizationResult {
  const workingMatrix = cloneMatrix(matrix);
  validateMatrixVectorDimensions(workingMatrix, new Array(workingMatrix.length).fill(0), "A", "b");

  const size = workingMatrix.length;
  const lowerMatrix: Matrix = createIdentityMatrix(size);
  const upperMatrix = cloneMatrix(workingMatrix);
  const permutationMatrix = createIdentityMatrix(size);

  for (let pivotColumn = 0; pivotColumn < size; pivotColumn += 1) {
    const pivotRow = getPivotRow(upperMatrix, pivotColumn);
    const pivotValue = upperMatrix[pivotRow][pivotColumn];

    if (Math.abs(pivotValue) <= EPSILON) {
      throw new Error(
        `Matriz singular: pivote cero detectado en la columna ${pivotColumn + 1}.`
      );
    }

    if (pivotRow !== pivotColumn) {
      swapRows(upperMatrix, pivotColumn, pivotRow);
      swapRows(permutationMatrix, pivotColumn, pivotRow);
      for (let column = 0; column < pivotColumn; column += 1) {
        const temp = lowerMatrix[pivotColumn][column];
        lowerMatrix[pivotColumn][column] = lowerMatrix[pivotRow][column];
        lowerMatrix[pivotRow][column] = temp;
      }
    }

    for (let row = pivotColumn + 1; row < size; row += 1) {
      const factor = upperMatrix[row][pivotColumn] / upperMatrix[pivotColumn][pivotColumn];
      lowerMatrix[row][pivotColumn] = factor;
      upperMatrix[row][pivotColumn] = 0;

      for (let column = pivotColumn + 1; column < size; column += 1) {
        upperMatrix[row][column] -= factor * upperMatrix[pivotColumn][column];
        upperMatrix[row][column] = cleanSmallValue(upperMatrix[row][column]);
      }
    }
  }

  return {
    L: lowerMatrix,
    U: upperMatrix,
    P: permutationMatrix,
  };
}

/**
 * Resuelve un sistema Ax = b reutilizando una factorizacion LU ya calculada.
 * @param factorization Resultado previo de factorizeLU con matrices L, U y P.
 * @param vector Vector de terminos independientes b.
 * @returns Solucion del sistema y residuo del sistema equivalente LUx = Pb.
 */
export function solveLUWithFactorization(
  factorization: LUFactorizationResult,
  vector: Vector
): LinearSolveResult {
  const size = factorization.L.length;
  if (vector.length !== size) {
    throw new Error("Dimensiones incompatibles entre la factorizacion LU y b.");
  }

  const permutedVector = factorization.P.map((row) =>
    row.reduce((acc, value, index) => acc + value * vector[index], 0)
  );
  const intermediateVector = forwardSubstitution(factorization.L, permutedVector);
  const solution = backSubstitution(factorization.U, intermediateVector);
  const combinedMatrix = factorization.L.map((_, rowIndex) =>
    factorization.U[0].map((__, columnIndex) =>
      factorization.U.reduce(
        (acc, currentRow, innerIndex) =>
          acc + factorization.L[rowIndex][innerIndex] * currentRow[columnIndex],
        0
      )
    )
  );

  return {
    solution,
    residual: calculateResidual(combinedMatrix, solution, permutedVector),
  };
}

/**
 * Resuelve un sistema Ax = b mediante factorizacion LU con pivoteo parcial.
 * @param matrix Matriz cuadrada de coeficientes A.
 * @param vector Vector de terminos independientes b.
 * @returns Matrices L, U, P, solucion del sistema y residuo Ax - b.
 */
export function solveLU(matrix: Matrix, vector: Vector): LUSolveResult {
  validateMatrixVectorDimensions(matrix, vector, "A", "b");

  const factorization = factorizeLU(matrix);
  const permutedVector = factorization.P.map((row) =>
    row.reduce((acc, value, index) => acc + value * vector[index], 0)
  );
  const intermediateVector = forwardSubstitution(factorization.L, permutedVector);
  const solution = backSubstitution(factorization.U, intermediateVector);

  return {
    ...factorization,
    solution,
    residual: calculateResidual(matrix, solution, vector),
  };
}

/**
 * Aproxima la solucion de Ax = b mediante Gauss-Seidel.
 * @param matrix Matriz cuadrada de coeficientes A.
 * @param vector Vector de terminos independientes b.
 * @param options Vector inicial, tolerancia y maximo de iteraciones.
 * @returns Solucion aproximada, historial, numero de iteraciones y residuo final.
 */
export function solveGaussSeidel(
  matrix: Matrix,
  vector: Vector,
  options: GaussSeidelOptions
): GaussSeidelResult {
  validateMatrixVectorDimensions(matrix, vector, "A", "b");

  if (options.initialGuess.length !== vector.length) {
    throw new Error("Dimensiones incompatibles entre A y el vector inicial x0.");
  }

  if (options.tolerance <= 0) {
    throw new Error("La tolerancia debe ser mayor que 0.");
  }

  if (!Number.isInteger(options.maxIterations) || options.maxIterations <= 0) {
    throw new Error("El maximo de iteraciones debe ser un entero positivo.");
  }

  if (!isStrictlyDiagonallyDominant(matrix)) {
    throw new Error(
      "Gauss-Seidel requiere dominancia diagonal estricta para garantizar convergencia."
    );
  }

  const size = matrix.length;
  const currentApproximation = [...options.initialGuess];
  const history: GaussSeidelIteration[] = [];

  for (let iteration = 1; iteration <= options.maxIterations; iteration += 1) {
    const previousApproximation = [...currentApproximation];

    for (let row = 0; row < size; row += 1) {
      const diagonal = matrix[row][row];
      if (Math.abs(diagonal) <= EPSILON) {
        throw new Error(`Pivote cero en la diagonal de la fila ${row + 1}.`);
      }

      let sum = 0;
      for (let column = 0; column < size; column += 1) {
        if (column === row) {
          continue;
        }

        const value = column < row ? currentApproximation[column] : previousApproximation[column];
        sum += matrix[row][column] * value;
      }

      currentApproximation[row] = (vector[row] - sum) / diagonal;
    }

    const difference = currentApproximation.map(
      (value, index) => value - previousApproximation[index]
    );
    const residual = calculateResidual(matrix, currentApproximation, vector);
    const error = vectorNorm(difference, "infinity");
    const residualNorm = vectorNorm(residual, "infinity");

    history.push({
      iteration,
      approximation: [...currentApproximation],
      error,
      residual,
      residualNorm,
    });

    if (error <= options.tolerance) {
      return {
        solution: [...currentApproximation],
        history,
        iterations: iteration,
        residual,
        converged: true,
      };
    }
  }

  throw new Error(
    `Gauss-Seidel no convergio en ${options.maxIterations} iteraciones.`
  );
}
