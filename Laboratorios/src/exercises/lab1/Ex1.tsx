import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex1UI from "./Ex1UI";
import Code from "../../components/Code";
import Seudo from "../../components/Seudo"; 

function Ex1() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex1UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo: “Suma n enteros positivos”
            VAR 
            ENTERO n, suma, contador, num
            
            INICIO
                contador = 0
                suma = 0
                ESCRIBIR “Ingrese el valor de n”
                LEER n
                MIENTRAS contador < n
                        ESCRIBIR “Ingrese un entero positivo”
                        LEER num
                        SI num >= 0 ENTONCES
                            suma = suma + num
                            contador = contador + 1
                        SINO
                            ESCRIBIR “Valor no válido. Intente nuevamente.”
                        FIN SI
                    FIN MIENTRAS
                ESCRIBIR “El valor de la suma de los n números positivos ingresados es: ”, suma
                FIN`} />
      )}
      {tab === "codigo" && (
        <Code code={`function sumArray(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}`} />
      )}
    </div>
  );
}

export default Ex1;
