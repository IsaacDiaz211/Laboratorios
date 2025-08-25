import { Tabs } from 'antd';
import Ex1 from '../exercises/lab1/Ex1';
import Ex2 from '../exercises/lab1/Ex2';
import Ex3 from '../exercises/lab1/Ex3';
import Ex4 from '../exercises/lab1/Ex4';
import Ex5 from '../exercises/lab1/Ex5';
import Ex61 from '../exercises/lab1/Ex61';
import Ex62 from '../exercises/lab1/Ex62';

function Lab1() {
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
          label: "Ejercicio 2",
          key: "2",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex2 />
            </div>,
        },
        {
          label: "Ejercicio 3",
          key: "3",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex3 />
            </div>,
        },
        {
          label: "Ejercicio 4",
          key: "4",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex4 />
            </div>,
        },
        {
          label: "Ejercicio 5",
          key: "5",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex5 />
            </div>,
        },
        {
          label: "Ejercicio 6.1",
          key: "6.1",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex61 />
            </div>,
        },
        {
          label: "Ejercicio 6.2",
          key: "6.2",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex62 />
            </div>,
        },
      ]}
    />
  );
}

export default Lab1;