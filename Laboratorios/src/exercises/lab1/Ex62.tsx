import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex62UI from "./Ex62UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex62() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex62UI />}
      {tab === "seudo" && (
        <Seudo code={`Algoritmo “Definir cantidad de términos para alcanzar 4 y 5 dígitos exactos de PI”
VAR
    REAL pi_real, pi_aprox, pi_aprox_truncado, pi_real_truncado
    ENTERO cifras [2], signo, denominador, terminos	
INICIO
    pi_real = 3.1415926535
    cifras = [4, 5]
    PARA CADA c EN cifras HACER
        pi_aprox = 0
        signo = 1
        denominador = 1
        terminos = 0
        REPETIR
            pi_aprox = pi_aprox + signo * (4 / denominador)
            signo = signo * (-1)
            denominador = denominador + 2
            terminos = terminos + 1
            pi_aprox_truncado = Truncar(pi_aprox, c)
            pi_real_truncado = Truncar(pi_real, c)
        HASTA QUE pi_aprox_truncado = pi_real_truncado
        ESCRIBIR "Para alcanzar ", c, " cifras decimales exactas de PI fueron requeridos ", terminos, “ terminos de la serie.”    	
    FINPARA
FIN`} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`function calculateNumberOfTerms(qty: number): number {
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

            truncatedApproxPi = truncate(approxPi, qty);
            truncatedRealPi = truncate(realPi, qty);
        } while (truncatedApproxPi !== truncatedRealPi);

        return terms;
    }`} />
      )}
    </div>
  );
}

export default Ex62;