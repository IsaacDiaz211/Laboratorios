import { ReactNode } from "react";
import TabMenu from "../components/TabMenu";


type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
          <TabMenu />
        </div>
        <main style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
          {children}
        </main>
    </div>
  );
};

export default AppLayout;