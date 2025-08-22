import { useState } from "react";
import { InputNumber, Button, Typography } from "antd";

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
    <div style={{ maxWidth: 500 }}>
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
      </div>
  )
};

export default Ex3UI;
