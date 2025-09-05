import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex3UI from "./Ex3UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex3() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex3UI />}
      {tab === "seudo" && (
        <Seudo code={`ALGORITMO: "Calcular raices reales de X² + 10^8X + 1 
            VAR
            REAL x1, x2, a, b, c
                
            INICIO
                a = 3
                b = 2
                c = -1
                x1 = (- b + RaizCuadrada(potencia(b, 2) - 4 * a * c)) / 2
                x2 = (- b - RaizCuadrada(potencia(b, 2) - 4 * a * c)) / 2
                ESCRIBIR “Las raíces de X² + 10^8X + 1 son ”, x1, “ y ”, x2 
            FIN `} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={``} />
      )}
    </div>
  );
}

export default Ex3;