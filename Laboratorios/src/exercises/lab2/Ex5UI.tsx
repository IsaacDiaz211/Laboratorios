import { useState } from "react";
import { Button, InputNumber, Typography } from "antd";
import RepoDir from "../../components/RepoDir";

function Ex5UI() {
  const [largo, setLargo] = useState<number>(1); 
  const [ancho, setAncho] = useState<number>(1);
  const [result, setResult] = useState<number | null>();
  const [execTime, setExecTime] = useState<number | null>(null);
  const [isInteger, setIsInteger] = useState<boolean | null>(null);

  function handleSetLargo(value: number | null) {
    const count = value ?? 0;
    setLargo(count);
    setResult(null);
    setExecTime(null);
    setIsInteger(null);
  }
  function handleSetAncho(value: number | null) {
    const count = value ?? 0;
    setAncho(count);
    setResult(null);
    setExecTime(null);
    setIsInteger(null);
  }

  interface AreaResult {
    exactValue: number;
    isInteger: boolean;
  }

  function algo_calculateExactArea(width: number, length: number): AreaResult {
    const productUnderRoot = width * length;
    const exactValue = Math.sqrt(productUnderRoot);
    const isInteger = Number.isInteger(exactValue);
    
    return {
      exactValue,
      isInteger
    };
  }
  function handleCalculate() {
    const start = performance.now();
    const sum = algo_calculateExactArea(ancho, largo);
    const end = performance.now();
    setExecTime(end-start);
    setResult(sum.exactValue);
    setIsInteger(sum.isInteger);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>
          Cálculo del área de un rectángulo con dimensiones al cuadrado
        </Typography.Title>
        
        <div style={{ marginBottom: 12 }}>
          <label>Largo al cuadrado: </label>
          <InputNumber min={1} max={10000} value={largo} onChange={handleSetLargo} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Ancho al cuadrado: </label>
          <InputNumber min={1} max={10000} value={ancho} onChange={handleSetAncho} />
        </div>
        <Button type="primary" onClick={handleCalculate}>Calcular área</Button>
        <div>
          {isInteger === true && (
            <div style={{ marginTop: 16 }}>
              <Typography.Text strong>
                Resultado real: {result}
              </Typography.Text>
            <br />
              <Typography.Text type="secondary">
                Tiempo de ejecución: {execTime?.toFixed(9)} ms
              </Typography.Text>
            </div>
          )}
          {isInteger === false && (
            <div style={{ marginTop: 16 }}>
              <Typography.Text strong>
                Resultado aproximado: {result}
              </Typography.Text>
            <br />
              <Typography.Text type="secondary">
                Tiempo de ejecución: {execTime?.toFixed(9)} ms
              </Typography.Text>
            </div>
          )}
        </div>
      </div>
      
      <RepoDir url="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex5UI.tsx" />
    </div>
  );
}

export default Ex5UI;