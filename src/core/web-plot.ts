declare const Bun: {
  serve: (options: {
    port?: number;
    fetch: (req: Request, server: { port: number }) => Response | Promise<Response>;
  }) => {
    port: number;
    stop: (closeActiveConnections?: boolean) => void;
  };
};

type Point = {
  x: number;
  y: number;
};

export type WebPlotOptions = {
  expression: string;
  fn: (x: number) => number;
  markRoot?: boolean;
  root?: number;
  xLower?: number;
  xUpper?: number;
  rangeHalfWidth?: number;
  samples?: number;
  idleTimeoutMs?: number;
};

export type WebPlotHandle = {
  url: string;
  close: () => void;
};

type PlotPayload = {
  expression: string;
  markRoot: boolean;
  root: number | null;
  xLower: number;
  xUpper: number;
  fRoot: number | null;
  yLower: number;
  yUpper: number;
  points: Point[];
};

const DEFAULT_RANGE_HALF_WIDTH = 5;
const DEFAULT_SAMPLES = 1000;
const DEFAULT_IDLE_TIMEOUT_MS = 60_000;

function sampleFunction(
  fn: (x: number) => number,
  xLower: number,
  xUpper: number,
  samples: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < samples; i += 1) {
    const ratio = samples === 1 ? 0 : i / (samples - 1);
    const x = xLower + ratio * (xUpper - xLower);
    const y = fn(x);
    if (Number.isFinite(y)) {
      points.push({ x, y });
    }
  }
  return points;
}

function buildPageHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Grafico de funcion</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #fafafa; color: #222; }
    h1 { font-size: 1.1rem; margin: 0 0 16px; }
    #chart-wrap { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 1100px; }
    canvas { width: 100% !important; height: 520px !important; }
    #status { margin-top: 12px; color: #666; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1 id="title">Grafico de funcion</h1>
  <div id="chart-wrap">
    <canvas id="chart"></canvas>
  </div>
  <div id="status">Cargando datos...</div>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
  <script>
    (function () {
      var RESIDUAL_EPS = 1e-12;

      function fmt(value) {
        var n = Number(value);
        if (!Number.isFinite(n)) return String(value);
        if (Object.is(n, -0)) return "0";
        var abs = Math.abs(n);
        if (abs !== 0 && (abs < 1e-4 || abs >= 1e5)) return n.toExponential(3);
        return n.toFixed(3);
      }

      function fmtHighPrecision(value) {
        var n = Number(value);
        if (!Number.isFinite(n)) return String(value);
        if (Object.is(n, -0)) return "0";
        var abs = Math.abs(n);
        if (abs !== 0 && (abs < 1e-4 || abs >= 1e5)) {
          var exp = n.toExponential(16);
          return exp.replace(/(\.\d*?)0+e/, "$1e").replace(/\.e/, "e");
        }
        return n.toPrecision(17).replace(/\.?0+$/, "");
      }

      function fmtResidual(value) {
        var n = Number(value);
        if (!Number.isFinite(n)) return String(value);
        if (Math.abs(n) < RESIDUAL_EPS) {
          if (n === 0 || Object.is(n, -0)) return "≈ 0 (residual = 0)";
          return "≈ 0 (residual = " + fmtHighPrecision(n) + ")";
        }
        return fmtHighPrecision(n);
      }

      function buildChart(payload) {
        var ctx = document.getElementById("chart");
        if (!ctx) return;
        document.getElementById("title").textContent = "Funcion " + payload.expression;
        var datasets = [
          {
            label: "f(x)",
            data: payload.points,
            borderColor: "rgb(220, 20, 60)",
            backgroundColor: "rgba(220, 20, 60, 0.08)",
            borderWidth: 2,
            pointRadius: 0,
            showLine: true,
            parsing: false,
          },
        ];
        if (payload.markRoot && payload.root !== null && payload.fRoot !== null) {
          datasets.push({
            label: "x = " + fmtHighPrecision(payload.root),
            data: [
              { x: payload.root, y: payload.yLower },
              { x: payload.root, y: payload.yUpper },
            ],
            borderColor: "rgb(30, 100, 200)",
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            showLine: true,
            parsing: false,
          });
          datasets.push({
            label: "Raiz",
            data: [{ x: payload.root, y: payload.fRoot }],
            borderColor: "rgb(30, 100, 200)",
            backgroundColor: "rgb(30, 100, 200)",
            pointRadius: 6,
            pointHoverRadius: 7,
            showLine: false,
            parsing: false,
          });
        }
        new Chart(ctx, {
          type: "line",
          data: { datasets: datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              title: { display: false },
              legend: { position: "top" },
              tooltip: {
                callbacks: {
                  label: function (item) {
                    return item.dataset.label + ": (" + fmt(item.parsed.x) + ", " + fmt(item.parsed.y) + ")";
                  },
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                title: { display: true, text: "x" },
                min: payload.xLower,
                max: payload.xUpper,
                ticks: { callback: function (v) { return fmt(v); } },
              },
              y: {
                title: { display: true, text: "y" },
                ticks: { callback: function (v) { return fmt(v); } },
              },
            },
          },
        });
      }

      function renderStatus(payload) {
        if (payload.markRoot && payload.root !== null && payload.fRoot !== null) {
          return "Raiz final: x = " + fmtHighPrecision(payload.root) + " (f(x) = " + fmtResidual(payload.fRoot) + ")";
        }
        return "Grafico de la funcion en [" + fmt(payload.xLower) + ", " + fmt(payload.xUpper) + "]";
      }

      fetch("/data")
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (payload) {
          buildChart(payload);
          document.getElementById("status").textContent = renderStatus(payload);
        })
        .catch(function (err) {
          document.getElementById("status").textContent = "Error al cargar datos: " + err.message;
        });
    })();
  </script>
</body>
</html>`;
}

function resolveBounds(
  markRoot: boolean,
  root: number | undefined,
  xLower: number | undefined,
  xUpper: number | undefined,
  rangeHalfWidth: number
): { xLower: number; xUpper: number } {
  if (markRoot) {
    if (root === undefined) {
      throw new Error("Se requiere 'root' cuando markRoot es true (o no se especifica).");
    }
    return { xLower: root - rangeHalfWidth, xUpper: root + rangeHalfWidth };
  }
  if (xLower === undefined || xUpper === undefined) {
    throw new Error("Se requieren 'xLower' y 'xUpper' cuando markRoot es false.");
  }
  if (xUpper <= xLower) {
    throw new Error("xUpper debe ser mayor que xLower.");
  }
  return { xLower, xUpper };
}

function buildPayload(
  expression: string,
  fn: (x: number) => number,
  markRoot: boolean,
  root: number | undefined,
  xLowerOpt: number | undefined,
  xUpperOpt: number | undefined,
  rangeHalfWidth: number,
  samples: number
): PlotPayload {
  const { xLower, xUpper } = resolveBounds(markRoot, root, xLowerOpt, xUpperOpt, rangeHalfWidth);
  const points = sampleFunction(fn, xLower, xUpper, samples);
  if (points.length === 0) {
    throw new Error("No se pudieron obtener puntos validos para el grafico.");
  }
  let yLower = points[0].y;
  let yUpper = points[0].y;
  for (const point of points) {
    yLower = Math.min(yLower, point.y);
    yUpper = Math.max(yUpper, point.y);
  }
  if (yLower === yUpper) {
    yLower -= 1;
    yUpper += 1;
  } else {
    const padding = (yUpper - yLower) * 0.1;
    yLower -= padding;
    yUpper += padding;
  }
  let fRoot: number | null = null;
  if (markRoot && root !== undefined) {
    const v = fn(root);
    fRoot = Number.isFinite(v) ? v : 0;
  }
  return {
    expression,
    markRoot,
    root: markRoot && root !== undefined ? root : null,
    xLower,
    xUpper,
    fRoot,
    yLower,
    yUpper,
    points,
  };
}

/**
 * Levanta un servidor HTTP efimero que sirve una pagina con Chart.js.
 *
 * Modo 1 (markRoot=true, default): se requiere `root`. La curva se renderiza en
 *   [root - rangeHalfWidth, root + rangeHalfWidth], con una linea vertical en
 *   x = root y un punto sobre la curva.
 * Modo 2 (markRoot=false): se requieren `xLower` y `xUpper`. La curva se
 *   renderiza en ese rango, sin marcador de raiz.
 *
 * El servidor se cierra automaticamente tras `idleTimeoutMs` sin conexiones nuevas.
 * @param options Opciones del grafico web
 * @returns URL del servidor y funcion para cerrarlo manualmente
 */
export async function startWebPlot(options: WebPlotOptions): Promise<WebPlotHandle> {
  const markRoot = options.markRoot !== false;
  const rangeHalfWidth = options.rangeHalfWidth ?? DEFAULT_RANGE_HALF_WIDTH;
  const samples = options.samples ?? DEFAULT_SAMPLES;
  const idleTimeoutMs = options.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS;

  const payload = buildPayload(
    options.expression,
    options.fn,
    markRoot,
    options.root,
    options.xLower,
    options.xUpper,
    rangeHalfWidth,
    samples
  );
  const html = buildPageHtml();
  const json = JSON.stringify(payload);

  let idleTimer: ReturnType<typeof setTimeout> | null = null;
  let serverRef: { stop: (closeActiveConnections?: boolean) => void } | null = null;

  function armIdleTimer(): void {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (serverRef) serverRef.stop(true);
    }, idleTimeoutMs);
  }

  const server = Bun.serve({
    port: 0,
    fetch(req, server) {
      armIdleTimer();
      const url = new URL(req.url);
      if (url.pathname === "/data") {
        return new Response(json, {
          headers: { "content-type": "application/json; charset=utf-8" },
        });
      }
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    },
  });
  serverRef = server;
  armIdleTimer();

  const url = `http://localhost:${server.port}/`;
  return {
    url,
    close: () => {
      if (idleTimer) clearTimeout(idleTimer);
      server.stop(true);
    },
  };
}
