import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Button, Space, Typography} from "antd";
//import { Position } from "@tauri-apps/api/dpi";

function Ex61UI() {
  const [result, setResult] = useState<number | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);


  function calculateOperationTime() {

    const start = performance.now();
    const numberOfTerms = calculateNumberOfTerms();
    const end = performance.now();
    setResult(numberOfTerms);
    setExecTime(end-start);
  }
 
  //ALGORITMO PROPIAMENTE DEL EJERCICIO 5
  function calculateNumberOfTerms(): number {
        const realPi = 3.1415926535;
        let approxPi = 0;
        let sign = 1;
        let denominator = 1;
        let terms = 0;

        let truncatedRealPi: number;
        let truncatedApproxPi: number;

          do {
            approxPi += sign * (4 / denominator);
            sign *= -1;
            denominator += 2;
            terms += 1;

            // Truncar a 3 decimales
            truncatedApproxPi = truncate(approxPi, 3);
            truncatedRealPi = truncate(realPi, 3);
        } while (truncatedApproxPi !== truncatedRealPi);

        return terms;
    }

  function truncate(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>Definir cantidad de términos necesarios para alcanzar 3 dígitos exactos de PI.</Typography.Title>
        
        <Button type="primary" onClick={calculateOperationTime}>
          Calcular
        </Button>

        {result !== null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              Términos necesarios: {result}
            </Typography.Text>
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
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab1/Ex61UI.tsx" 
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

export default Ex61UI;