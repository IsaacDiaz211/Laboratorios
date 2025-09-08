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
        <Seudo code={``} />
      )}      
      {tab === "codigo" && (
        <CodeBlock code={``} />
      )}
    </div>
  );
}

export default Ex3;