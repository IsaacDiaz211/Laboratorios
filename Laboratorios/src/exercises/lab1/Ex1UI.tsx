import { useState } from "react";
import { InputNumber, Button, Input, Space, Typography } from "antd";

function Ex1UI() {
  const [n, setN] = useState<number>(0);
  const [manualValues, setManualValues] = useState<number[]>([]);
  const [bulkValues, setBulkValues] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  // Inicializar inputs manuales cuando cambia N
  function handleSetN(value: number | null) {
    const count = value ?? 0;
    setN(count);
    setManualValues(Array(count).fill(0));
    setResult(null);
    setBulkValues("");
  }

  function handleManualChange(index: number, value: number | null) {
    const arr = [...manualValues];
    arr[index] = value ?? 0;
    setManualValues(arr);
  }

  function handleCalculate() {
    let arr: number[] = [];
    if (n <= 20) {
      arr = manualValues;
    } else {
      arr = bulkValues
        .split(/[\s,]+/)
        .map(v => Number(v.trim()))
        .filter(v => !isNaN(v));
      if (arr.length !== n) {
        alert(`Ingresaste ${arr.length} números pero N=${n}`);
        return;
      }
    }
    if (arr.some(v => v < 0)) {
      alert("Todos los números deben ser positivos");
      return;
    }
    const sum = arr.reduce((acc, v) => acc + v, 0);
    setResult(sum);
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <Typography.Title level={5}>Suma de N números positivos</Typography.Title>
      <div style={{ marginBottom: 12 }}>
        <label>N: </label>
        <InputNumber min={0} max={10000} value={n} onChange={handleSetN} />
      </div>

      {n > 0 && n <= 20 && (
        <Space direction="vertical" style={{ width: "100%", marginBottom: 12 }}>
          {manualValues.map((val, i) => (
            <InputNumber
              key={i}
              value={val}
              min={0}
              onChange={(v) => handleManualChange(i, v)}
              placeholder={`X${i + 1}`}
              style={{ width: "100%" }}
            />
          ))}
        </Space>
      )}

      {n > 20 && (
        <div style={{ marginBottom: 12 }}>
          <label>Valores (separados por coma o espacio):</label>
          <Input.TextArea
            rows={5}
            value={bulkValues}
            onChange={(e) => setBulkValues(e.target.value)}
          />
        </div>
      )}

      <Button type="primary" onClick={handleCalculate}>
        Calcular suma
      </Button>

      {result !== null && (
        <div style={{ marginTop: 16 }}>
          <Typography.Text strong>Resultado: {result}</Typography.Text>
        </div>
      )}
    </div>
  );
}

export default Ex1UI;