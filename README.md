# Laboratorios de Metodos Computacionales (Bun + TypeScript)

Programa de consola (TUI) para resolver ejercicios de los laboratorios 1, 2 y 4.
Todas las ejecuciones muestran el tiempo con formato:

`Tiempo de ejecuccion: 2.340000 ms`

## 1) Requisitos e instalacion

### Instalar Bun.js

Instala Bun desde la guia oficial:

- https://bun.sh/docs/installation

Verifica instalacion:

```bash
bun --version
```

## 2) Ejecutar el programa

Instalar dependencias:

```bash
bun install
```

Iniciar la TUI:

```bash
bun run start
```

## 3) Estructura de datos para archivos JSON

Algunos ejercicios leen datos desde archivos JSON en la carpeta `data/`.

- Carpeta requerida: `data/`
- El programa pide solo el nombre del archivo (por ejemplo: `lab1-2.json`)
- Formato base del JSON:

```json
{
  "numeros": [1, 2, 3]
}
```

## 4) Ejercicios implementados

### Laboratorio 1

- **1) Suma de valores (0..255)**
  - Primero pregunta cuantos numeros se van a sumar.
  - Si son `9 o menos`, se ingresan por consola.
  - Si son `mas de 9`, se solicita archivo JSON en `data/`.
  - En archivo, `numeros` debe tener exactamente la cantidad indicada.
  - Todos los valores deben ser enteros en el rango `0..255`.

- **2) Suma de pares de 200 numeros positivos**
  - Solo acepta archivo JSON (no entrada manual).
  - `numeros` debe tener exactamente `200` valores.
  - Todos deben ser enteros positivos (`> 0`).

- **3) N primeros numeros de Fibonacci**
  - Entrada por consola: `N` entero positivo.

- **4) Raices de 3*x^2 + 2*x - 1 = 0**
  - Sin archivo; calcula y muestra raices.

- **5) Calculo de e por serie**
  - Entrada por consola: `N` entero positivo.
  - Usa: `e = 1 + 1/1! + 1/2! + ... + 1/N!`.

- **6) Calculo de pi por serie de Taylor (Leibniz)**
  - Entrada por consola: `N` entero positivo (numero de terminos).
  - Usa: `pi = 4 * (1 - 1/3 + 1/5 - 1/7 + ...)`.

### Laboratorio 2

- **1) Digitos correctos en pi/e (pi y e redondeados a 6 decimales)**
  - Sin archivo.

- **3) Raices de ax^2 + bx + c**
  - Entrada por consola: `a`, `b`, `c`.
  - `a` no puede ser `0`.

- **4) Comparacion de errores relativos**
  - Entrada por consola: `N` (m), `M` (mm), `X` (km), `Y` (m).

- **6) Sumas repetidas y precision**
  - Sin archivo.
  - Suma 100000 veces:
    - `1` con precision simple (Float32)
    - `0.00001` con precision simple (Float32)
    - `0.00001` con precision doble (`number`)

- **7) Serie sum(1/n^2) en orden ascendente y descendente**
  - Entrada por consola: `m` entero positivo.

### Laboratorio 4

- **1) Eliminacion de Gauss**
  - Entrada por consola: dimension `n`, matriz `A` y vector `b`.
  - Usa pivoteo parcial.
  - Permite redondeo opcional por cifras significativas.
  - Muestra solucion y residuo `Ax - b`.

- **2) Gauss-Jordan**
  - Entrada por consola: dimension `n`, matriz `A` y vector `b`.
  - Resuelve por reduccion completa de la matriz aumentada.
  - Muestra solucion y residuo `Ax - b`.

- **3) Descomposicion LU**
  - Entrada por consola: dimension `n`, matriz `A` y vector `b`.
  - Usa factorizacion `PA = LU` con pivoteo parcial.
  - Muestra `L`, `U`, `P`, solucion y residuo `Ax - b`.

- **4) Gauss-Seidel**
  - Entrada por consola: dimension `n`, matriz `A`, vector `b`, vector inicial `x0`, tolerancia y maximo de iteraciones.
  - Requiere dominancia diagonal estricta para garantizar convergencia.
  - Muestra historial de iteraciones, solucion aproximada y residuo.

- **5) Fadeev-Leverrier**
  - Entrada por consola: dimension `n` y matriz `A`.
  - Calcula coeficientes del polinomio caracteristico.
  - Para matrices `3x3`, tambien calcula autovalores y un autovector por cada autovalor distinto.

- **6) Metodo de las potencias**
  - Entrada por consola: dimension `n`, matriz `A`, vector inicial `x0` y criterio de parada.
  - Permite trabajar por tolerancia o por cantidad fija de iteraciones.
  - Muestra autovalor dominante, autovector dominante e historial iterativo.

## 5) Ejemplos JSON

### Ejemplo para Lab 1 - Ejercicio 1 (cuando N > 9)

Archivo `data/lab1-1.json`:

```json
{
  "numeros": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}
```

### Ejemplo para Lab 1 - Ejercicio 2

Archivo `data/lab1-2.json` debe contener exactamente 200 enteros positivos:

```json
{
  "numeros": [1, 2, 3, 4, 5]
}
```

Nota: el ejemplo anterior muestra formato, pero para ejecutar Lab1-2 se requieren 200 valores.
