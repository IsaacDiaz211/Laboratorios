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
        <CodeBlock code={`function calculateRoots(a: number, b: number, c: number): string {

        const discriminant = Math.pow(b, 2) - 4 * a * c;
        let x1, x2;

        if (discriminant < 0) {
            return "La ecuación no tiene raíces reales";
        }
        
        if(b*b >= 4*a*c){
            x1 = ((-2 * c) / (-b) + Math.sqrt(discriminant));
            x2 = ((-2 * c) / (-b) - Math.sqrt(discriminant));
        } else{
            x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        }
        

        return Las raíces de la ecuación son x1 y x2;
    }`} />
      )}
    </div>
  );
}

export default Ex3;