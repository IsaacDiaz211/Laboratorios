/**
 * Resuelve un sistema de ecuaciones lineales Ax = b usando eliminación de Gauss.
 * @param matrix Matriz cuadrada de coeficientes (n x n)
 * @param vector Vector de términos independientes (n)
 * @returns Vector solución x o null si el sistema no tiene solución única
 */
function algo_gauss_elimination(matrix: number[][], b: number[]): number[] | null {
    const n = matrix.length;
    const eps = 1e-12;

    //Verificaciones
    if(n !== b.length) return null;
    if (n === 0) return [];
    if (!matrix.every((row) => row.length === n)) {
        throw new Error("La matriz A debe ser cuadrada n x n");
    }
    // Matriz ampliada
    const A = matrix.map((row, i) => [...row, b[i]]); 
    // Eliminación hacia adelante
    for (let j = 0; j < n; j++){

        // Buscar pivote en columna j
        let p = j;
        for (let r = j + 1; r < n; r++) {
            if (Math.abs(A[r][j]) > Math.abs(A[p][j])) p = r;
        }
        if (Math.abs(A[p][j]) <= eps || !isFinite(A[p][j])) return null;

        // Intercambiar filas si hace falta
        if (p !== j) {
            const tmp = A[j]; 
            A[j] = A[p];
            A[p] = tmp;
        }
        for (let i = j + 1; i < n; i++) {
            if (!isFinite(A[j][j]) || Math.abs(A[j][j]) <= eps) return null;
            let factor: number = A[i][j] / A[j][j];
            let vector: number[] = A[j].map(val => factor * val);
            A[i] = A[i].map((val, k) => val - vector[k]);
            if (Math.abs(A[i][j]) <= eps) A[i][j] = 0;
        }
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

/**
 * Resuelve un sistema de ecuaciones lineales Ax = b usando Factorización LU.
 * @param matrix Matriz cuadrada de coeficientes (n x n)
 * @param vector Vector de términos independientes (n)
 * @returns Vector solución x o null si el sistema no tiene solución única
 */
function algo_LU_decomposition(matrix: number[][], b: number[]): number[] | null {
    const n = matrix.length;
    const eps = 1e-12;

    //Verificaciones
    if(n !== b.length) return null;
    if (n === 0) return [];
    if (!matrix.every((row) => row.length === n)) {
        throw new Error("La matriz A debe ser cuadrada n x n");
    }

    // Copiamos el vector b para no modificar los originales
    const b_copy = b.slice();
    // Obtener la matriz U y L iniciales
    let U = matrix.map(r => r.slice());
    let L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let k = 0; k < n; k++) {
        L[k][k] = 1;
    }

    for (let j = 0; j < n; j++){
        // Buscar pivote en columna j
        let p = j;
        for (let r = j + 1; r < n; r++) {
            if (Math.abs(U[r][j]) > Math.abs(U[p][j])) p = r;
        }
        if (Math.abs(U[p][j]) <= eps || !isFinite(U[p][j])) return null;

        // Intercambiar filas/columnas si hace falta
        if (p !== j) {
            [U[j], U[p]] = [U[p], U[j]];
            [b_copy[j], b_copy[p]] = [b_copy[p], b_copy[j]];
            //Solo columnas ya construidas
            for (let c = 0; c < j; c++) [L[j][c], L[p][c]] = [L[p][c], L[j][c]];
        }
        for (let i = j + 1; i < n; i++) {
            if (!isFinite(U[j][j]) || Math.abs(U[j][j]) <= eps) return null;
            let factor: number = U[i][j] / U[j][j];
            let vector: number[] = U[j].map(val => factor * val);
            U[i] = U[i].map((val, k) => val - vector[k]);
            L[i][j] = factor;
            if(Math.abs(U[i][j]) <= eps) {     
                U[i][j] = 0;
            }
        }
    }

    //Obtenemos y según L.y = b
    let y: number[] = new Array(n).fill(0);
    for(let k = 0; k < n; k++){
        let sum: number = 0;
        for (let l = 0; l < k; l++) {
            sum += L[k][l] * y[l];
        }
        y[k] = (b_copy[k] - sum);
    }

    //Obtenemos x según U.x = y
    let x: number[] = new Array(n).fill(0);
    for(let k = n-1; k >= 0; k--){
        let sum: number = 0;
        for (let l = k + 1; l <n; l++) {
            sum += U[k][l] * x[l];
        }
        if (!isFinite(U[k][k]) || Math.abs(U[k][k]) <= eps) return null;
        x[k] = (y[k] - sum) / U[k][k];
    }

    return x;
}

export {algo_LU_decomposition}