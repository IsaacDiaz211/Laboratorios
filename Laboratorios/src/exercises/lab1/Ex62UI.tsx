import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Button, Space, Typography} from "antd";
//import { Position } from "@tauri-apps/api/dpi";

function Ex62UI() {
  const [result1, setResult1] = useState<number | null>(null);
  const [execTime1, setExecTime1] = useState<number | null>(null);
  const [result2, setResult2] = useState<number | null>(null);
  const [execTime2, setExecTime2] = useState<number | null>(null);


  function calculateOperationsTime() {
    let start = performance.now();
    const numberOfTermsFor4 = calculateNumberOfTerms(4);
    let end = performance.now();
    setResult1(numberOfTermsFor4);
    setExecTime1(end-start);
    start = performance.now();
    const numberOfTermsFor5 = calculateNumberOfTerms(5);
    end = performance.now();
    setResult2(numberOfTermsFor5);
    setExecTime2(end-start);
  }
 
  //ALGORITMO PROPIAMENTE DEL EJERCICIO 6
  function calculateNumberOfTerms(qty: number): number {
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

            truncatedApproxPi = truncate(approxPi, qty);
            truncatedRealPi = truncate(realPi, qty);
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
        <Typography.Title level={5}>Definir cantidad de términos necesarios para alcanzar 4/5 dígitos exactos de PI.</Typography.Title>
        
        <Button type="primary" onClick={calculateOperationsTime}>
          Calcular
        </Button>

        {result1 !== null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              Términos necesarios para 4 dígitos exactos: {result1}
            </Typography.Text>
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {execTime1?.toFixed(9)} ms
            </Typography.Text>
          </div>
        )}
         {result2 !== null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              Términos necesarios para 5 dígitos exactos: {result2}
            </Typography.Text>
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {execTime2?.toFixed(9)} ms
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
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab1/Ex62UI.tsx" 
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

export default Ex62UI;