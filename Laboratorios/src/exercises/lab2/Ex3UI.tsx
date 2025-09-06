import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Button, Space, Typography} from "antd";

//import { Position } from "@tauri-apps/api/dpi";

function Ex3UI() {
  //const [bulkValues, setBulkValues] = useState<string>("");
  const [roots, setRoots] = useState<string | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);


  // Realizar calculo de racies
  function calculateOperationTime() {
    const start = performance.now();
    const roots = calculateRoots(1, 100000000, 1);
    const end = performance.now();
    setRoots(roots);
    setExecTime(end-start);
  }
  

  //ALGORITMO PROPIAMENTE DEL EJERCICIO 3
  function calculateRoots(a: number, b: number, c: number): string {

        const discriminant = Math.pow(b, 2) - 4 * a * c;
        let x1, x2;

        if (discriminant < 0) {
            return "La ecuación no tiene raíces reales";
        }
        
        //Usaremos la formula alternativa para evitar la cancelación en caso de que la diferencia en el númerador sea muy pequeña.

        if(b >= 0){ 
            x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            x1 = (-2 * c) / (-b - Math.sqrt(discriminant));
           
        } else{ 
            x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
            x1 = (-2 * c) / (-b + Math.sqrt(discriminant));
        }
        

        return `Las raíces de la ecuación son ${x1} y ${x2}`;
    }


  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>Calculo de raices</Typography.Title>
        <Typography.Paragraph><b>Ecuación: </b> X² + 100000000X + 1</Typography.Paragraph>

        <Button type="primary" onClick={calculateOperationTime}>
          Calcular raices
        </Button>

        {roots !== null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              {roots}
            </Typography.Text>
          <br />
          <br />
            <Typography.Text>
              OBSERVACIÓN: Calculando manualmente las raices obtenidas fueron 1e^-8 y -100.000.000 respectivamente. En base a lo anterior podemos concluir que el programa resuelve la ecuación con un resultado identico al que si lo hubieramos resuelto manualmente desde una calculadora.
            </Typography.Text>
          <br />
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {execTime?.toFixed(9)} ms
            </Typography.Text>
          </div>
        )}
      </div>
      
      <div style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        borderTop: '1px solid #f0f0f0',
        padding: '16px 0',
        backgroundColor: '#fff',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
      }}>
        <Space>
          <GithubOutlined />
          <a 
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex3UI.tsx" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8,
              textDecoration: 'none',
              color: '#1890ff',
              fontSize: 14
            }}
          >
            Ver código en GitHub
          </a>
        </Space>
      </div>
    </div>
  )
};

export default Ex3UI;