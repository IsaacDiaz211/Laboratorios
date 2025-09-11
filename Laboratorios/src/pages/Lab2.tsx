import { Tabs } from 'antd';
import Ex1 from '../exercises/lab2/Ex1';
import Ex2 from '../exercises/lab2/Ex2';
import Ex3 from '../exercises/lab2/Ex3';
import Ex5 from '../exercises/lab2/Ex5';
import Ex6 from '../exercises/lab2/Ex6';
import Ex7 from '../exercises/lab2/Ex7';

function Lab2() {
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
              <Ex2 />
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
          label: "Ejercicio 6",
          key: "6",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex6 />
            </div>,
        },
        {
          label: "Ejercicio 7",
          key: "7",
          children:
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}>
              <Ex7 />
            </div>,
        },
      ]}
    />
  );
}

export default Lab2;