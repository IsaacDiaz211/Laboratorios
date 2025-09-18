import { Tabs } from 'antd';
import Ex1 from '../exercises/lab3/Ex1';
//import Ex2 from '../exercises/lab3/Ex2';
//import Ex3 from '../exercises/lab3/Ex3';

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
          label: "Bisección",
          key: "2",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
          
            </div>,
        },
        {
          label: "Interpolación Lineal",
          key: "3",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>

            </div>,
        },
        {
          label: "Newton-Raphson",
          key: "4",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>

            </div>,
        },{
          label: "Iteración",
          key: "4",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>

            </div>,
        },
      ]}
    />
  );
}

export default Lab3;