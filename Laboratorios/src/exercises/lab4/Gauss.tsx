import { useState } from "react";
import SubTab from "../../components/SubTab";
import GaussUI from "./GaussUI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo";

function Gauss() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <GaussUI />}
      {tab === "seudo" && (
        <Seudo code={``} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={``} />
      )}
    </div>
  );
}

export default Gauss;
