import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Button, Typography, InputNumber, Space } from "antd";
import type { UploadProps } from "antd";

function Ex2UI() {
  const [num1, setNum1] = useState<number>(0);
  const [aprox1, setAprox1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [aprox2, setAprox2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);

  function handleSetNumbers(value: number | null, location: number) {
    const count = value ?? 0;
    switch(location) {
      case 0:
        setNum1(count);
        break;
      case 1:
        setAprox1(count);
        break;
      case 2:
        setNum2(count);
        break;
      case 3:
        setAprox2(count);
        break;
    };
    setResult(null);
    setExecTime(null);
  }

  function handleCalculate() {
    const start = performance.now();
    const sum = algo_comparing_errors(num1, aprox1, num2, aprox2);
    const end = performance.now();
    setResult(sum);
    setExecTime(end-start);
  }

  //ALGORITMO PROPIAMENTE DEL EJERCICIO 2
  function algo_comparing_errors(num1: number, aprox1: number, num2: number, aprox2: number): number {
    let errorRela1 = Math.abs(num1 - aprox1) / num1;
    let errorRela2 = Math.abs(num2 - aprox2) / num2;
    if(errorRela1 > errorRela2) {
        return num1;
    } else if(errorRela1 < errorRela2) {
        return num2;
    } else {
        return 0;
    }
  }


  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
          <Typography.Title level={5}>Comparación de Error relativo</Typography.Title>
          <div style={{ marginBottom: 12 }}>
            <label>Número 1: </label>
            <InputNumber min={0} max={1000} value={num1} onChange={(value) => handleSetNumbers(value, 0)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Aproximación de número 1: </label>
            <InputNumber min={0} max={1000} value={aprox1} onChange={(value) => handleSetNumbers(value, 1)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Número 2: </label>
            <InputNumber min={1} max={10000} value={num2} onChange={(value) => handleSetNumbers(value, 2)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Aproximación de número 2: </label>
            <InputNumber min={1} max={10000} value={aprox2} onChange={(value) => handleSetNumbers(value, 3)} />
          </div>
          <Button type="primary" onClick={handleCalculate}>
              Comparar Errores
          </Button>
          {result !== null && (
              <div style={{ marginTop: 16 }}>
              <Typography.Text strong>
                  Resultado: {result}
              </Typography.Text>
              <br />
              <Typography.Text type="secondary">
                  Tiempo de ejecución: {execTime?.toFixed(9)} ms
              </Typography.Text>
              </div>
          )}
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
              href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex2UI.tsx" 
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
    </div>
  )
};

export default Ex2UI;