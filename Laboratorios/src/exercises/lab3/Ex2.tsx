import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex2UI from "./Ex2UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 
import CartesianGraph from "../../components/CartesianGraph";

function Ex2() {
  const [tab, setTab] = useState("interfaz");
  const [method, setMethod] = useState("biseccion");
  const [expresion, setExpresion] = useState("");

  return (
    <div>
      <SubTab graph={true} onChange={setTab} value={tab} />

      {tab === "interfaz" && <Ex2UI method={method} setMethod={setMethod} setExpression={setExpresion} />}

      {tab === "seudo" && (
        <Seudo
          code={
            method === "biseccion"
              ? `Pseudocódigo del método de bisección`
              : method === "regula"
              ? `Pseudocódigo del método de regula falsi`
              : method === "newton"
              ? `Pseudocódigo del método de Newton-Raphson`
              : `Pseudocódigo del método de iteración`
          }
        />
      )}

      {tab === "codigo" && (
        <CodeBlock
          code={
            method === "biseccion"
              ? `// Código de bisección`
              : method === "regula"
              ? `// Código de regula falsi`
              : method === "newton"
              ? `// Código de Newton-Raphson`
              : `// Código de iteración`
          }
        />
      )}

      {tab === "grafico" && (
        <CartesianGraph
          xRange={[-5, 10]}
          yRange={[-30, 30]}
          functionString={expresion || "x"}
          expresion={expresion || "x"}
          step={0.1}
        />
      )}
    </div>
  );
}

export default Ex2;