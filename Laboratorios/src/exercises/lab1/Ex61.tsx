import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex61UI from "./Ex61UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex61() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex61UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo “Definir cantidad de términos necesarios para alcanzar 3 dígitos exactos de PI”

VAR 
    REAL pi_real, pi_aprox, pi_real_redondeado, pi_aprox_redondeado 
    ENTERO signo, denominador, terminos
    	
INICIO
    pi_real = 3.1415926535
    pi_aprox = 0
    signo = 1
    denominador = 1
    terminos = 0
    HACER
        pi_aprox = pi_aprox + signo * (4 / denominador)
        signo = signo * (-1)
        denominador = denominador + 2
        terminos = terminos + 1
        pi_aprox_redondeado = Redondear(pi_aprox, 3)
        pi_real_redondeado = Redondear(pi_real, 3)
    HASTA QUE pi_aprox_redondeado = pi_real_redondeado
    ESCRIBIR "Para obtener 3 cifras decimales exactas de PI se necesitan ", terminos, “ terminos de la serie”
FIN`} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`  function calculateNumberOfTerms(): number {
        const realPi = 3.1415926535;
        let approxPi = 0;
        let sign = 1;
        let denominator = 1;
        let terms = 0;

        let truncatedRealPi: number;
        let truncatedApproxPi: number;

          do {
            approxPi += sign * (4 / denominator);
            sign *= -1;
            denominator += 2;
            terms += 1;

            // Truncar a 3 decimales
            truncatedApproxPi = truncate(approxPi, 3);
            truncatedRealPi = truncate(realPi, 3);
        } while (truncatedApproxPi !== truncatedRealPi);

        return terms;
    }`} />
      )}
    </div>
  );
}

export default Ex61;