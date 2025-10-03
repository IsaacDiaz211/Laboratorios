import { useState } from "react";
import SubTab from "../../components/SubTab";
import GaussUI from "./GaussUI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo";

function Gauss() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <GaussUI />}
      {tab === "seudo" && (
        <Seudo code={`
          Algoritmo Eliminación de Gauss
            Entrada: matrix (matriz de coeficientes), b (vector de términos independientes)
            Salida: x (vector solución) o null (si no hay solución única)

            n ← longitud de matrix
            i ← 1
            j ← 0

            // Verificaciones iniciales
            Si n ≠ longitud de b entonces
                Retornar null
            Fin Si
            
            Si n = 0 entonces
                Retornar []
            Fin Si
            
            Si no todas las filas de matrix tienen longitud n entonces
                Lanzar Error("La matriz A debe ser cuadrada n x n")
            Fin Si
            
            Si matrix[0][0] = 0 entonces
                Retornar null
            Fin Si
            
            // Eliminación hacia adelante
            A ← crear matriz ampliada (añadir vector b como columna adicional a matrix)
            Mientras j < n hacer
                Mientras i < n hacer
                    Si A[j][j] = 0 entonces
                        Retornar null
                    Fin Si
                    
                    factor ← A[i][j] / A[j][j]
                    vector ← multiplicar cada elemento de A[j] por factor
                    
                    Para cada elemento k en A[i] hacer
                        A[i][k] ← A[i][k] - vector[k]
                    Fin Para
                    
                    Si A[i][j] ≠ 0 entonces
                        Retornar null
                    Fin Si
                    
                    i ← i + 1
                Fin Mientras
                
                j ← j + 1
                i ← j + 1
            Fin Mientras

            // Sustitución hacia atrás
            x ← crear vector de tamaño n con valores iniciales 0
            
            Para k desde n-1 hasta 0 con paso -1 hacer
                sum ← 0
                Para l desde k+1 hasta n-1 hacer
                    sum ← sum + A[k][l] * x[l]
                Fin Para
                x[k] ← (A[k][n] - sum) / A[k][k]
            Fin Para
            
            Retornar x
          Fin Algoritmo 
          `} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={`function algo_gauss_elimination(matrix: number[][], b: number[]): number[] | null {
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
        }`} />
      )}
    </div>
  );
}

export default Gauss;
