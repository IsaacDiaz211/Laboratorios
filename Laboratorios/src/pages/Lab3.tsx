import { Tabs } from 'antd';
import Ex1 from '../exercises/lab3/Ex1';
import Ex2 from '../exercises/lab3/Ex2';

function Lab3() {
  return (
    <Tabs
      tabPosition="left"
      items={[
        {
          label: "Ejercicio 1",
          key: "1",
          children: 
            <div style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "2rem",
            }}>
            <Ex1 />
            </div>,
        },
        {
          label: "Métodos",
          key: "2",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
                <Ex2 />
            </div>,
        }
      ]}
    />
  );
}

export default Lab3;