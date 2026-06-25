# Estructura y tecnologías del proyecto

## Stack

- **Runtime**: Bun (gestiona ejecución y dependencias).
- **Lenguaje**: TypeScript con `strict: true`, `noEmit: true`, `moduleResolution: "Bundler"`, ESM (`"type": "module"`).
- **TUI**: `prompts` para entrada por consola.
- **Gráficos web**: servidor HTTP efímero (`Bun.serve`) que sirve una página HTML con Chart.js cargado desde CDN. No requiere build step ni dependencias npm adicionales.
- **Plotter legacy (deprecado)**: `pngjs` sigue declarada en `package.json` pero ya no se usa en el código activo (`src/core/plot.ts` se movió a `legacy-deprecated/plot.ts`).

## Estructura del código

```
.
├── src/
│   ├── cli.ts                         # Menú principal (TUI) y orquestación
│   ├── core/                          # Helpers compartidos
│   │   ├── input.ts                   # prompts y validación numérica
│   │   ├── files.ts                   # Carga de archivos JSON
│   │   ├── timer.ts                   # Medición de tiempo de ejecución
│   │   ├── output.ts                  # Formateo de tiempo y números
│   │   ├── expression.ts              # Parsing de expresiones JS/TS (f(x), g(x), f(x,y))
│   │   ├── web-plot.ts                # Servidor HTTP + Chart.js para Lab 3
│   │   ├── matrix.ts                  # Utilidades de matrices y vectores
│   │   ├── quadratic.ts               # Ecuaciones cuadráticas
│   │   ├── precision.ts               # Float32 vs double
│   │   └── report.ts                  # Reportes de tablas/diferencias
│   ├── algorithms/lab3.ts             # Bisección, Regula Falsi, Newton-Raphson, Iteración, Aitken
│   ├── algorithms/lab4/               # Gauss, Gauss-Jordan, LU, Gauss-Seidel
│   ├── algorithms/lab5/               # Newton-Gregory, Lagrange, inversa
│   └── labs/
│       ├── lab1/                      # Sumas, Fibonacci, e, pi
│       ├── lab2/                      # Errores, precisión, serie 1/n²
│       ├── lab3/                      # Método gráfico, tanteo, aproximación de raíces
│       ├── lab4/                      # Sistemas de ecuaciones lineales
│       ├── lab5/                      # Interpolación
│       ├── lab6/                      # Diferencias, derivación, integración
│       └── lab7/                      # EDOs: Euler, RK2, RK4, Milne
├── data/                              # Archivos JSON de entrada (clave `numeros`)
├── docs/                              # Documentación por método
│   ├── newton-raphson.md
│   ├── newton-gregory-ascendente.md
│   ├── newton-gregory-descendente.md
│   ├── eliminacion-gauss.md
│   └── examples.md
├── legacy-deprecated/                 # Código histórico ya no importado
│   ├── algos_SystemOfLinearEquations.ts
│   └── plot.ts                        # Ex `src/core/plot.ts` (PNG/ASCII)
├── tests/                             # Tests opcionales con `bun test`
├── outputs/                           # Salidas generadas (plots, etc.)
└── package.json
```

## Laboratorio 3 en detalle

El Laboratorio 3 se especializa en encontrar raíces de `f(x) = 0`:

- **Parte 1 — Método gráfico** (`src/labs/lab3/lab3-1.ts:runPartGraph`):
  - Captura `f(x)`, `x_lower`, `x_upper` y cantidad de muestras.
  - Detecta intervalos con cambio de signo usando `guessIntervals`.
  - Levanta `startWebPlot` con `markRoot: false` para mostrar la curva en el navegador (sin marcador de raíz).

- **Parte 2 — Método de tanteo** (`runPartTanteo`):
  - Captura `f(x)`, `x_lower`, `x_upper` e incremento.
  - Devuelve los intervalos con cambio de signo.

- **Parte 3 — Aproximación de raíces** (`runPartRoots`):
  - Menú con 5 métodos: Biseccion, Regula Falsi, Newton-Raphson, Iteracion, Iteracion con Aitken.
  - **Newton-Raphson** es el más completo:
    - Captura `a` y `b` (con `a` como `x0`).
    - Valida las 3 condiciones de Fourier en `[a, b]` antes del bucle (`evaluateFourierConditions` con `eps = 1e-12`).
    - Re-evalúa las condiciones en el intervalo local `[x_{n-1}, x_n]` por iteración mediante un callback `onIteration`.
    - Imprime `y`, `f'(x)`, `f''(x)` y `f(x)·f''(x)` por iteración.
    - Al final, `startWebPlot` con `markRoot: true` muestra la curva con línea vertical y punto en la raíz.

## Servidor web efímero (`src/core/web-plot.ts`)

- `Bun.serve({ port: 0 })` asigna un puerto libre del sistema operativo.
- Sirve una página HTML estática en `GET /` y los datos de la curva en `GET /data` (JSON).
- Chart.js v4 se carga desde `https://cdn.jsdelivr.net/npm/chart.js@4.4.0` (sin build step).
- Cierre automático tras un período de inactividad (default 60s) configurable vía `idleTimeoutMs`.
- El payload enviado a la página incluye `markRoot`, `root` (nullable), `fRoot` (nullable), `xLower`, `xUpper`, `points`, etc. La página decide en el cliente si dibuja o no el marcador de raíz según `markRoot`.
- La página incluye `fmtResidual` y `fmtHighPrecision` para mostrar la raíz y `f(raíz)` con el formato `≈ 0 (residual = X.Xe-13)` cuando aplica.

## Validación de Fourier (`src/algorithms/lab3.ts`)

- `evaluateFourierConditions(f, a, b, samples = 200)`:
  - I) `f(a)·f(b) < 0`
  - II) `min|f'(x)| > eps` en `(a, b)` (muestreo con `samples` puntos)
  - III) `min|f''(x)| > eps` en `(a, b)` (muestreo con `samples` puntos)
  - Devuelve `{ ok, results: FourierConditionResult[] }` con `id`, `description`, `satisfied` y `details` (cadena legible).
- `eps = 1e-12` se usa como umbral tanto para el algoritmo (`algo_newton_raphson`) como para la validación de Fourier.

## Datos

- `data/*.json` con clave `numeros` (ver `src/core/files.ts` y `README.md`).
- `outputs/plots/` se usa solo para plots legacy deprecados.

## Comandos

- Instalar: `bun install`
- Iniciar TUI: `bun run start` (ejecuta `bun src/cli.ts`)
- Type-check: `bunx tsc --noEmit`
- Tests (si existen): `bun test`
