import { useState } from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from "antd";


function Ex1UI() {
    const [result, setResult] = useState<number | null>(null);
    const e_redondeado: number = 2.718282;
    const pi_redondeado: number = 3.141593;
    const cociente_real: number = 1.15572735;
    
    const executeOperation = () => setResult(pi_redondeado/ e_redondeado);
    
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}> Dados 𝜋 y e redondeados a seis decimales, ¿cuantos dígitos significativos y decimales correctos tendrá el cociente 𝜋 / e?</Typography.Title>
        <Button type="primary" onClick={executeOperation}>
          Calcular cociente
        </Button>
        {result != null && (
          <div style={{ marginTop: 16 }}>
            <Typography.Text strong>
              Resultado Real: {cociente_real}
            </Typography.Text>
            <br />
            <Typography.Text strong>
              Resultado Calculado: {result}
            </Typography.Text>
            <br />
            <br />
            <Typography.Text>
              Finalmente vemos que el resultado calculado tiene 6 decimales correctos.
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
            href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex1UI.tsx" 
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

export default Ex1UI;