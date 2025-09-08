import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex7UI from "./Ex7UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex7() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex7UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo “Calcular sumatoria con i variando de 1 a n de 1 sobre i al cuadrado”
	
VAR
ENTERO n
REAL serieA, serieB
	
INICIO
    serieA = 0
    serieB = 0
    ESCRIBIR “Ingrese el valor de n”
    LEER n
    PARA i DESDE 1 hasta n HACER
	    serieA = serieA + 1/ (i*i)
    FIN PARA
    PARA i DESDE n hasta 1 HACER
	    serieB = serieB + 1/ (i*i)
    FIN PARA
    ESCRIBIR “El resultado de calcular la serie de 1 hasta n fue “, serieA
    ESCRIBIR “El resultado de calcular la serie en sentido inverso fue “, serieB
FIN`} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={`   function calculateSerieA(n: number): number {
        let serieA = 0;

        for (let i = 1; i <= n; i++) {
            serieA += 1 / (i*i);
        }

        return serieA; 
    }

    function calculateSerieB(n: number): number {
        let serieB = 0;

        for (let i = n; i >= 1; i++) {
            serieB += 1 / (i*i);
        }

        return serieB; 
    }
`} />
      )}
    </div>
  );
}

export default Ex7;