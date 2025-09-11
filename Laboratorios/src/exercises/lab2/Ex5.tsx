import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex5UI from "./Ex5UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex5() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex5UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo: Calcular el área exacta de un rectángulo con largo y ancho en raíces cuadradas
          Var: 
          Real largo, ancho, áreaExacta
          Booleano esEntero
          Leer largo, ancho
          Proceso:
            1. Calcular el producto de largo y ancho
            2. Calcular la raíz cuadrada del producto
            3. Verificar si la raíz cuadrada es un número entero
            4. Si es entero, asignar el valor a áreaExacta y esEntero a True
            5. Si no es entero, asignar el valor a áreaExacta y esEntero a False
            6. Devolver áreaExacta y esEntero
          Escribir áreaExacta, esEntero
        `} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={`
            function algo_calculateExactArea(width: number, length: number): AreaResult {
                const productUnderRoot = width * length;
                const exactValue = Math.sqrt(productUnderRoot);
                const isInteger = Number.isInteger(exactValue);
                
                return {
                exactValue,
                isInteger
                };
            }
            `} />
      )}
    </div>
  );
}

export default Ex5;