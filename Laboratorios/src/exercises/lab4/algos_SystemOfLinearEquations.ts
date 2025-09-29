function algo_Gauss_Elimination(A: number[][], b: number[]): number[] | undefined {
    const n: number = A.length;
    for (let i = 0; i < n; i++) {
        // Pivoteo parcial
        let maxRow: number = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                maxRow = k;
            }
        }
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];

        // Eliminación
        for (let k = i + 1; k < n; k++) {            const factor: number = A[k][i] / A[i][i];
            for (let j = i; j < n; j++) {
                A[k][j] -= factor * A[i][j];
            }
            b[k] -= factor * b[i];
        } 
        // Sustitución regresiva
        const x: number[] = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            x[i] = b[i];
            for (let j = i + 1; j < n; j++) {
                x[i] -= A[i][j] * x[j];
            }
            x[i] /= A[i][i];
        }
        return x;
    }
}
export { algo_Gauss_Elimination };