import { useState } from "react";
import { Button, Typography, Upload } from "antd";
import type { UploadProps } from "antd";

function Ex2UI() {
  const n: number =200;
  const [fileValues, setFileValues] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);

  function handleCalculate() {
    let arr: number[] = [];
    arr = fileValues;
    if (arr.length !== n) {
      alert(`El archivo contiene ${arr.length} números pero deben ser 200`);
      return;
    }
    if (arr.some(v => v < 0)) {
      alert("Todos los números deben ser positivos");
      return;
    }
    const start = performance.now();
    const sum = alg_adding_even(arr);
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

  //ALGORITMO PROPIAMENTE DEL EJERCICIO 2
  function alg_adding_even(arr: number[]): number {
    let sum = 0;
    let i = 0;
    while (i < 200) {
        if(arr[i] % 2 === 0) {
            sum += arr[i];
        }
        i++;
    }
    return sum;
  }


  return (
    <div style={{ maxWidth: 500 }}>
        <Typography.Title level={5}>Suma de 200 números positivos pares</Typography.Title>
        <div style={{ marginBottom: 12 }}>
            <Upload {...uploadProps}>
            <Button>Cargar archivo JSON</Button>
            </Upload>
        </div>
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

export default Ex2UI;