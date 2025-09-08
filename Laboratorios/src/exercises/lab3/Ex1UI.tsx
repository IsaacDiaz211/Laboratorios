import { useState } from "react";
import { GithubOutlined } from "@ant-design/icons";
import { Button, Input, Space, Typography } from "antd";
// @ts-ignore
import Plot from "react-plotly.js";

function Ex1UI() {
  const [funcStr, setFuncStr] = useState<string>("Math.PI*(x**2)*((9-x)/3) - 30"); 
  const [dx, setDx] = useState<number>(0.5);
  const [tol, setTol] = useState<number>(0.001);

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const domainStart = -20;
  const domainEnd = 20;

  // Función en función de x
  const f = (x: number) => {
    try {
      return new Function("x", `return ${funcStr};`)(x) as number;
    } catch {
      throw new Error("Función inválida");
    }
  };

  const guessIntervals = (): [number, number][] => {
    const intervals: [number, number][] = [];
    let prevX = domainStart;
    let prevF = f(prevX);

    for (let x = domainStart + dx; x <= domainEnd; x += dx) {
      const currF = f(x);
      if (prevF * currF <= 0) {
        intervals.push([prevX, x]);
      }
      prevX = x;
      prevF = currF;
    }

    return intervals;
  };

  const bisection = (a: number, b: number, tol: number) => {
    let fa = f(a);
    let fb = f(b);
    if (fa * fb > 0) throw new Error("No hay raíz en el intervalo");

    let mid = a;
    let iterations = 0;
    const start = performance.now();

    while ((b - a) / 2 > tol) {
      mid = (a + b) / 2;
      const fmid = f(mid);

      if (fmid === 0) break;
      else if (fa * fmid < 0) {
        b = mid;
        fb = fmid;
      } else {
        a = mid;
        fa = fmid;
      }
      iterations++;
    }

    const end = performance.now();
    return { root: mid, iterations, time: end - start };
  };

  const linearInterpolation = (a: number, b: number, tol: number) => {
    let fa = f(a);
    let fb = f(b);
    if (fa * fb > 0) throw new Error("No hay raíz en el intervalo");

    let x = a;
    let iterations = 0;
    const start = performance.now();

    while (Math.abs(b - a) > tol) {
      x = a - (fa * (b - a)) / (fb - fa);
      const fx = f(x);

      if (fx === 0) break;
      if (fa * fx < 0) {
        b = x;
        fb = fx;
      } else {
        a = x;
        fa = fx;
      }
      iterations++;
    }

    const end = performance.now();
    return { root: x, iterations, time: end - start };
  };

  const ejecutar = () => {
    try {
      setError(null);
      const intervals = guessIntervals();
      if (intervals.length === 0) throw new Error("No se encontraron intervalos con cambio de signo");

      const resultados: any[] = [];

      intervals.forEach(([a, b], idx) => {
        try {
          const resB = bisection(a, b, tol);
          const resI = linearInterpolation(a, b, tol);
          resultados.push({
            key: idx,
            intervalo: `[${a.toFixed(2)}, ${b.toFixed(2)}]`,
            raizB: resB.root.toFixed(5),
            iterB: resB.iterations,
            tiempoB: resB.time.toFixed(6),
            raizI: resI.root.toFixed(5),
            iterI: resI.iterations,
            tiempoI: resI.time.toFixed(6),
          });
        } catch {}
      });

      setResults(resultados);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: "60px" }}>
      <div style={{ maxWidth: 900, flex: 1 }}>
        <Typography.Title level={5}>Métodos Numéricos: Tanteo, Bisección e Interpolación</Typography.Title>

        <Typography.Text>Ingrese la función de x:</Typography.Text>
        <Input value={funcStr} onChange={(e) => setFuncStr(e.target.value)} style={{ marginBottom: 12 }} />

        <Typography.Text>Incremento dx:</Typography.Text>
        <Input type="number" value={dx} onChange={(e) => setDx(parseFloat(e.target.value))} style={{ marginBottom: 12 }} />

        <Typography.Text>Error (tolerancia):</Typography.Text>
        <Input type="number" value={tol} onChange={(e) => setTol(parseFloat(e.target.value))} style={{ marginBottom: 12 }} />

        <Button type="primary" onClick={ejecutar}>Ejecutar Métodos</Button>

        {error && <Typography.Text type="danger" style={{ display: "block", marginTop: 12 }}>{error}</Typography.Text>}

        {results.length > 0 && (
          <div style={{ marginTop: 20 }}>
            {results.map((r) => (
              <div key={r.key} style={{ marginBottom: 10 }}>
                <Typography.Text strong>Intervalo: {r.intervalo}</Typography.Text><br/>
                <Typography.Text>Raíz Bisección: {r.raizB} (Iter: {r.iterB}, Tiempo: {r.tiempoB} ms)</Typography.Text><br/>
                <Typography.Text>Raíz Interpolación: {r.raizI} (Iter: {r.iterI}, Tiempo: {r.tiempoI} ms)</Typography.Text>
              </div>
            ))}

            <Plot
              data={[
                {
                  x: Array.from({ length: 400 }, (_, i) => domainStart + (i * (domainEnd - domainStart)) / 400),
                  y: Array.from({ length: 400 }, (_, i) => f(domainStart + (i * (domainEnd - domainStart)) / 400)),
                  type: "scatter",
                  mode: "lines",
                  name: "f(x)",
                },
                {
                  x: results.map((r) => parseFloat(r.raizB)),
                  y: results.map(() => 0),
                  type: "scatter",
                  mode: "markers",
                  marker: { color: "red", size: 10 },
                  name: "Raíces Bisección",
                },
                {
                  x: results.map((r) => parseFloat(r.raizI)),
                  y: results.map(() => 0),
                  type: "scatter",
                  mode: "markers",
                  marker: { color: "blue", size: 10 },
                  name: "Raíces Interpolación",
                },
              ]}
              layout={{
                title: "f(x) con raíces encontradas",
                xaxis: { title: "x" },
                yaxis: { title: "f(x)" },
              }}
              style={{ width: "100%", height: 500, marginTop: 16 }}
            />
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, textAlign: "center", borderTop: "1px solid #f0f0f0", padding: "16px 0", backgroundColor: "#fff", boxShadow: "0 -2px 8px rgba(0,0,0,0.1)" }}>
        <Space>
          <GithubOutlined />
          <a href="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab3/Ex1UI.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#1890ff", fontSize: 14 }}
          >
            Ver código en GitHub
          </a>
        </Space>
      </div>
    </div>
  );
}

export default Ex1UI;
