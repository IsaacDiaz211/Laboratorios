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
        <Seudo code={`Algoritmo “Calcular e en base a los n primeros términos”
	
VAR
ENTERO n
REAL numero_e
	
INICIO
    numero_e = 0
    ESCRIBIR “Ingrese la cantidad de términos que desea usar para calcular e”
    LEER n
    PARA i DESDE 0 hasta n-1 HACER
	    numero_e = numero_e + 1/ factorial(i)
    FIN PARA
    ESCRIBIR “El valor de e calculado es: “, numero_e
FIN`} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`function calculateE(n: number): number {
    let number_e = 0;

    for (let i = 0; i < n; i++) {
        number_e += 1 / factorial(i);
    }

    return number_e; 
}`} />
      )}
    </div>
  );
}

export default Ex5;