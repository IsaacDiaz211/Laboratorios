import { Tabs } from 'antd';
import Gauss from '../exercises/lab4/Gauss';
import LUDecomposition from '../exercises/lab4/LUDecomposition';

const Lab4 = () => {
    return (
    <Tabs
      tabPosition="left"
      items={[
        {
          label: "Eliminación de Gauss",
          key: "1",
          children: 
            <div style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "2rem",
            }}>
            <Gauss />
            </div>,
        },
        {
          label: "Descomposición de LU",
          key: "2",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
                <LUDecomposition />
            </div>,
        }
      ]}
    />
  );
};

export default Lab4;
