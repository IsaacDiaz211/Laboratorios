import { useState } from "react";
import { GithubOutlined} from '@ant-design/icons';
import { InputNumber, Button, Space, Typography} from "antd";
//import { Position } from "@tauri-apps/api/dpi";

function Ex7UI() {
    const [n, setN] = useState<number>(1);
    const [resultA, setResultA] = useState<number | null>(null);
    const [execTimeA, setExecTimeA] = useState<number | null>(null);
    const [resultB, setResultB] = useState<number | null>(null);
    const [execTimeB, setExecTimeB] = useState<number | null>(null);


  // inicializar inputs manuales cuando cambia N
    function handleSetN(value: number | string | null) {
        const count = typeof value === "number" ? value : Number(value ?? 1);
        setN(count);
        setResultA(null);
        setExecTimeA(null);
        setResultB(null);
        setExecTimeB(null);
    }

    function calculateOperationTime() {
        console.log("Botón presionado, N =", n);
        let start = performance.now();
        const serieA = calculateSerieA(n);
        let end = performance.now();
        setResultA(serieA);
        setExecTimeA(end-start);
        start = performance.now();
        const serieB = calculateSerieB(n);
        end = performance.now();
        setResultB(serieB);
        setExecTimeB(end-start);
    }
 
    function calculateSerieA(n: number): number {
        let serieA = 0;

        for (let i = 1; i <= n; i++) {
            serieA += 1 / (i*i);
        }

        return serieA; 
    }

    function calculateSerieB(n: number): number {
        let serieB = 0;

        for (let i = n; i >= 1; i--) {
            serieB += 1 / (i*i);
        }

        return serieB; 
    }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>Calculo de la sumatoria de 1 hasta n de 1 sobre n al cuadrado.</Typography.Title>
        <div style={{ marginBottom: 12 }}>
          <label>N: </label>
          <InputNumber min={1} max={1000000} value={n} onChange={handleSetN} 
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
          Calcular serie
        </Button>

        {resultA !== null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              El resultado de calcular la serie de 1 hasta n fue: {resultA}
            </Typography.Text>
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {(execTimeA ?? 0).toFixed(9)} ms
            </Typography.Text>
          </div>
        )}
        {resultB !== null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              El resultado de calcular la serie en sentido inverso fue: {resultB}
            </Typography.Text>
          <br />
            <Typography.Text type="secondary">
              Tiempo de ejecución: {(execTimeB ?? 0).toFixed(9)} ms
            </Typography.Text>
          <br />
          <br />
            <Typography.Text>
              Sabemos que la serie tendiendo a infinito converge a {Math.pow(Math.PI,2)/6}, por lo tanto, podemos concluir que calculando la serie de manera inversa podemos reducir el error muy ligeramente.
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
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex7UI.tsx" 
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

export default Ex7UI;