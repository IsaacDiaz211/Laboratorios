import { useState } from "react";
import SubTab from "../../components/SubTab";
import Ex4UI from "./Ex4UI";
import CodeBlock from "../../components/CodeBlock";
import Seudo from "../../components/Seudo"; 

function Ex4() {
  const [tab, setTab] = useState("interfaz");

  return (
    <div>
      <SubTab graph={false} onChange={setTab} value={tab} />
      {tab === "interfaz" && <Ex4UI />}
      {tab === "seudo" && (
        <Seudo code={`
        `} />
      )}
      {tab === "codigo" && (
        <CodeBlock code={`
            `} />
      )}
    </div>
  );
}

export default Ex4;