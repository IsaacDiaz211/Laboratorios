import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { InputNumber, Button, Space, Typography} from "antd";
//import { Position } from "@tauri-apps/api/dpi";

function Ex5UI() {
  const [n, setN] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);


  // inicializar inputs manuales cuando cambia N
  function handleSetN(value: number | null) {
    const count = value ?? 0;
    setN(count);
    setResult(null);
    setExecTime(null);
  }

  function calculateOperationTime() {
    if (n < 0) {
       alert("N debe ser mayor o igual a 0");
      return;
    } 
    const start = performance.now();
    const sum = calculateE(n);
    const end = performance.now();
    setResult(sum);
    setExecTime(end-start);
  }
 
  //ALGORITMO PROPIAMENTE DEL EJERCICIO 5
  function calculateE(n: number): number {
        let number_e = 0;

        for (let i = 0; i < n; i++) {
            number_e += 1 / factorial(i);
        }

        return number_e; 
    }

  function factorial(num: number): number {
        if (num === 0 || num === 1) return 1;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>Calculo del número e en base a los N primeros términos de la serie.</Typography.Title>
        <div style={{ marginBottom: 12 }}>
          <label>N: </label>
          <InputNumber min={0} max={1000000} value={n} onChange={handleSetN} 
          onKeyDown={(e) => {
                const allowedKeys = [
                "Backspace", "Delete", "Tab", "Enter",
                "ArrowLeft", "ArrowRight", "Home", "End"
                ];
                // si la tecla no es número y no está en allowedKeys, prevenir
                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
                }
            }}/>
        </div>

        <Button type="primary" onClick={calculateOperationTime}>
          Calcular e
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
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab1/Ex5UI.tsx" 
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

export default Ex5UI;