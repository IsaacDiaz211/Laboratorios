import { useState } from "react";
import { InputNumber, Button, Space, Typography, Upload } from "antd";
import type { UploadProps } from "antd";

function Ex1UI() {
  const [n, setN] = useState<number>(0);
  const [manualValues, setManualValues] = useState<number[]>([]);
  const [fileValues, setFileValues] = useState<number[]>([]);
  //const [bulkValues, setBulkValues] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);


  // inicializar inputs manuales cuando cambia N
  function handleSetN(value: number | null) {
    const count = value ?? 0;
    setN(count);
    setManualValues(Array(count).fill(0));
    setResult(null);
    setExecTime(null);
  }

  function handleManualChange(index: number, value: number | null) {
    const arr = [...manualValues];
    arr[index] = value ?? 0;
    setManualValues(arr);
  }
  // desición para tomar los valor de a uno o por archivo
  function handleCalculate() {
    let arr: number[] = [];
    if (n <= 15) {
      arr = manualValues;
    } else {
      arr = fileValues;
      if (arr.length !== n) {
        alert(`El archivo contiene ${arr.length} números pero N=${n}`);
        return;
      }
    }
    if (arr.some(v => v < 0)) {
      alert("Todos los números deben ser positivos");
      return;
    }
    const start = performance.now();
    const sum = alg_adding_arr(arr);
    const end = performance.now();
    setResult(sum);
    setExecTime(end-start);
  }
  // manejo del archivo json para cantidades grandes
  const uploadProps: UploadProps = {
    accept: ".json",
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (!Array.isArray(json)) {
            alert("El archivo debe contener un array de números");
            return;
          }
          if (!json.every((x: any) => Number.isInteger(x) && x >= 0)) {
            alert("El archivo debe contener solo enteros positivos");
            return;
          }
          setFileValues(json);
          alert("Archivo cargado correctamente");
        } catch {
          alert("Error al leer el archivo JSON");
        }
      };
      reader.readAsText(file);
      return false; // evita subida automática
    },
  };

  //ALGORITMO PROPIAMENTE DEL EJERCICIO 1
  function alg_adding_arr(arr: number[]): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }


  return (
    <div style={{ maxWidth: 500 }}>
      <Typography.Title level={5}>Suma de N números positivos</Typography.Title>
      <div style={{ marginBottom: 12 }}>
        <label>N: </label>
        <InputNumber min={0} max={10000} value={n} onChange={handleSetN} />
      </div>

      {n > 0 && n <= 15 && (
        <Space direction="vertical" style={{ width: "100%", marginBottom: 12 }}>
          {manualValues.map((val, i) => (
            <InputNumber
              key={i}
              value={val}
              min={0}
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace", "Delete", "Tab", "Enter",
                  "ArrowLeft", "ArrowRight", "Home", "End"
                ];
                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault(); // con esto nos aseguramos de trabajar con enteros positivos
                }
              }}
              onChange={(v) => handleManualChange(i, v)}
              placeholder={`X${i + 1}`}
              style={{ width: "100%" }}
            />
          ))}
        </Space>
      )}

      {n > 15 && (
        <div style={{ marginBottom: 12 }}>
          <Upload {...uploadProps}>
            <Button>Cargar archivo JSON</Button>
          </Upload>
        </div>
      )}

      <Button type="primary" onClick={handleCalculate}>
        Calcular suma
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
      </div>
  )
};

export default Ex1UI;