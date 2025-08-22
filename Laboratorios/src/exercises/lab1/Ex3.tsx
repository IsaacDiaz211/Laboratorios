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
        <Seudo code={`Algoritmo “n primeros números de la sucesión de fibonacci”
            VAR 
            ENTERO n, término, contador
            
            INICIO
                ESCRIBIR “Ingrese el valor de n”
                LEER n
                PARA contador desde 0 hasta n-1 HACER
                    ESCRIBIR fibonacci (contador), “ “
                FIN PARA
            FIN
            
            FUNCIÓN fibonacci (n) DEVUELVE ENTERO
                SI n = 0 ENTONCES
                    RETORNAR 0
                SINO SI n = 1  ENTONCES
                    RETORNAR 0 1
                SINO 
                    RETORNAR fibonacci (n-1) + fibonacci (n-2)
                FIN SI
            FIN FUNCIÓN
        `} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`function alg_fibonacci(n: number): number[] {
            let arr: number[] = [];
            if (n === 0) {
            arr = [0];
            } else if (n === 1) {
            arr = [0, 1];
            } else {
            arr = [0, 1];
            for (let i = 2; i <= n; i++) {
                arr[i] = arr[i-1] + arr[i-2];
            }
            }
            return arr;
        }`} />
      )}
    </div>
  );
}

export default Ex3;