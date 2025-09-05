import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex1UI from "./Ex1UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex1() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex1UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo: Conocer cantidad de digitos correctos de pi/e
            VAR
                REAL pi_redondeado, e_redondeado, cociente_calculado, cociente
            INICIO
                pi_redondeado = 3.141593
                e_redondeado = 2.718282
                cociente = 1.15572735
                cociente_calculado = pi_redondeado / e_redondeado
                ESCRIBIR "El cociente verdadero es igual a: ", cociente
                ESCRIBIR "Por otra parte el cociente calculado es igual a: ", cociente_calculado
                ESCRIBIR "Finalmente podemos concluir que hemos hayado ", " digitos significativos y ", " decimales correctos."
            FIN`} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={`function executeOperation(){
        setResult(pi_redondeado/ e_redondeado);
    }`} />
      )}
    </div>
  );
}

export default Ex1;