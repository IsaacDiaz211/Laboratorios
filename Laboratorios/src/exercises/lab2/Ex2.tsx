import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex2UI from "./Ex2UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex2() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex2UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo “Comparación entre Errores relativos”
            VAR
            Real num1, num2, aprox1, aprox2, errorRela1, errorRela2
            
            INICIO
                ESCRIBIR “Ingrese el primer número”
                LEER num1
                ESCRIBIR “Ingrese la aproximación del primer número”
                LEER aprox1
                ESCRIBIR “Ingrese el segundo número”
                LEER num2
                ESCRIBIR “Ingrese la aproximación del segundo número”
                LEER aprox2
                errorRela1 = |(num1 - aprox1)| / num1
                errorRela2 = |(num2 - aprox2)| / num2
                ESCRIBIR “El error relativo del primer número es: ”, errorRela1
                ESCRIBIR “El error relativo del segundo número es: ”, errorRela2
                SI errorRela1 > errorRela2 ENTONCES
                    ESCRIBIR “El error relativo del primer número es mayor”
                    SINO
                        ESCRIBIR "El error relativo del segundo número es mayor"
                FIN SI
        `} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`function algo_comparing_errors(num1: number, aprox1: number, num2: number, aprox2: number): number {
            let errorRela1 = |(num1 - aprox1)| / num1;
            let errorRela2 = |(num2 - aprox2)| / num2;
            if(errorRela1 > errorRela2) {
                return num1;
            } else if(errorRela1 < errorRela2) {
                return num2;
            } else {
                return 0;
            }
        }`} />
      )}
    </div>
  );
}

export default Ex2;