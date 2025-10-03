import  { useMemo, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  InputNumber,
  Space,
  Typography,
  Alert,
} from "antd";
import { algo_gauss_elimination } from "./algos_SystemOfLinearEquations";
import RepoDir from "../../components/RepoDir";


// Helpers de UI
function makeZeroMatrix(n: number): number[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
}
function makeZeroVector(n: number): number[] {
  return Array.from({ length: n }, () => 0);
}

function GaussUI() {
  const [n, setN] = useState<number>(3);
  const [A, setA] = useState<number[][]>(() => {
    // Ejemplo por defecto
    return [
      [3, 2, -1],
      [2, -2, 4],
      [-1, 0.5, -1],
    ];
  });
  const [b, setB] = useState<number[]>([1, -2, 0]);
  const [solution, setSolution] = useState<number[] | null>(null);
  const [execMs, setExecMs] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Si n cambia, redimensionamos A y b manteniendo valores previos cuando sea posible
  useMemo(() => {
    setA((prev) => {
      const next = makeZeroMatrix(n);
      for (let i = 0; i < Math.min(n, prev.length); i++)
        for (let j = 0; j < Math.min(n, prev[0].length); j++) next[i][j] = prev[i][j];
      return next;
    });
    setB((prev) => {
      const next = makeZeroVector(n);
      for (let i = 0; i < Math.min(n, prev.length); i++) next[i] = prev[i];
      return next;
    });
  }, [n]);

  function updateA(i: number, j: number, value: number | null) {
    setA((prev) => {
      const next = prev.map((row) => row.slice());
      next[i][j] = value ?? 0;
      return next;
    });
  }
  function updateB(i: number, value: number | null) {
    setB((prev) => {
      const next = prev.slice();
      next[i] = value ?? 0;
      return next;
    });
  }

  function handleSolve() {
    setSolution(null);
    setExecMs(null);
    setErrorMsg(null);

    try {
      const Aclone = A.map((r) => r.slice());
      const bclone = b.slice();
      const start = performance.now();
      const x = algo_gauss_elimination(Aclone, bclone);
      const end = performance.now();
      setExecMs(end - start);
      if (x === null) {
        setErrorMsg("El sistema es singular o el pivote es inválido (no se pudo resolver).");
      } else {
        setSolution(x);
      }
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Error inesperado al resolver.");
    }
  }

  return (
    <Flex vertical gap={16} style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <Typography.Title level={3}>Eliminación de Gauss</Typography.Title>
      <Typography.Text strong>
        Ingresa una matriz cuadrada <em>A</em> de tamaño n×n y un vector <em>b</em> para resolver A·x = b.
      </Typography.Text>

      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space wrap align="center">
            <Typography.Text strong>n =</Typography.Text>
            <InputNumber min={1} max={12} value={n} onChange={(v) => setN(v ?? 1)} />            
          </Space>

          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Typography.Title level={4}>Matriz A</Typography.Title>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, minmax(80px, 1fr))`, gap: 8 }}>
              {Array.from({ length: n }).map((_, i) =>
                Array.from({ length: n }).map((_, j) => (
                  <InputNumber
                    key={`A-${i}-${j}`}
                    value={A[i]?.[j] ?? 0}
                    onChange={(val) => updateA(i, j, val)}
                    step={0.1}
                  />
                ))
              )}
            </div>

            <Typography.Title level={5}>Vector b</Typography.Title>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, minmax(120px, 1fr))`, gap: 8 }}>
              {Array.from({ length: n }).map((_, i) => (
                <InputNumber key={`b-${i}`} value={b[i] ?? 0} onChange={(val) => updateB(i, val)} step={0.1} />
              ))}
            </div>
          </Space>

          <Space>
            <Button type="primary" onClick={handleSolve}>
              Resolver A·x = b
            </Button>
            <Button
              onClick={() => {
                setA(makeZeroMatrix(n));
                setB(makeZeroVector(n));
                setSolution(null);
                setExecMs(null);
                setErrorMsg(null);
              }}
            >
              Limpiar
            </Button>
          </Space>
        </Space>
      </Card>

      {errorMsg && (
        <Alert type="error" showIcon message={errorMsg} />
      )}

      {solution && (
        <Card>
          <Typography.Title level={5}>Solución</Typography.Title>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${solution.length}, minmax(120px, 1fr))`, gap: 8 }}>
            {solution.map((xi, idx) => (
              <Card key={`x-${idx}`} size="small">
                <Typography.Text>x{idx + 1}</Typography.Text>
                <div>
                  <Typography.Text type="secondary">{xi}</Typography.Text>
                </div>
              </Card>
            ))}
          </div>
          {execMs !== null && (
            <Typography.Paragraph style={{ marginTop: 12 }} type="secondary">
              Tiempo de ejecución: {execMs.toFixed(6)} ms
            </Typography.Paragraph>
          )}
        </Card>
      )}

      {!solution && execMs !== null && !errorMsg && (
        <Typography.Paragraph type="secondary">
          Tiempo de ejecución: {execMs.toFixed(6)} ms
        </Typography.Paragraph>
      )}

      <Divider />
      <RepoDir url="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab4/gaussUI.tsx" />
    </Flex>
  );
}

export default GaussUI;