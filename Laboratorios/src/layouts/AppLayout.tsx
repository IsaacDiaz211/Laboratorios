import { ReactNode } from "react";
import TabMenu from "../components/TabMenu";


type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <div style={{ display: "flex", height: "100vh" }}>
                <TabMenu />
                <main style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
                    {children}
                </main>
            </div>
        </div>
  );
};

export default AppLayout;