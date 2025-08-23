import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Button, Typography, Upload, Space } from "antd";
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
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
              href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab1/Ex2UI.tsx" 
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