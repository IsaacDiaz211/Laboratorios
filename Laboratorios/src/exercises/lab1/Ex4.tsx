import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex4UI from "./Ex4UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex4() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex4UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo “Hallar las raices reales de 3X² + 2X - 1”
	
VAR
REAL x1, x2, a, b, c
                
INICIO
    a = 3
    b = 2
    c = -1
    x1 = (- b + RaizCuadrada(potencia(b, 2) - 4 * a * c)) / 2
    x2 = (- b - RaizCuadrada(potencia(b, 2) - 4 * a * c)) / 2
    ESCRIBIR “Las raíces de 3X² + 2X - 1 son ”, x1, “ y ”, x2 
FIN `} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`  function findRoots(a: number, b: number, c: number): string {

            const discriminant = Math.pow(b, 2) - 4 * a * c;

            if (discriminant < 0) {
                return "La ecuación no tiene raíces reales";
            }

            const x1: number = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2: number = (-b - Math.sqrt(discriminant)) / (2 * a);

            return "Las raíces de 3x² + 2x - 1 son $x1 y $x2";
        }`} />
      )}
    </div>
  );
}

export default Ex4;
