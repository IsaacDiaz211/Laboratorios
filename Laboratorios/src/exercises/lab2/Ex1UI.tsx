import { useState } from "react";
import RepoDir from "../../components/RepoDir"
import { Button, Typography } from "antd";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex'


function Ex1UI() {
    const [result, setResult] = useState<number | null>(null);
    const e_redondeado: number = 2.718282;
    const pi_redondeado: number = 3.141593;
    const cociente_real: number = 1.15572735;
    
    const executeOperation = () => setResult(pi_redondeado/ e_redondeado);

    function countEqualDecimals(a: number, b: number): number {
      const strA = a.toString();
      const strB = b.toString();

      // Separar parte decimal
      const decimalsA = strA.split(".")[1] ?? "";
      const decimalsB = strB.split(".")[1] ?? "";

      let count = 0;
      const minLength = Math.min(decimalsA.length, decimalsB.length);

      for (let i = 0; i < minLength; i++) {
        if (decimalsA[i] === decimalsB[i]) {
          count++;
        } else {
          break; // en cuanto no coinciden, cortamos
        }
      }

      return count;
    }

    
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <div style={{ maxWidth: 500, flex: 1 }}>
        <Typography.Title level={5}>
          Dados 𝜋 y e redondeados a seis decimales, ¿cuantos dígitos significativos y decimales correctos tendrá el cociente
          <InlineMath math="\; \frac{\pi}{e} \;" />
          ?
        </Typography.Title>
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
              Finalmente vemos que el resultado calculado tiene {countEqualDecimals(cociente_real, result)} decimales correctos.
            </Typography.Text>
          </div>
        )}
      </div>
      
      <RepoDir url="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab2/Ex1UI.tsx"/>
    </div>
  )
};

export default Ex1UI;