# Laboratorios de Metodos Computacionales (Bun + TypeScript)

Programa de consola (TUI) para resolver ejercicios de los laboratorios 1, 2, 3, 4, 5, 6 y 7.
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

### Laboratorio 3

- **1) Raices de ecuaciones**
  - Se presenta como un unico ejercicio dividido en 3 partes.

- **Parte 1: Metodo grafico**
  - Entrada por consola: `f(x)`, `x_lower`, `x_upper`, cantidad de muestras.
  - Muestra una vista ASCII en consola.
  - Genera un PNG en `outputs/plots/` y lo abre automaticamente.
  - Formato de funcion aceptado: JS/TS.
  - Ejemplos: `x**2 - 4`, `Math.sin(x)`, `sin(x)`, `exp(x) - 3*x`.

- **Parte 2: Metodo de tanteo**
  - Entrada por consola: `f(x)`, `x_lower`, `x_upper`, incremento.
  - Devuelve los intervalos donde la funcion cambia de signo.

- **Parte 3: Metodos de aproximacion de raices**
  - Metodos disponibles:
    - Biseccion
    - Interpolacion lineal (Regula Falsi)
    - Newton-Raphson
    - Iteracion
    - Iteracion con aceleracion de Aitken
  - Entrada por consola:
    - `f(x)` para todos los metodos.
    - `g(x)` para Iteracion y Iteracion con Aitken.
    - tolerancia, iteraciones maximas y aproximacion inicial.
    - `x_lower` y `x_upper` para todos excepto Newton-Raphson.
  - Durante el calculo se imprime por iteracion:
    - aproximacion obtenida
    - error relativo
    - `x_lower` y `x_upper` cuando el metodo usa intervalo

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

### Laboratorio 5

- **1) Newton-Gregory Ascendente**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y`, valor `x` objetivo y referencia opcional.
  - Requiere nodos equidistantes.
  - Muestra tabla ingresada, tabla de diferencias hacia adelante y valor interpolado.

- **2) Newton-Gregory Descendente**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y`, valor `x` objetivo y referencia opcional.
  - Requiere nodos equidistantes.
  - Muestra tabla ingresada, tabla de diferencias hacia atras y valor interpolado.

- **3) Interpolacion Inversa Lineal**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y`, valor `y` objetivo y referencia opcional.
  - Selecciona automaticamente 2 puntos cercanos al `y` objetivo.
  - Muestra la tabla ingresada, los puntos usados y el valor estimado de `x`.

- **4) Interpolacion Inversa Cuadratica**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y`, valor `y` objetivo y referencia opcional.
  - Requiere al menos 3 puntos.
  - Selecciona automaticamente 3 puntos cercanos al `y` objetivo.
  - Muestra la tabla ingresada, los puntos usados y el valor estimado de `x`.

- **5) Lagrange**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y`, valor `x` objetivo y referencia opcional.
  - Soporta nodos no necesariamente equidistantes.
  - Muestra la tabla ingresada y el valor interpolado.

- **6) Interpolacion parabolica progresiva**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y`, valor `x` objetivo y referencia opcional.
  - Usa 3 puntos consecutivos equidistantes.
  - Muestra tabla ingresada, puntos usados, tabla de diferencias y valor interpolado.

### Laboratorio 6

- **1) Construir tabla de diferencias**
  - Entrada por consola: tipo de tabla, cantidad de puntos y vectores `x` e `y`.
  - Muestra la tabla ingresada y la tabla de diferencias finitas generada.

- **2) Derivacion por Newton-Gregory Ascendente**
  - Entrada por consola: orden de derivada, cantidad de puntos, vectores `x` e `y`, valor `x` objetivo y referencia opcional.
  - Requiere nodos equidistantes.
  - Muestra tabla ingresada, tabla de diferencias, formula aplicada y derivada aproximada.

- **3) Derivacion por Newton-Gregory Descendente**
  - Entrada por consola: orden de derivada, cantidad de puntos, vectores `x` e `y`, valor `x` objetivo y referencia opcional.
  - Requiere nodos equidistantes.
  - Muestra tabla ingresada, tabla de diferencias, formula aplicada y derivada aproximada.

- **4) Integracion por Trapecio**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y` y referencia opcional.
  - Usa el rango completo tabulado.
  - Muestra tabla ingresada, formula aplicada, cantidad de subintervalos e integral aproximada.

- **5) Integracion por Simpson 1/3**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y` y referencia opcional.
  - Requiere nodos equidistantes y una cantidad par de subintervalos.
  - Muestra tabla ingresada, formula aplicada, cantidad de subintervalos e integral aproximada.

- **6) Integracion por Simpson 3/8**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y` y referencia opcional.
  - Requiere nodos equidistantes y una cantidad multiplo de 3 de subintervalos.
  - Muestra tabla ingresada, formula aplicada, cantidad de subintervalos e integral aproximada.

- **7) Integracion combinada**
  - Entrada por consola: cantidad de puntos, vectores `x` e `y` y referencia opcional.
  - Usa el rango completo tabulado y selecciona automaticamente Trapecio, Simpson 1/3 y/o Simpson 3/8 segun la cantidad de subintervalos.
  - Muestra tabla ingresada, formula global, desglose de tramos e integral aproximada.

### Laboratorio 7

- **1) Metodo de Euler**
  - Entrada por consola: `f(x, y)`, `x0`, `y0`, `h`, `xEnd` o cantidad de pasos y solucion exacta opcional.
  - Muestra tabla por paso con `x`, `y`, `y'` y errores si existe solucion exacta.

- **2) Metodo Modificado de Euler**
  - Entrada por consola: `f(x, y)`, `x0`, `y0`, `h`, `xEnd` o cantidad de pasos y solucion exacta opcional.
  - Usa la variante predictor-corrector de Heun.
  - Muestra tabla por paso con predictor, corrector y errores opcionales.

- **3) Runge-Kutta de 2do orden**
  - Entrada por consola: variante (`Punto medio` o `Heun`), `f(x, y)`, `x0`, `y0`, `h`, `xEnd` o cantidad de pasos y solucion exacta opcional.
  - Muestra tabla por paso con `x`, `y`, `y'` y errores si existe solucion exacta.

- **4) Runge-Kutta de 4to orden**
  - Entrada por consola: `f(x, y)`, `x0`, `y0`, `h`, `xEnd` o cantidad de pasos y solucion exacta opcional.
  - Usa la formula clasica de cuarto orden.
  - Muestra tabla por paso con `x`, `y`, `y'` y errores si existe solucion exacta.

- **5) Metodo de Milne**
  - Entrada por consola: `f(x, y)`, `x0`, `y0`, `h`, `xEnd` o cantidad de pasos y solucion exacta opcional.
  - Permite generar automaticamente los valores iniciales con RK4 o ingresarlos manualmente.
  - Requiere al menos `4` pasos para aplicar predictor-corrector.

- **6) Comparacion entre metodos**
  - Entrada por consola: `f(x, y)`, `x0`, `y0`, `h`, `xEnd` o cantidad de pasos y solucion exacta opcional.
  - Compara Euler, Euler modificado, RK2 (punto medio y Heun), RK4 y Milne cuando haya pasos suficientes.
  - Muestra una tabla resumen con valor final, error y tiempo de ejecucion por metodo.

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
