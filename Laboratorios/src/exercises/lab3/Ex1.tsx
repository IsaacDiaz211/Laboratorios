import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex1UI from "./Ex1UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 
import CartesianGraph from "../../components/CartesianGraph";

function Ex1() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={true} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex1UI />}
      {tab === "seudo" && (
        <Seudo code={``} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={``} />
      )}
      {tab === "grafico" && (
        
        <CartesianGraph
          xRange={[-5, 10]}
          yRange={[-30, 30]}
          functionString="Math.PI*(x**2)*((9-x)/3) - 30"
          expresion="\pi * h^2 (\frac{3R - h}{3})"
          step={0.1}
        />
      
      )}
    </div>
  );
}

export default Ex1;