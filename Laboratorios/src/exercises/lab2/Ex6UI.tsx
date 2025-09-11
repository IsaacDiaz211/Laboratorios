import { useState } from "react";
import RepoDir from "../../components/RepoDir";
import { Radio, InputNumber, Button, Typography } from "antd";

function Ex6UI() {
  const [n, setN] = useState<number>(0);
  const [precision, setPrecision] = useState<boolean | null>(null);
  const [result, setResult] = useState<number| Float32Array | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);


  // inicializar inputs manuales cuando cambia N
  function handleSetN(value: number | null) {
    const count = value ?? 0;
    setN(count);
    setResult(null);
    setExecTime(null);
    setPrecision(null);
  }
  function handlePrecisionChange(value: boolean | null) {
    setPrecision(value);
    setResult(null);
    setExecTime(null);
  }
  // Algoritmos del ejercicio
  function algo_adding_single_precision(value: number): Float32Array {
    const singleArraySum = new Float32Array(2);
    singleArraySum[0] = 0.0;
    singleArraySum[1] = value;
    for (let i = 0; i < 100000; i++) {
      singleArraySum[0] += singleArraySum[1];
    }
    return singleArraySum;
  }
  function algo_adding_double_precision(value: number): number {
    let sum = 0.0;
    for (let i = 0; i < 100000; i++) {
      sum += value;
    }
    return sum;
  }

  function handleCalculate() {
    let sum: Float32Array | number = 0;
    let start: number = 0;
    let end: number = 0;
    if(precision === null) {
      alert("Por favor, seleccione la precisión");
      return;
    } else if (precision === true) {
      start = performance.now();
      sum = algo_adding_single_precision(n);
      end = performance.now();
    } else {
      start = performance.now();
      sum = algo_adding_double_precision(n);
      end = performance.now();
    }
    setResult(sum);
    setExecTime(end-start);
  }


  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>Suma de un número N (0 a 255) 100.000 veces con precisión simple y doble</Typography.Title>
        <div style={{ marginBottom: 12 }}>
          <label>N: </label>
          <InputNumber min={0} max={255} value={n} onChange={handleSetN} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <Radio.Group onChange={(e) => handlePrecisionChange(e.target.value)} value={precision}>
            <Radio value={true}>Precisión simple</Radio>
            <Radio value={false}>Precisión doble</Radio>
          </Radio.Group>
        </div>

        <Button type="primary" onClick={handleCalculate}>
          Calcular suma
        </Button>

        {result !== null && precision === true && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              Resultado con precisión simple: {(result as Float32Array)[0]}
            </Typography.Text>
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {execTime?.toFixed(9)} ms
            </Typography.Text>
          </div>
        )}
        {result !== null && precision === false && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              Resultado con precisión doble: {result}
            </Typography.Text>
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {execTime?.toFixed(9)} ms
            </Typography.Text>
          </div>
        )}
      </div>
      <RepoDir url="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex6UI.tsx" /> 
    </div>
  )
};

export default Ex6UI;
