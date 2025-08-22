import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex2UI from "./Ex2UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex1() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex2UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo “Suma números pares”
            VAR
            ENTERO suma, contador, num
            
            INICIO
                contador = 0
                suma = 0
                ESCRIBIR “Ingrese 200 números enteros positivos”
                LEER lista
                MIENTRAS contador < 200
                        SI lista[contador] >= 0 ENTONCES
                            SI lista[contador] MOD 2 = 0 ENTONCES
                                suma = suma + lista[contador]
                            FIN SI
                            contador = contador + 1
                        FIN SI
                    FIN MIENTRAS
            ESCRIBIR “El valor de la suma de los números positivos pares ingresados es: ”, suma
            FIN
        `} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`function alg_adding_even(arr: number[]): number {
            let sum = 0;
            let i = 0;
            while (i < 200) {
                if(arr[i] % 2 === 0) {
                    sum += arr[i];
                }
                i++;
            }
            return sum;
        }`} />
      )}
    </div>
  );
}

export default Ex1;