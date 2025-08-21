import { Tabs } from 'antd';
import Ex1 from '../exercises/lab1/Ex1';

function Lab1() {
  return (
    <Tabs
      tabPosition="left"
      items={[
        {
          label: "Ejercicio 1",
          key: "1",
          children: <Ex1 />,
        },
        {
          label: "Ejercicio 2",
          key: "2",
          children: <div>Ejercicio 2 pronto...</div>,
        },
        {
          label: "Ejercicio 3",
          key: "3",
          children: <div>Ejercicio 3 pronto...</div>,
        },
        // ...hasta 6 + complementarios
      ]}
    />
  );
}

export default Lab1;