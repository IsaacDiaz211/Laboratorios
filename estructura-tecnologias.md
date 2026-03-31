# Estructura y tecnologías del proyecto

## Estructura del código

- **Entrada principal (TUI):** `src/cli.ts` controla el menú principal, la selección de laboratorio y la ejecución de ejercicios de Lab 1 y Lab 2 (`src/cli.ts:1-12`, `src/cli.ts:23-38`, `src/cli.ts:51-80`).
- **Módulos compartidos (`src/core/`):**
  - Entrada y validación de datos por consola con prompts (`src/core/input.ts:1-141`).
  - Lectura/validación de archivos JSON con propiedad `numeros` (`src/core/files.ts:20-77`).
  - Medición y salida de tiempos de ejecución (`src/core/timer.ts:1-8`, `src/core/output.ts:1-7`).
  - Utilidades matemáticas (ecuaciones cuadráticas y precisión float/double) (`src/core/quadratic.ts:19-42`, `src/core/precision.ts:1-20`).
- **Ejercicios implementados:**
  - Lab 1 en `src/labs/lab1/` (sumas, Fibonacci, raíces, series de *e* y *pi*) (`src/labs/lab1/lab1-1.ts:36-57`, `src/labs/lab1/lab1-6.ts:14-23`).
  - Lab 2 en `src/labs/lab2/` (errores, raíces generales, precisión numérica, serie 1/n²) (`src/labs/lab2/lab2-1.ts:23-66`, `src/labs/lab2/lab2-7.ts:21-34`).
- **Algoritmos adicionales (Lab 3):** existe un módulo con bisección, regula falsi, Newton-Raphson, iteración y Aitken (`src/algorithms/lab3.ts:47-99`, `src/algorithms/lab3.ts:153-203`, `src/algorithms/lab3.ts:215-345`).

## Tecnologías usadas

- **Bun** como runtime y gestor de ejecución del proyecto (`package.json:5-7`).
- **TypeScript** con configuración estricta, módulos ES y sin emisión de JS (`tsconfig.json:2-14`, `package.json:4`).
- **`prompts`** para construir la interfaz interactiva en terminal (`package.json:8-10`, `src/core/input.ts:1`).
- **API de archivos de Node/Bun** (`fs/promises` y `path`) para trabajar con datos JSON (`src/core/files.ts:1-2`, `src/core/files.ts:24-43`).

## Datos

- El proyecto usa la carpeta `data/` para entradas en JSON, y el formato esperado es un objeto con la clave `numeros` (`README.md:36-48`, `src/core/files.ts:41-44`).
