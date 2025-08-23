import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { InputNumber, Button, Typography, Space } from "antd";

function Ex3UI() {
  const [n, setN] = useState<number>(0);
  const [result, setResult] = useState<number[] | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);


  // inicializar inputs manuales cuando cambia N
  function handleSetN(value: number | null) {
    const count = value ?? 0;
    setN(count);
    setResult(null);
    setExecTime(null);
  }
  // calcular la sucesión de fibonacci
  function handleCalculate() {
    const start = performance.now();
    const sum = alg_fibonacci(n);
    const end = performance.now();
    setResult(sum);
    setExecTime(end-start);
  }

  //ALGORITMO PROPIAMENTE DEL EJERCICIO 1
  function alg_fibonacci(n: number): number[] {
    let arr: number[] = [];
    if (n === 0) {
      arr = [0];
    } else if (n === 1) {
      arr = [0, 1];
    } else {
      arr = [0, 1];
      for (let i = 2; i <= n; i++) {
        arr[i] = arr[i-1] + arr[i-2];
      }
    }
    return arr;
  }


  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
      <Typography.Title level={5}>Suma de N números positivos</Typography.Title>
      <div style={{ marginBottom: 12 }}>
        <label>N: </label>
        <InputNumber min={0} max={1000} value={n} onChange={handleSetN} />
      </div>

      <Button type="primary" onClick={handleCalculate}>
        Calcular sucesión de Fibonacci
      </Button>

      {result !== null && (
        <div style={{ marginTop: 16 }}>
          <Typography.Text strong>
            Sucesión de Fibonacci:
          </Typography.Text>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {result.map((num, index) => (
              <span key={index} style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}>
                {num}
              </span>
            ))}
          </div>
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
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab1/Ex3UI.tsx" 
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

export default Ex3UI;
