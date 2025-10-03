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
    while ( j < n){
        while (i < n) {
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
        i = j + 1;
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