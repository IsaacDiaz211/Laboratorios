/**
 * Resuelve un sistema de ecuaciones lineales Ax = b usando eliminación de Gauss.
 * @param matrix Matriz cuadrada de coeficientes (n x n)
 * @param vector Vector de términos independientes (n)
 * @returns Vector solución x o null si el sistema no tiene solución única
 */
function algo_gauss_elimination(matrix: number[][], b: number[]): number[] | null {
    const n = matrix.length;
    let i: number = 1;
    let j: number = 0;

    //Verificaciones
    if(n !== b.length) {
        return null;
    }
    if (n === 0) return [];
    if (!matrix.every((row) => row.length === n)) {
        throw new Error("La matriz A debe ser cuadrada n x n");
    }
    if(matrix[0][0] === 0) {
        return null;
    }
    
    // Eliminación hacia adelante
    const A = matrix.map((row, i) => [...row, b[i]]); // Matriz ampliada
    for (let j = 0; j < n; j++){
        for (let i = j + 1; i < n; i++) {
            if(A[j][j] === 0) {
                return null;
            }
            let factor: number = A[i][j] / A[j][j];
            let vector: number[] = A[j].map(val => factor * val);
            A[i] = A[i].map((val, k) => val - vector[k]);
            if(A[i][j] !== 0) {
                return null;
            }
            i++;
        }
        j++;
    }

    // Sustitución hacia atrás
    let x = new Array(n).fill(0)
    for (let k = n-1; k >= 0; k--) {
        let sum: number = 0;
        for (let l = k+1; l < n; l++) {
            sum += A[k][l] * x[l];
        }
        x[k] = (A[k][n] - sum) / A[k][k];
    }
    
    return x;
}

export { algo_gauss_elimination };

function algo_LU_decomposition(matrix: number[][], b: number[]): number[] | null {
    const n = matrix.length;

    //Verificaciones
    if(n !== b.length) {
        return null;
    }
    if (n === 0) return [];
    if (!matrix.every((row) => row.length === n)) {
        throw new Error("La matriz A debe ser cuadrada n x n");
    }
    if(matrix[0][0] === 0) {
        return null;
    }

    // Obtener la matriz U y L
    let U = matrix.map(r => r.slice());
    let L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let k = 0; k < n; k++) {
        L[k][k] = 1;
    }
    for (let j = 0; j < n; j++){
        for (let i = j + 1; i < n; i++) {
            if(U[j][j] === 0) {
                return null;
            }
            let factor: number = U[i][j] / U[j][j];
            let vector: number[] = U[j].map(val => factor * val);
            U[i] = U[i].map((val, k) => val - vector[k]);
            L[i][j] = factor;
            if(U[i][j] !== 0) {     
                return null;
            }
            i++;
        }
        j++;
    }

    //Obtenemos y según L.y = b
    let y: number[] = new Array(n).fill(0);
    y[0] = b[0];
    for(let k = 1; k < n; k++){
        let sum: number = 0;
        for (let l = 0; l < k; l++) {
            sum += L[k][l] * y[l];
        }
        y[k] = (b[k] - sum);
    }

    //Obtenemos x según U.x = y
    let x: number[] = new Array(n).fill(0);
    for(let k = n-1; k >= 0; k--){
        let sum: number = 0;
        for (let l = k + 1; l <n; l++) {
            sum += U[k][l] * x[l];
        }
        x[k] = (y[k] - sum) / U[k][k];
    }

    return x;
}

export {algo_LU_decomposition}