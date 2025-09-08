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
        <Seudo code={`ALGORITMO: "Calcular raices reales de X² + 100000000X + 1 
            VAR
            REAL x1, x2, a, b, c
                
            INICIO
                a = 1
                b = 100000000
                c = 1
                x1 = (-2 * c) / (-b - RaizCuadrada(potencia(b, 2) - 4 * a * c))
                x2 = (- b - RaizCuadrada(potencia(b, 2) - 4 * a * c)) / 2
                ESCRIBIR “Las raíces de X² + 10^8X + 1 son ”, x1, “ y ”, x2 
            FIN `} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={`function calculateRoots(a: number, b: number, c: number): string {
    const discriminant = Math.pow(b, 2) - 4 * a * c;
    let x1, x2;

    if (discriminant < 0) {
        return "La ecuación no tiene raíces reales";
    }
    
    // Usaremos la formula alternativa para evitar la cancelación
    if (b >= 0) { 
        x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        x1 = (-2 * c) / (-b - Math.sqrt(discriminant));
    } else { 
        x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        x1 = (-2 * c) / (-b + Math.sqrt(discriminant));
    }

    return \`Las raíces de la ecuación son \${x1} y \${x2}\`;
}`} />
      )}
    </div>
  );
}

export default Ex3;