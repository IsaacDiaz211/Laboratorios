import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex6UI from "./Ex6UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex6() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex6UI />}
      {tab === "seudo" && (
        <Seudo code=
        {`
          Algoritmo: sumar 100.000 veces con precisión simple o doble
          Entrada: número a sumar, precisión (simple o doble)
          Salida: suma de 100.000 veces el número con precisión simple o doble
          Proceso:
            1. Si la precisión es simple, sumar el número con precisión simple 100.000 veces
            2. Si la precisión es doble, sumar el número con precisión doble 100.000 veces
            3. Devolver la suma
          `} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code=
        {`
          function algo_adding_single_precision(value: number): number {
            const singleArraySum = new Float32Array(1);
            singleArraySum[0] = 0.0;
            singleArraySum[1] = value;
            for (let i = 0; i < 100000; i++) {
              singleArraySum[0] += singleArraySum[1];
            }
            return singleArraySum[0];
          }
          function algo_adding_double_precision(value: number): number {
            for (let i = 0; i < 100000; i++) {
              value ++;
            }
            return value;
          }
          `} />
      )}
    </div>
  );
}

export default Ex6;
