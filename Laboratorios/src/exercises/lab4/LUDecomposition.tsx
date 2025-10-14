import { useState } from "react";
import SubTab from "../../components/SubTab";
import LUDecompositionUI from "./LUDecompUI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo";

function LUDecomposition() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <LUDecompositionUI />}
      {tab === "seudo" && (
        <Seudo code={``} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={`function LU_decomposition(matrix: number[][], b: number[]): number[] | null {
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
}`} />
      )}
      
    </div>
  );
};

export default LUDecomposition;
