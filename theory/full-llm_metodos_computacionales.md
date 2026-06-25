# Métodos Computacionales / Métodos Numéricos

## 📋 Contexto del documento

**Propósito:** Este documento compila el contenido teórico dictado en la materia *Métodos Computacionales* (también llamada *Métodos Numéricos*) tal como fue presentado en clase. Está pensado para ser compartido con un asistente de IA (LLM) como contexto base, de modo que cualquier alumno pueda hacer preguntas, pedir aclaraciones o repasar los temas con ayuda de IA sin perder fidelidad al contenido de la cátedra.

**Bibliografía principal:**
- Chapra, S. C. y Canale, R. P. (2007). *Métodos Numéricos para Ingenieros*. McGraw-Hill.

---

## Unidad 1: Introducción a los métodos numéricos

### Introducción

Los métodos numéricos o computacionales constituyen técnicas mediante las cuales es posible formular problemas matemáticos de tal forma que puedan resolverse utilizando operaciones aritméticas. *(Chapra y Canale, 2007)*

---

### Fundamentos del uso de los métodos numéricos

Se recurre a métodos numéricos cuando se cumple alguna de estas condiciones:

- La **matemática pura** no provee ningún método analítico deductivo capaz de resolver el problema, o
- Aún existiendo un método analítico (exacto), sea de **aplicación tan compleja y/o extensa** que resulte poco práctico, o
- Que por las **características propias del problema** sea necesario resolverlo mediante el uso de computadoras.

En todos estos casos, es necesario valerse de métodos fuera del campo de la matemática pura:

- **Matemática pura** → soluciones exactas.
- **Métodos Numéricos** → soluciones aproximadas; permiten alcanzar, en la práctica, el grado de aproximación que se desee, sujeto a ciertas condiciones que se estudian caso a caso.

> **Definición — Métodos Aproximados:** Con ellos es posible alcanzar, en la práctica, el grado de aproximación que se desee, con tal de satisfacer ciertas condiciones que en cada caso particular serán estudiadas.

---

### La resolución de problemas

Cuatro etapas fundamentales:

1. Estudio y formulación precisa del problema
2. Desarrollo de un modelo
3. Validación del modelo y análisis de optimización
4. Codificación del modelo en algún lenguaje de programación y procesamiento

#### Etapa 1 — Estudio y formulación precisa del problema

Consiste en el estudio del fenómeno, las variables y parámetros que intervienen en él, las relaciones entre ellos y las probables líneas de solución existentes. Es una etapa crítica: un conocimiento insuficiente o erróneo en esta fase introduce **errores groseros** en el resultado final.

#### Etapa 2 — Desarrollo de un modelo

La ciencia y la técnica se valen de idealizaciones o abstracciones de la realidad para formular analíticamente los problemas.

> **Definición — Modelo:** "Se denomina mediante el vocablo **MODELO** a una **abstracción** de algún fenómeno real, que tiene la posibilidad de emplearse para satisfacer objetivos de comprensión, predicción y control de aquel, con cierto grado de aproximación previamente elegido."

En este curso se utilizan principalmente **modelos matemáticos**.

#### Etapa 3 — Validación y optimización del modelo

Una vez formulado el modelo matemático:

- Debe ser **analizado** para comprobar si describe correctamente el fenómeno, su grado de precisión y complejidad.
- **Optimización:** Tiene por fin reducir el modelo a una forma más simple o breve, aplicando reglas y procedimientos matemáticos y de programación que tiendan a su mejor y más rápido procesamiento.

#### Etapa 4 — Codificación y procesamiento

La mayoría de los modelos matemáticos no son directamente procesables por una computadora. Se debe completar una etapa previa de **programación**: codificar el modelo en algún lenguaje de computación comprensible por el ordenador.

---

### Tipos de problemas abordados

- **Interpolación:** Determinar valores intermedios entre datos relativamente libres de errores (p. ej., información tabulada).
- **Integración:** Determinación del área bajo una curva.
- **Ecuaciones diferenciales ordinarias:** De gran importancia en problemas de ingeniería, estadística y diversas ramas de la ciencia y la técnica.

---

### Algoritmos

> El término **algoritmo** deriva del nombre del matemático árabe del siglo IX **AL-KHUWARIZMI**.

De forma intuitiva, un algoritmo es una receta o conjunto de instrucciones que describe un proceso para llegar a la solución de un problema, generalmente matemático.

#### Definición formal

Para que un conjunto de instrucciones pueda ser considerado un algoritmo matemático, debe poseer las siguientes propiedades:

1. Estar compuesto por un conjunto de **instrucciones** matemáticamente cuantificables o lógicamente ejecutables.
2. Las instrucciones deben estar dadas en un **orden estricto** que permita resolver el problema.
3. Las decisiones lógicas y operaciones aritméticas deben estar **libres de toda ambigüedad**.
4. Poseer un **final cierto**.

> **Definición alternativa:** "Un algoritmo es un procedimiento que describe de manera inambigua una sucesión de pasos finita que se lleva a cabo en un orden específico." Su objetivo es implementar un procedimiento numérico para resolver un problema o aproximar su solución. Para describir un algoritmo se usa **pseudocódigo**, que especifica la forma de la entrada y la forma de la salida deseada.

> 💡 **Flashcard — Algoritmo: Definición**
> **P:** ¿Qué es un algoritmo y qué 4 propiedades debe cumplir?

#### Tipos de algoritmos

| Tipo | Definición |
|------|-----------|
| **Directo** | El resultado final se alcanza después de un número **fijo y determinado** de pasos conocidos de antemano. |
| **Indirecto** | El resultado final se alcanza luego de procesar un número de pasos **desconocido de antemano**. Partes del algoritmo pueden repetirse una cantidad variable de veces. |
| **Infinito** | El resultado final **no es alcanzado jamás** en un número finito de pasos. Para ser útil, debe producir **aproximaciones intermedias** cada vez más precisas a medida que avanza el procesamiento. |

**Paso elemental:** constituido por alguna de las primeras y más simples operaciones aritméticas (adición, sustracción, multiplicación, división) junto con las de comparación (mayor, igual, menor).

**Ejemplo — Algoritmo directo:** Resolver una ecuación de primer grado $a \cdot x + b = 0$ requiere un número fijo y conocido de pasos.

> 💡 **Flashcard — Tipos de algoritmos**
> **P:** ¿Cuáles son los 3 tipos de algoritmos y en qué se diferencian?

#### Algoritmos y pseudocódigo

El pseudocódigo es la herramienta estándar para describir algoritmos. Convenciones usadas en la materia:

- El punto `.` indica la terminación de un paso.
- El punto y coma `;` separa tareas dentro de un paso.
- La indentación y el sangrado indican que un grupo de instrucciones se trata como una sola entidad.

**Técnicas de ciclo (looping):**

- Controlado por **contador:**
  ```
  Para i = 1, 2, ..., n
    Sea xᵢ = a + aᵢ · h
  ```
- Controlado por **condición:**
  ```
  Mientras sea i < N realizar los pasos 3-6
  ```

**Ejecución condicional:**
```
Si ... Entonces
Si ... Entonces / de lo contrario
```

---

### Formas de resolución de problemas

| Categoría | Subcategorías |
|-----------|--------------|
| **Modelos exactos** | Provistos por la matemática pura |
| **Modelos aproximados** | Gráficos / Numéricos |

**Métodos numéricos aproximados:**

- **Métodos de enumeración:** Resuelven problemas combinatorios con bajo número de soluciones posibles, estudiando sistemática y exhaustivamente todas ellas.
- **Métodos por tanteos:** Búsqueda de soluciones por prueba y error sistemático.
- **Métodos de discretización:** Dividen el dominio continuo del problema en una malla o grilla de puntos discretos.
- **Métodos de simulación:** Modelan el comportamiento de un sistema real mediante experimentos computacionales.
- **Métodos iterativos:** Generan sucesivas aproximaciones a la solución (ver sección siguiente).

**Métodos gráficos:**
- A través de dibujos realizados con precisión y en escala se obtienen resultados.
- Las escalas pueden ser decimales, logarítmicas o mixtas. Ejemplo: $y = c \cdot x^n$ se representa como una recta en escala logarítmica.
- **Ventajas:** Rápida solución. **Desventajas:** Poca precisión.

> 💡 **Flashcard — Formas de resolución de problemas**
> **P:** ¿Cuáles son los 5 tipos de métodos numéricos aproximados?

---

### Métodos iterativos

Etapas del proceso iterativo:

1. **Elaboración del algoritmo**, que en general puede expresarse como una ecuación: $x = f(x)$
2. **Adoptar una solución inicial** $x_0$: producto de una elección arbitraria, estimación o medición.
3. **Aplicar la ecuación** haciendo $x = x_0$, obteniendo un valor mejorado $x_1$.
4. **Parada artificial o programada** (criterio de corte).

Iterando, se obtiene una sucesión de aproximaciones:

$$x_0 \rightarrow x_1 = f(x_0) \rightarrow x_2 = f(x_1) \rightarrow \dots \rightarrow x_{k+1} = f(x_k)$$

Cada iteración se denomina **paso** y el resultado es una **aproximación**.

**Recursión vs. Iteración:**
- **Recursión:** técnica de definir una función en términos de sí misma.
- Ejemplo — Factorial: $n! = n \cdot (n-1)!$ con $n > 0$ y $0! = 1$

---

### Convergencia

#### Definición

Sea $v$ la solución correcta de un problema y $x_1, x_2, \ldots, x_k$ las aproximaciones sucesivas obtenidas en los pasos $1, 2, \ldots, k$.

> **Definición — Límite y convergencia:** "Si dado un número $E$ positivo y arbitrario, por pequeño que sea, es posible encontrar un número $d = d(E)$ tal que, para todo $k > d$, resulta que:
> $$\left| x_k - v \right| < E$$
> entonces se dice que la sucesión $x_1, x_2, \ldots, x_k$ tiende al límite $v$ cuando $k \to \infty$."

> **Definición — Procesos convergentes:** "Los procesos algorítmicos o iterativos que generan sucesiones de números, como resultado de aproximaciones sucesivas que cumplen con la definición de límite dada, se denominan **CONVERGENTES**."

- **Convergencia:** grado de discrepancia entre la solución aproximada y la real.
- **Grado de convergencia:** velocidad de aproximación a la solución.

Para que un proceso iterativo sea útil, debe acercarse al verdadero valor mediante aproximaciones sucesivas. No existen reglas generales sobre el número de iteraciones necesarias; cada caso particular debe ser analizado.

> 💡 **Flashcard — Convergencia**
> **P:** ¿Qué significa que un proceso iterativo es convergente?

---

### Software y métodos numéricos

Dos enfoques posibles:

1. **Usar paquetes disponibles** (comerciales o libres) que contienen métodos numéricos implementados.
   - Su uso eficiente requiere buen entendimiento de la teoría base.
   - Herramientas: MATLAB, Mathematica, Excel, Scilab, Octave.
   - Biblioteca *Numerical Recipes*: gran variedad de algoritmos en Fortran y C → http://www.nr.com

2. **Diseñar programas propios**, conociendo los métodos numéricos y la programación.
   - Lenguajes: Java, C, C++, entre otros.

---

### Métodos de representación de algoritmos

- Se debe utilizar algún método que permita independizar el algoritmo de los lenguajes de programación.
- Los métodos usuales para representar un algoritmo son:
  - Diagrama de flujo
  - Lenguaje de especificación de algoritmo: pseudocódigo
  - Lenguaje natural: español, inglés,...
  - Fórmulas matemáticas.

#### Pseudocódigo

- Es un lenguaje de especificación (descripción) de algoritmos, que facilita el paso a la codificación o traducción a un lenguaje de programación.
- Se considera un primer borrador del programa
- Un pseudocódigo no puede ser ejecutado por una computadora directamente (aunque existen algunas herramientas).

---

## Unidad 2: Aproximaciones y Error

### Introducción

- La aritmética realizada por una computadora es diferente de la que se utiliza en el Álgebra y en el Cálculo.
- Matemática tradicional: números con una cantidad infinita de cifras.
- Por ej: √3 : Como el nro. positivo único que cuando se multiplica por sí mismo produce el entero 3.
- Computación digital: la representación de todo nro. tiene un nro. finito, fijo de cifras.

---

- Los números utilizados en los distintos algoritmos son números reales o complejos, y son concebidos como fracciones decimales infinitas.
- Con fines computacionales: Deben aproximarse mediante otra forma de números, conocidos como **FRACCIONES TERMINALES FINITAS**, que tienen un número finito de cifras decimales.
- Se introducen entonces situaciones diversas. Que:
  - **Producen** diferencias entre los resultados verdaderos, obtenidos del sistema real y aquellos derivados del cálculo, mediante la aplicación de algún método numérico o computacional sobre un modelo matemático determinado.

---

- La eficiencia en el cálculo de la solución numérica
  - Depende de:
    - **la facilidad de implementación del algoritmo**
    - **de las características especiales y limitaciones de los instrumentos de cálculo (las computadoras).**
  - **Solo un subconjunto relativamente pequeño, del sistema de los nros. reales se usa para representar todos los nros reales**
  - **Este contiene solo números racionales, positivos y negativos.**
- En gral, al emplear estos instrumentos de cálculo se introducen:
  - **ERRORES**: diferencias inevitables en toda aplicación numérica y que, se propagan a lo largo del resto del proceso de cálculo.
  - **Objetivo**: Estudio de los errores y su influencia a lo largo del procesamiento.

> 💡 **Flashcard — La solución numérica**
> **P:** ¿De qué depende la eficiencia en el calculo de la solución numérica?
### Números exactos y aproximados

- Clasificación al efecto del cálculo numérico o aproximado:
  - CONSTANTES
    - Absolutas
    - Relativas
  - VARIABLES
  - NÚMEROS EXACTOS: (enteros o decimales)
    - No sufren modificación POR CAUSAS OPERATIVAS al ser utilizados como parámetros o variables de algún modelo matemático.
    - Ej. Enteros cortos (2 bytes o 16 bits); enteros largos y reales de simple precisión (4 bytes o 32 bits); reales doble precisión (8 bytes o 64 BITS)
    - Rango de variación de enteros cortos: $(-2^{15}; 2^{15} - 1)$
    - Rango de variación de enteros largos: $(-2^{31}; 2^{31} - 1)$

---

- Causas operativas:
  - Producidas por el hardware en los casos en que le resulta imposible soportar al número en su totalidad.
  - P.ej.: un nro que necesita más de 64 bits para ser almacenado: $1/3$; $157^{99}$; $e$ Pi; etc.
  - Estos números poseen infinitas cifras decimales o al menos son muy grandes.
  - La máquina es quien intrínsecamente produce el error.
  - Causa de errores en computadora: Diferencia que inevitablemente existe entre un número a representar y su real representación en la computadora.
  - La mayor parte de los números que se utilizan en una computadora no son exactos.
  - La representación de los mismos no es continua

### Errores en los Cálculos Científicos

**Clasificación de los errores**

- Definición: "Se denomina con el término genérico de error, a la diferencia que existe entre el valor verdadero de una magnitud determinada y otro valor aproximado de ella."
  - $E = X_v - X_c$

> 💡 **Flashcard — Error: definición**
> **P:** Definición de error.

- Causas de ERROR:
  - Aproximación Matemática forzada a la realidad física:
    - ABSTRACCIÓN
    - INHERENCIA
  - Imposibilidad de realizar el cálculo en forma exacta
    - TRUNCAMIENTO (Modificación de la solución respecto de su formulación)
    - REDONDEO (Falta de exactitud en las operaciones aritméticas elementales.)

> 💡 **Flashcard — Error: causas**
> **P:** Causas de error (2).

- La resolución de un problema pasa por etapas
- Todas ellas aportan al error

1. ABSTRACCIÓN

- Diferencia entre el fenómeno real o verdadero (sistema) y su descripción analítica simplificada (modelo)
- Son introducidos por una única vez, al principio del procesamiento.

2. INHERENCIA:

- Datos introducidos desde el comienzo del procesamiento del modelo.
- Las diferencias existentes entre los datos de entrada o parámetros, respecto de sus verdaderos valores
- Generalmente son desconocidos, puede determinarse un máximo valor estimativo denominado COTA DE ERROR.
- Son inevitables desde todo punto de vista y se introducen por única vez al principio del procesamiento del modelo matemático.

3. TRUNCAMIENTO:

- Se producen a lo largo del procesamiento.
- Causados por la diferencia por despreciar en el desarrollo de una serie infinita, los términos de orden $n+1$ en adelante.
- Se disminuye incrementando el nro. de iteraciones.
- La magnitud del error depende del tamaño que se establezca para el incremento (h o $\Delta x$).
- Se expresan los errores en función de los incrementos: $E \approx (h^n)$.
- El error máximo cometido (o cota del error) es del orden de $h^n$, $\rightarrow E$ nunca será $>$ que el valor absoluto de $h^n$.

---

**Error del método:**

Debido a la aproximación de las ecuaciones, funciones, ... para evaluarlas mediante operaciones aritméticas elementales (sumas, restas, multiplicaciones, divisiones).

**Ejemplo:** $e^x = 1 + x + \frac{x^2}{2} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} + \dots = \sum_{i=0}^{\infty} \frac{x^i}{i!}$ (Método Exacto)

(Método Numérico) $e^x = 1 + x + \frac{x^2}{2} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} = \sum_{i=0}^{n} \frac{x^i}{i!}$

---

Error del método: $R_x(x) = \sum_{i=n+1}^{\infty} \frac{x^i}{i!} = \frac{x^{(n+1)}}{(n+1)!} e^z$

---

4. REDONDEO:
  - Proviene del modo en que los números son tratados.
  - Manual: Cálculos realizados con números racionales, expresados en notación decimal.
  - Por computadora: Se valen de la notación científica.
  - Se soporta un número determinado de cifras significativas.
  - Producido por la limitación de los números a una cierta cantidad de dígitos significativos.
  - Sólo puede ser minimizado mediante el uso de una mayor cantidad de dígitos decimales en los cálculos.

> 💡 **Flashcard — Error: clasificación**
> **P:** Clasificación de los errores.

---

- Los resultados de muchas operaciones aritméticas tienen más cifras de las que se puede almacenar y hay que aproximarlos eliminando las cifras menos significativas. A este proceso se llama "redondeo".
- Los errores de redondeo son inevitables, pero controlables:
  - En muchas ocasiones son poco significativos y no tienen ninguna importancia.
  - Sin embargo, en algunos problemas pueden llegar a destruir por completo el significado de un resultado. Conviene detectar estos casos y tomar las medidas adecuadas.
  - Unos errores de redondeo catastróficos pueden ser consecuencia de un problema difícil, de un mal algoritmo, o de ambas cosas a la vez.

### Errores de redondeo y Aritmética de computadoras

- El uso de dígitos binarios tiende a encubrir las dificultades de cálculo que ocurren cuando se usa un conjunto finito de nros de máquina para representar a todos los nros reales.
- Para explicar los problemas que pueden surgir, se considera que los nros de máquina se representan en la forma de punto flotante decimal normalizada.
- En una PC no se pueden poner infinitos dígitos. Se trabaja solo con números de desarrollo finito y de una longitud dada.
- Se toma como standard la representación denominada normalizada, que consiste en que la mantisa no tiene parte entera y el primer dígito a la derecha del punto decimal es significativo (distinto de cero), salvo en la representación del número 0. Ej. 0,3 x 10 -4

> 💡 **Flashcard — Representación de los números**
> **P:** ¿Cómo se representan los números en máquina?

---

En consecuencia los números de máquina decimales con $k$ dígitos serán de la forma:

$$
\pm 0.d_1 d_2 \dots d_k \times 10^n, \quad 1 \leq d_1 \leq 9,
$$

$$
0 \leq d_i \leq 9
$$

Para cada $i = 2, \dots, k$.

$M_1 \leq n \leq M_2$; el exp. $n$ (orden del nro.) estará limitado a cierto rango.

Los números $k$, $M_1$ y $M_2$ dependen de la máquina.

---

- Cualquier número real positivo y puede ser normalizado a

$$
y = 0. d_{1} d_{2} \dots d_{k} d_{k+1} d_{k+2} \dots \times 10^{n}.
$$

Si $\mathbf{y}$ está dentro del rango numérico de la máquina, la forma de punto flotante de $\mathbf{y}$, que se representará por $\mathrm{fl}(\mathbf{y})$, se obtiene terminando la mantisa de $\mathbf{y}$ en $k$ cifras decimales.

Existen dos formas de llevar a cabo tal terminación.

---

Método 1) Un método es simplemente cortar los dígitos $d_{k+1}$, $d_{k+2}$. ... y se obtiene:

$$
fl(y) = 0. d_{1} d_{2} \dots d_{k} \times 10^{n}.
$$

Este método es bastante preciso y se llama truncar el número.

---

- Método 2) Agregar $5 \times 10^{n-(k+1)}$ a $\pmb{y}$ y después truncar para que resulte un número de la forma:

$$
fl(y) = 0. \delta_1 \delta_2 \dots \delta_k \times 10^n.
$$

- Este último método comúnmente se designa por redondeo del número.
- Si $d_{k+1} \geq 5$, se agrega 1 a $d_k$ para obtener $fl(y)$; esto es, redondeamos hacia arriba.
- Si $d_{k+1} < 5$, simplemente se trunca luego de los primeros $k$ dígitos; se redondea así hacia abajo.

---

- EJEMPLO 1: El número $pi(n)$ tiene un desarrollo decimal infinito de la forma $n = 3.14159265\ldots$.
- Escrito en forma decimal normalizada, se tiene:

$$
\pi = 0.314159265\dots
$$

Método 1) La forma de punto flotante de cinco dígitos de n utilizando truncamiento es:

$$
fl(\pi) = 0.31415 \times 10^1 = 3.1415
$$

Método 2) Dado que el sexto dígito de la expansión decimal de n es 9, la forma de n con redondeo a cinco dígitos es:

$$
fl(\pi) = (0.31415 + 0.00001) \times 10^1 = 3.1416 \quad D_{k+1} \geq 5
$$

---

- El error que resulta al reemplazar un número, por su forma de punto flotante, se llama **error de redondeo** (sin que importe si se usa el método de redondeo o de truncamiento).
- Como medir los errores de aproximación: *Definiciones:*
  - Si $p^*$ es una aproximación a $p$,
  - El **error absoluto** $(E_a)$ es: $|p - p^*|$.
  - El **error relativo** $(E_r)$ es: $\frac{|p - p^*|}{|p|}$ siempre que $p \neq 0$.
  - Este error permite normalizar el error respecto al valor verdadero.
$$
\text{Error porcentual} = \frac{|p - p^*|}{|p|} \cdot 100\% = E_p
$$

> 💡 **Flashcard — Errores de redondeo**
> **P:** Error absoluto, relativo y porcentual.

---

- Considere los errores absoluto y relativo al representar $p$ por $p^*$ en el siguiente ejemplo.

|  p | p *  |
| --- | --- |
|  0.3000 × 10^{1} | 0.3100 × 10^{1}  |
|  0.3000 × 10^{-3} | 0.3100 × 10^{-3}  |
|  0.3000 × 10^{4} | 0.3100 × 10^{4}  |

Analize los errores obtenidos!!

---


|  p | p * | Absoluto | Relativo  |
| --- | --- | --- | --- |
|  $0.3000 \times 10^{1}$ | $0.3100 \times 10^{1}$ |  |   |
|  $0.3000 \times 10^{-3}$ | $0.3100 \times 10^{-3}$ |  |   |
|  $0.3000 \times 10^{4}$ | $0.3100 \times 10^{4}$ |  |   |

---


|  p | p * | Absoluto | Relativo  |
| --- | --- | --- | --- |
|  $0.3000 \times 10^{1}$ | $0.3100 \times 10^{1}$ | 0.1 | $0.3333 \times 10^{-1}$  |
|  $0.3000 \times 10^{-3}$ | $0.3100 \times 10^{-3}$ | $0.1 \times 10^{-4}$ | $0.3333 \times 10^{-1}$  |
|  $0.3000 \times 10^{4}$ | $0.3100 \times 10^{4}$ | $0.1 \times 10^{3}$ | $0.3333 \times 10^{-1}$.  |

El error relativo es una medida de mayor significación.

El error absoluto puede ser puesto en 2do. termino

---

Representación de los números en la máquina:

la de punto flotante fl(y) de un número y tiene el error relativo

$$
\left| \frac {y - fl(y)}{y} \right|
$$

Si se emplean k cifras decimales y el truncamiento para la representación en la máquina de:

$$
y = 0. d_{1} d_{2} \dots \dots d_{k} d_{k+1} \dots \dots \times 10^{n}
$$

Entonces:

---

$$
\left| \frac {y - fl(y)}{y} \right| \leq \frac {1}{0.1} \times 10^{- k} = 10^{- k + 1}
$$

Cota de error relativo por truncamiento

De manera similar, una Cota para el error relativo cuando se usa aritmética con redondeo a $k$ dígitos es

$$
0.5 \times 10^{- k + 1}.
$$

---

- Además de la representación **imprecisa de números**, la aritmética realizada en una computadora **no es exacta**.
- Las operaciones **aritméticas** generalmente implican manipular dígitos binarios mediante diversos corrimientos u operaciones lógicas.
- Dado que la mecánica real de estas operaciones no tiene que ver con esa representación, es necesario utilizar una aproximación apropiada a la aritmética de computadora.
- La pérdida de precisión debida al error de redondeo puede con frecuencia ser evitada por una cuidadosa serie de operaciones o por una reformulación del problema,
- Se plantea a continuación:

---

- Considere que la representación de punto flotante $f(x)$ y $f(y)$ esté dada para los números reales $x$ e $y$, y que los símbolos $+$, $-, $	imes$, $/$, representan las operaciones de adición, sustracción, multiplicación y división de máquina o en la computadora, respectivamente.
- Supondremos una aritmética con un nro. finito de cifras dadas por
$$
\begin{array}{l}
x + y = f(f(x) + f(y)), \quad x * y = f(f(x) * f(y)), \\
x - y = f(f(x) - f(y)), \quad x / y = f(f(x) / f(y))
\end{array}
$$
Esto corresponde a realizar aritmética exacta con las representaciones de punto flotante de $x$ e $y$; para luego convertir el resultado exacto a su representación de pto. flotante con un nro. finito de cifras.

---

- EJEMPLO: Dado que $x = 1/3$, $y = 5/7$, y que se utiliza truncamiento de cinco cifras para los cálculos aritméticos donde intervienen $x$ y $y$. La Tabla da los valores de las operaciones en computadora con

$$
fl(x) = 0.33333 \times 10^0 \quad fl(y) = 0.71428 \times 10^0
$$

|  Operación | Resultado | Valor Real  |
| --- | --- | --- |
|  x+y | 0,10476*10^1 | 22/21  |
|  y-x | 0,38095*10^0 | 8/21  |
|  x*y | 0,23809*10^0 | 5/21  |
|  y/x | 0,21428*10^1 | 15/7  |

---

$$
fl(x) = 0.33333 \times 10^0 \quad fl(y) = 0.71428 \times 10^0
$$

|  Operación | Resultado | Valor Real | Error Absoluto | Error Relativo  |
| --- | --- | --- | --- | --- |
|  x+y | 0,10476*10^1 | 22/21 |  |   |
|  y-x | 0,38095*10^0 | 8/21 |  |   |
|  x*y | 0,23809*10^0 | 5/21 |  |   |
|  y/x | 0,21428*10^1 | 15/7 |  |   |

---

$$
fl(x) = 0.33333 \times 10^0 \quad fl(y) = 0.71428 \times 10^0
$$

|  Operación | Resultado | Valor Real | Error Absoluto | Error Relativo  |
| --- | --- | --- | --- | --- |
|  x+y | 0,10476*10^1 | 22/21 | 0,190*10^-4 | 0,182*10^-4  |
|  y-x | 0,38095*10^0 | 8/21 | 0,238*10^-5 | 0,625*10^-5  |
|  x*y | 0,23809*10^0 | 5/21 | 0,524*10^-5 | 0,220*10^-4  |
|  y/x | 0,21428*10^1 | 15/7 | 0,571*10^-4 | 0,267*10^-4  |

- Nótese que el máximo error relativo para las operaciones en el ejemplo es $0.267 \times 10^{-4}$, \rightarrow la aritmética produce resultados satisfactorios a cinco dígitos. (cifras significativas 1) (cifras significativas 2)

---

Si se tiene.  $u = 0.714251$,  $v = 98765.9$,  $w = 0.11111 \times 10^{-4}$ de tal forma que

$$
fl(u) = 0.71415 \times 10^0
$$

Se muestran algunos problemas que pueden surgir con la aritmética cuando se tiene una cantidad finita de cifras.

$$
fl(v) = 0.98765 \times 10^5
$$

$$
fl(w) = 0.11111 \times 10^{-4}
$$

---

|  Operac. | Resultado | Valor real | Error absoluto | Error relativo  |
| --- | --- | --- | --- | --- |
|  y-u | 0.30000 X 10^{-4} | 0.34714 X 10^{-4} |  |   |
|  (y-u)/w | 0.27000 X 10^{1} | 0.31243 X 10^{1} |  |   |
|  (y-u)*v | 0.29629 X 10^{1} | 0.34285 X 10^{1} |  |   |
|  u+v | 0.98765 X 10^{5} | 0.98766 X 10^{5} |  |   |

---

|  Operac. | Resultado | Valor real | Error absoluto | Error relativo  |
| --- | --- | --- | --- | --- |
|  y-u | 0.30000 X 10^{-4} | 0.34714 X 10^{-4} | 0.471 X 10^{-5} | 0.136  |
|  (y-u)/w | 0.27000 X 10^{1} | 0.31243 X 10^{1} | 0.424 | 0.136  |
|  (y-u)*v | 0.29629 X 10^{1} | 0.34285 X 10^{1} | 0.465 | 0.136  |
|  u+v | 0.98765 X 10^{5} | 0.98766 X 10^{5} | 0.161 X 10^{1} | 0.163 X 10^{-4}  |

- En particular, $u + v$ nos dice que si se tiene que sumar varios nros $x_1, x_2, \ldots, x_N$ conviene hacerlo de menor a mayor (¿Por qué?).
- La pérdida de precisión debida al error de redondeo puede ser evitada con frecuencia por una cuidadosa serie de operaciones o por una reformulación del problema.

### Cancelación de cifras significativas

- Uno de los cálculos más comunes que producen errores es debido a la resta de números casi iguales.
- Suponga que dos números casi iguales $x$ e $y$, con $x > y$, con representaciones de $k$ cifras

$$
fl(x) = 0. d_1 d_2 \dots d_p \alpha_{p+1} \alpha_{p+2} \dots \alpha_k \times 10^n
$$

y

$$
fl(y) = 0. d_1 d_2 \dots d_p \beta_{p+1} \beta_{p+2} \dots \beta_k \times 10^n,
$$

La forma de punto flotante de $x-y$ es:

$$
fl(fl(x) - fl(y)) = 0. \sigma_{p+1} \sigma_{p+2} \dots \sigma_k \times 10^{n-p},
$$

donde

$$
0. \sigma_{p+1} \sigma_{p+2} \dots \sigma_k = 0. \alpha_{p+1} \alpha_{p+2} \dots \alpha_k - 0. \beta_{p+1} \beta_{p+2} \dots \beta_k
$$

---

- El nro. de pto. flotante utilizado para representar la diferencia $x-y$, tiene a lo sumo: $k-p$ cifras significativas
- La mayor parte de las computadoras a $x-y$ le asignarán $k$ cifras \rightarrow las últimas $p$ se anularán o serán asignadas al azar.
- Así en los cálculos posteriores con $x-y$ se tendrá el problema de contar con $k-p$ cifras significativas
- Si una representación con un número finito de cifras o un cálculo introduce error \rightarrow este aumenta al dividir entre un nro. con magnitud pequeña
- Multiplicación: el error aumenta en forma equivalente al multiplicar dicho error por un nro. con magnitud grande.

---

Sean $p = 0.54617$ y $q = 0.54601$. El valor exacto de la resta $R = p - q$ es = 0.00016.

1) Si la resta se realiza con aritmética a 4 cifras.
1) Redondear p y q. Hallar el error relativo de la resta.
2) Truncar, realizar la resta y obtener el error relativo.

Analizar si se pierde precisión en dichos cálculos.

---

**Valores redondeados**

P = 0.5462
P = 0.54617 + 0.00005 = 0.54622 a 4
dígitos es 0.5462

Q = 0.5460
Q = 0.5460 + 0.00005 = 0.54605 a 4
dígitos es 0.5460

R = 0.5462 - 0.5460 = 0.0002
(con valores redondeados)

Er = $\frac{0.00016 - 0.0002}{0.00016} = -0.25$

---

- b) Trabajar con aritmética con 4 dígitos, truncar P y Q, restar y hallar el Error relativo de dicha recta
- Valores truncados
- P = 0.5461    Q = .5460
- R = 0.5461 - 0.5460 = 0.0001 (Con valores truncados)
- Er = 0.00016 - 0.0001 = 0.3750
- 0.00016
- El error relativo en valor absoluto es menor cuando se redondean los valores que intervienen en la resta que cuando se los trunca, por lo que se concluye que con valores truncados se pierde precisión en los resultados.

### Consideraciones aritméticas: Problemas Mal Planteados

- Diferencia de números parecidos o cancelación por resta
- La resta entre números de una magnitud parecida puede hacer perder varias cifras significativas. La solución es tratar de realizar las operaciones de otra forma.
- Un caso común donde esto ocurre es en la determinación de las raíces cuadráticas o parábola usando la fórmula cuadrática:

$$
x_1 \text{ y } x_2 = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

—En los casos donde $b^2 \geq 4ac$, la diferencia en el numerador puede ser muy pequeña. En tales casos la precisión doble reduce el problema. Además se puede usar como alternativa la fórmula:

$$
x_1 \text{ y } x_2 = \frac{-2c}{-b \pm \sqrt{b^2 - 4ac}}
$$

—Para estos casos se cambia la fórmula cuadrática mediante la racionalización del numerador.

---

- Orden de las operaciones de acumulación
- Si se suman primero los términos más pequeños se pierden menos cifras significativas que si se empieza sumando los términos de mayor valor

- Comparaciones
  - Signo de números pequeños: Para saber si un número pequeño es mayor que cero conviene establecer un valor límite (1e-12, por ejemplo) pues los números próximos a cero pueden tener un signo u otro según los errores de redondeo
  - Comparación de números de punto flotante: Nunca se deben comparar con el operador == directamente. Hay que ver si el valor absoluto de su diferencia dividido por el valor absoluto del número es menor que un determinado número pequeño (1e-12, por ejemplo)

---

### Aproximaciones numéricas

#### Estimación de error con métodos iterativos

- En ciertos métodos numéricos se usa una técnica iterativa para calcular resultados.
- Se calcula cada aproximación basada en la anterior.
- Este proceso se efectúa varias veces, esperando obtener cada vez mejores aproximaciones.
- El error se calcula como la diferencia entre la aproximación previa y la actual.
- Se utiliza: Error relativo porcentual aproximado.
  $$
  E_{rp} = \frac{|\text{aproximación actual} - \text{aproximac. anterior}|}{|\text{aproximación actual}|} \times 100
  $$

---

- Los signos de los errores presentados pueden ser positivos o negativos.
- Cuando se realizan cálculos no importa mucho el signo del error, sino más bien que su valor absoluto porcentual sea menor que una tolerancia prefijada $E_s$.
- En tales casos los cálculos se repiten hasta que
  - $|Erp| < E_s$.
- Es conveniente relacionar estos errores con el número de cifras significativas en la aproximación.
- Es posible demostrar (Scarborough, 1966) que si se cumple el criterio se tendrá la seguridad que el resultado es correcto en "al menos n" cifras significativas.
  - $E_s = (0.5 \times 10^{2-n})\%$

---

- La función exponencial, se calcula mediante la serie infinita presentada en Error del Método.
- Así cuanto más términos se le agreguen, la aproximación será cada vez más, una mejor estimación del valor verdadero de $e^x$.
- Empezando con el primer término $e^x = 1$ y agregando término por término estime el valor de $e^{0.5}$.
- Calcule los errores relativos cometidos.
- Agregue términos hasta que el valor absoluto $E_{rp}$ sea menor que un criterio de error preestablecido $E_s$ con tres cifras significativas.

#### El Epsilon de la computadora

- Definición: "Recibe el nombre de EPSILON DE LA COMPUTADORA, y se lo designa con E, a la magnitud del intervalo que media entre el 1 (uno) y el menor numero mayor que 1 (uno), distinguible de 1 (uno), que puede representarse en la memoria de la computadora".
- Esto significa que ningún numero entre 1 y 1+E puede representarse.
- Dado un nro: 1 + α, donde 0 < α < E/2, se redondea a 1,
- si 1 > α > E/2 se redondea a 1+E

> 💡 **Flashcard — El epsilon de la pc**
> **P:**El epsilon de la pc: definición.

#### Error total y propagación de errores

- Errores por redondeo se producen en cada operación aritmética elemental
- Errores por truncamiento son producidos cada vez que en el procesamiento del modelo aparecen procesos iterativos o algoritmos infinitos
- El ERROR TOTAL: se produce por la adición de todas las fuentes de error.
- Varia generalmente a medida que avanza en el desarrollo del modelo \rightarrow Propagación de los errores.

---

- Definición: Supongamos que $E_0$ representa un error inicial y que $\varepsilon(n)$ representa el crecimiento de dicho error después de $n$ operaciones sucesivas.
  - Donde K es una constante independiente de n
  - $| \varepsilon(n)| \approx K_n E_0$ \rightarrow el crecimiento del error es lineal
  - $| \varepsilon(n)| \approx K^n E_0$ \rightarrow el crecimiento es exponencial.
  - Si $K > 1$, entonces un error exponencial crece cuando $n \to \infty$ sin que podamos acotarlo;
  - Si $0 < K < 1$, \rightarrow un error exponencial disminuye a 0 cuando $n \to \infty$

---

- Normalmente es inevitable el crecimiento lineal del error y, cuando k y $E_0$ son pequeños por lo general son aceptables los resultados.
- Se debe evitar el crecimiento exponencial del error, pues el término $k^n$ crece incluso para valores de n relativamente pequeños.
- Esto lleva a imprecisiones inaceptables, sin importar el tamaño de $E_0$.
- Un algoritmo que exhibe un crecimiento lineal del error es estable, pero no un algoritmo con crecimiento exponencial del error.

---

![Gráfico de crecimiento de errores en algoritmos](image_url)
**Variables**
- Eje horizontal: \(n\)
- Eje vertical: \(E_n\)

**Series representadas**
- Serie 1: crecimiento lineal estable
  - Modelo: \(E_n = C n E_0\)
  - Comportamiento: el error aumenta aproximadamente de forma proporcional a \(n\)
- Serie 2: crecimiento exponencial inestable
  - Modelo: \(E_n = C^n E_0\)
  - Comportamiento: el error aumenta cada vez más rápido

**Lectura conceptual**
- Cuando el error crece linealmente, la propagación es más controlada.
- Cuando el error crece exponencialmente, pequeñas perturbaciones iniciales pueden amplificarse rápidamente.
- El segundo caso indica menor estabilidad numérica.

**Idea clave**
La estabilidad de un método no depende solo de cometer error, sino de cómo ese error se propaga al avanzar las iteraciones.

Gráficos de crecimiento de errores en algoritmos.

(Buden y Faires. Pág. 34)

---

- "Todo método numérico, aplicado a un modelo matemático determinado y procesado dentro de cierto intervalo específico, recibe el nombre de ESTABLE si, a pesar del efecto de la propagación de errores, éstos se mantienen acotados dentro de ciertos límites previamente fijados, hasta el momento de completar el procesamiento del modelo y obtener el valor de la solución buscada"

### Cálculo de errores mediante fórmulas diferenciales

Objetivo: Estudiar como los errores en los números pueden propagarse a través de las funciones matemáticas.

- Considérese un modelo en el cual interviene una sola variable independiente, de la forma:

  $$
  y = f(x)
  $$

- Dada una variación $h$ de la variable independiente, se experimenta una variación $k$ en el valor de la función. Si esta es diferenciable, su incremento $k$ se podrá expresar mediante:

  $$
  k = f'(x) h + e h
  $$

---

- donde, es posible considerar que:
  - $x$ : es la verdadera magnitud del valor de entrada,
  - $h$ : es el error inherente de la variable $x$
  - $k$ : es la consecuencia en el resultado, del error $h(1)$, y finalmente
  - $e$ : es un infinitéismo que tiende a cero cuando $h$ tiende a cero.

---

- teniendo en cuenta que $e h$ es un infinitéstimo de orden superior, tanto a $h$ como a $k$, por lo que resulta despreciable.
- el error cometido en el procesamiento de un algoritmo, debido al error inherente de la variable, puede expresarse por:

  $$
  k \cong f'(x) h
  $$

- El valor de $h$ no incluye el error por redondeo que ocasiona el procesamiento del algoritmo.
- Tanto $h$ como $k$, son errores absolutos.

---

- El símbolo de aproximación es debido a que el valor de $k$ no coincide exactamente con el de dy (diferencial de $y$), que es el realmente representado en la expresión anterior.
- El valor de $x$ que se tome tampoco será el verdadero, pues, se desconoce, sabiéndose solamente que está afectado del error $h$.

Propagación del error en una función de una variable:

Planteamiento del Problema:

Dado $\widetilde{x} = 2,5$ con un error $\Delta \widetilde{x} = 0,01$

Estime el error resultante en la función:

$$
f(x) = x^3
$$

---

Dada la ecuación :

$$
\Delta f (\widetilde {x}) \cong \left| f ^{\prime} (\widetilde {x}) \right| \times (x - \widetilde {x})
$$

$$
\Delta f (\widetilde {x}) \cong 3 \times (2, 5) ^{2} \times (0,01) = 0,1875
$$

$$
f (2, 5) = 15,625
$$

$$
f (2, 5) = 15,625 \pm 0,1875
$$

O sea que el valor verdadero se encuentra entre 15,4375 y 15,8125. De hecho, si x fuera realmente 2,49, la función se evaluaría como 15,4382, y x fuera 2,51, el valor de la función sería 15,8132.

Para este caso, el análisis del error de primer orden proporciona una estimación adecuada del error verdadero.

### Fórmula fundamental del cálculo de errores

- Sea una función $y$, derivable y con derivada continua; es decir, diferenciable, y que depende de diversas variables: $x_{1}$; $x_{2}$; ..., $x_{n}$, cada una de las cuales está afectada por cierto error absoluto $h_{1}$; $h_{2}$; ..., $h_{n}$:

  $$
  k \cong \sum_ {i = 1} ^{n} f_{x_{i}} \left(x_{1}; x_{2}; \dots ; x_{n}\right) h_{i}
  $$

- Resulta imposible determinar el signo de c/u de los términos del segundo miembro, se aplica desigualdad triangular y resulta.

  $$
  \left| k \right| \leq \sum_ {i = 1} ^{n} \left| f_{x_{i}} \left(x_{1}; x_{2}; \dots ; x_{n}\right) \right| \cdot \left| h_{i} \right|
  $$

- K error cometido en el procesamiento debido a errores inherentes de las variables

### Propagación del error en una función con varias variables:

**Planteamiento del problema:**

Consideremos el cálculo del volumen $V$ de un cilindro, que se determina mediante la fórmula:

$$
V = \pi r^2 h
$$

donde:
- $r$ es el radio de la base del cilindro (en metros),
- $h$ es la altura del cilindro (en metros).

Supongamos que tenemos las siguientes mediciones con sus respectivos errores:

| Variable | Valor medido | Error absoluto |
|----------|--------------|----------------|
| $r$  | $\tilde{r} = 0.10$ m | $\Delta \tilde{r} = 0.001$ m |
| $h$  | $\tilde{h} = 0.20$ m | $\Delta \tilde{h} = 0.002$ m |

Queremos estimar el error en el volumen $V$ debido a los errores en las mediciones del radio y la altura.

**Cálculo de la propagación del error:**

Utilizamos la fórmula fundamental del cálculo de errores para funciones de varias variables:

$$
\Delta V \approx \left| \frac{\partial V}{\partial r} \right| \Delta \tilde{r} + \left| \frac{\partial V}{\partial h} \right| \Delta \tilde{h}
$$

Primero, calculamos las derivadas parciales de $V$ con respecto a $r$ y $h$:

$$
\frac{\partial V}{\partial r} = 2 \pi r
$$

$$
\frac{\partial V}{\partial h} = \pi r^2
$$

Sustituyendo los valores medidos:

$$
\frac{\partial V}{\partial r} \bigg|_{\tilde{r}, \tilde{h}} = 2 \pi \times 0.10 = 0.2 \pi
$$

$$
\frac{\partial V}{\partial h} \bigg|_{\tilde{r}, \tilde{h}} = \pi \times (0.10)^2 = 0.01 \pi
$$

Ahora, sustituimos estos valores en la fórmula de propagación del error:

$$
\Delta V \approx |0.2 \pi| \times 0.001 + |0.01 \pi| \times 0.002
$$

Calculamos cada término:

1. $|0.2 \pi| \times 0.001 = 0.2 \times 3.1416 \times 0.001 = 0.00062832$ m³
2. $|0.01 \pi| \times 0.002 = 0.01 \times 3.1416 \times 0.002 = 0.000062832$ m³

Sumamos los dos términos para obtener el error total en el volumen:

$$
\Delta V \approx 0.00062832 + 0.000062832 = 0.000691152 \text{ m}^3
$$

**Cálculo del volumen y su error:**

El volumen calculado con los valores medidos es:

$$
\tilde{V} = \pi \times (0.10)^2 \times 0.20 = \pi \times 0.01 \times 0.20 = 0.002 \pi \approx 0.0062832 \text{ m}^3
$$

Por lo tanto, el volumen con su error es:

$$
V = 0.0062832 \pm 0.000691152 \text{ m}^3
$$

Esto significa que el volumen real está entre $0.005592048$ m³ y $0.006974352$ m³.

**Verificación:**

Para verificar estas estimaciones, calculamos los valores extremos del volumen utilizando los valores extremos de las mediciones:

1. Volumen mínimo:
   $$
   V_{\min} = \pi \times (0.10 - 0.001)^2 \times (0.20 - 0.002) = \pi \times 0.099^2 \times 0.198 \approx 0.006035 \text{ m}^3
   $$

2. Volumen máximo:
   $$
   V_{\max} = \pi \times (0.10 + 0.001)^2 \times (0.20 + 0.002) = \pi \times 0.101^2 \times 0.202 \approx 0.006548 \text{ m}^3
   $$

Como puedes ver, los valores extremos exactos caen dentro del intervalo estimado mediante la propagación de primer orden. Esto es esperable, ya que la propagación de primer orden proporciona una cota superior conservadora del error.

### Problema inverso del cálculo de errores
(Isaac)
- Dado el problema del cálculo de errores, cabe hacerse la siguiente pregunta: ¿con qué aproximación deberán tomarse los valores de las variables que intervienen como datos en una determinada función:

  $$
  y = f(x_1; x_2; \dots; x_n)
  $$

- para que esta sea calculada con un error menor o igual a una cantidad arbitraria, fijada de antemano?
- Este es un problema que se resuelve mediante la aplicación de la fórmula fundamental del cálculo de errores

### Estabilidad y condición

- La condición de un problema matemático relaciona su sensibilidad con los cambios en los datos de entrada. Se dice que un cálculo es **numéricamente inestable** si la inexactitud de los valores de entrada se aumenta considerablemente por el método numérico.
- Estas ideas pueden estudiarse usando una serie de Taylor de primer orden

  $$
  f(x) = f(\bar{x}) + f'(\bar{x})(x - \bar{x})
  $$

- Esta relación se emplea para estimar el **error relativo** de $f(x)$ como en

  $$
  \frac{f(x) - f(\bar{x})}{f(x)} = \frac{f'(\bar{x})(x - \bar{x})}{f(\bar{x})}
  $$

- El **error relativo** de $x$ está dado por: $\frac{x - \bar{x}}{\bar{x}}$

- Un **número de condición** puede definirse como la razón entre estos errores relativos
$$\text{Número de condición} = \frac{\tilde{x} \cdot f'(\tilde{x})}{f(\tilde{x})}$$

**Ejemplo**

- EJEMPLO: Número de condición
- Planteamiento del problema: Calcule e interprete el número de condición para

  $$
  f(x) = \tan x \quad \text{para } \tilde{x} = \frac{\pi}{2} + 0.1\left(\frac{\pi}{2}\right)
  $$

  $$
  f(x) = \tan x \quad \text{para } \tilde{x} = \frac{\pi}{2} + 0.01\left(\frac{\pi}{2}\right)
  $$

Solución. El número de condición se calcula como:

- Número de condición = $\frac{\tilde{x}\left(\frac{1}{\cos^2 x}\right)}{\tan \tilde{x}}$
- Para $\tilde{x} = \frac{\pi}{2} + 0.1\left(\frac{\pi}{2}\right)$

  Número de condición = $\frac{1.7279(40.86)}{-6314} = -11$

- Así, la función está mal condicionada.

- Para $\tilde{x} = \frac{\pi}{2} + 0.01\left(\frac{\pi}{2}\right)$ esta situación es aún peor:

  $$
  \text{Número de condición} = \frac{1.5865(4053)}{-6 \cdot 66} = -101
  $$

- En este caso, la causa principal del mal condicionamiento parece ser la derivada. Esto tiene sentido, ya que en la vecindad de $\frac{\pi}{2}$, la tangente tiende tanto a infinito positivo como a infinito negativo.

### Exactitud y precisión

Los errores asociados con el cálculo y las medidas se pueden caracterizar mediante dos conceptos.

- Precisión
- Exactitud

La **precisión** indica el número de cifras significativas necesarias para representar una cantidad.

En cambio la **exactitud** se refiere a la aproximación de un número o una medida al valor exacto que se intenta representar.

---

#### Figura 2.4: Ejemplo de los conceptos de precisión y exactitud (a) Inexactos e imprecisos, (b) Exactos e imprecisos, (c) inexactos y precisos, (d) exactos (centradas en el valor real) y precisos (muy cercanas todas entre si).
![Figura.2.4](./img/figura-2-4.png)

La exactitud indica qué tan cerca está una medición del valor real.
La precisión indica qué tan agrupadas están entre sí las mediciones repetidas.

**Idea clave**
- Exactitud: cercanía al valor verdadero.
- Precisión: repetibilidad o dispersión.

**Casos**
| Caso | Exactitud | Precisión | Interpretación |
|------|-----------|-----------|----------------|
| a    | Baja      | Baja      | Dispersos y lejos del centro |
| b    | Alta      | Baja      | Dispersos pero centrados |
| c    | Baja      | Alta      | Agrupados pero sesgados |
| d    | Alta      | Alta      | Agrupados y centrados |

**Errores comunes**
- Confundir precisión con exactitud.
- Suponer que mediciones muy agrupadas siempre son correctas.
**Resumen en una línea**
La exactitud mide cercanía al valor real; la precisión mide consistencia entre mediciones.

> 💡 **Flashcard — Precisión y Exactitud**
> **P:**Precisión y Exactitud: definición.

---

En los cuadros de arriba se considera un punto negro que indica la posición real de un punto, y varios puntos blancos que indican valores aproximados de dicha posición en el plano.

La inexactitud determina el grado de alejamiento de la posición real.

La precisión en cambio indica como de separadas están las mediciones realizadas, es decir la magnitud de esparcimiento de las mediciones.

### Elementos de juicio

A la hora de utilizar un enfoque y/o método numérico conviene evaluar un conjunto de factores que permitirán decidir cuál es la mejor de un conjunto de varias alternativas.

Dichos factores son:

1. Tipo de problema matemático. Los métodos se utilizan cuando los problemas no pueden ser resueltos mediante técnicas analíticas o, tal resolución es posible, pero no eficiente.
2. Tipo de computadora disponible. Tener en cuenta ideas tales como la velocidad del procesador, precisión de la máquina, etc.
3. Costo en el desarrollo de los programas. Evaluar si es preferible adquirir un software ya creado, implementar uno, adquirir uno gratuito, y evaluar además familiaridad con la lógica del programa, eficiencia de los mismos, etc.
4. Características del problema a resolver. Si se dispone de muchos datos o puntos a manejar, cantidad de condiciones iniciales, velocidad de convergencia del problema, estabilidad del mismo, etc.
5. Exactitud y precisión. Costo y facilidad de programación, retardo en el tiempo de ejecución al disminuir el paso del método, etc.
6. Alcance de las aplicaciones. Evaluar si el caso aplicado será válido más adelante para otro caso de estudio, restricciones de cada método, etc.
7. Facilidad de utilización. Se trata de evaluar si el método es accesible o no al usuario.
8. Mantenimiento. Programas simples, bien estructurados, con comentarios sobre cada parte del código, lenguajes estándar, etc. son más fáciles de mantener.

---

- Del análisis de todos esos factores se deduce que no existe en general "el mejor método numérico" sino:
  - "el mejor método numérico para este problema bajo estas circunstancias".
- Se intentará para cada tema exponer varios métodos alternativos para cada tipo de problema planteado.

## Unidad 3: Raíces de Ecuaciones

### Introducción

- Uno de los problemas que con frecuencia se presenta, consiste en tener la necesidad de determinar las raíces de una ecuación de la forma:

  $$
  f(x) = 0
  $$

- Donde $f(x)$ es una función de la variable real $x$ con coeficientes reales.

- Resolver la ecuación consiste en hallar valores numéricos de la variable independiente $x$, llamados **RAÍCES** de la ecuación, tal que reemplazados en el primer miembro la anulan.

- El álgebra provee fórmulas de resolución para ecuaciones cuyos primeros miembros son polinomios, hasta el cuarto grado inclusive.
- Para ecuaciones de grado mayor no existen métodos exactos que las resuelvan.
- De igual manera ocurre con las **ecuaciones denominadas trascendentes**.
- Objetivo: Estudiar varios procedimientos que permiten calcular valores **APROXIMADOS** de las raíces.

**Ecuaciones “algebraicas”**

$$
f_n y^n + f_{n-1} y^{n-1} + \dots + f_1 y + f_0 = 0
$$

$$
f_6(x) = 5x^2 - x^3 + 7x^6
$$

**Ecuaciones “trascendentes”**

$$
f(x) = \ln x^2 - 1
$$

$$
f(x) = e^{-0.2x} \sin(3x - 0.5)
$$

---

- Definición de algunos términos y estudiar el comportamiento general de las ecuaciones.
- Las distintas etapas que, inevitablemente, deben seguirse para resolver una ecuación, son:
  - ACOTACIÓN de las raíces,
  - SEPARACIÓN de las raíces, y
  - APROXIMACIÓN de las raíces.

### Acotación de las Raíces

- Consiste en determinar un intervalo abierto, denominado **INTERVALO DE ACOTACIÓN**, que contenga a todas las raíces que pudieran interesar.
- Existen maneras precisas de operar cuando las ecuaciones son algebraicas.
- Cuando se trata de ecuaciones trascendentes, el estudio debe realizarse para cada caso en particular.

### Separación de las Raíces

- La práctica de **SEPARAR LAS RAÍCES** equivale a realizar una partición del intervalo de acotación, tal que, en cada subintervalo cerrado se encuentre una y solamente una raíz.
- Para separar raíces de ecuaciones algebraicas se estudiarán algunos métodos particulares.
- Cuando se trata de ecuaciones trascendentes el estudio debe realizarse para cada caso especial. Ej de ecuaciones trascendentes:

  $$
  \cos (x) - x + 1 = 0
  $$

- Este paso es de fundamental importancia, para evitar pasar por alto algunas raíces o no identificar raíces múltiples, principalmente.

### Aproximación de las Raíces.

- Consiste en calcular el valor numérico de las raíces con la precisión preestablecida.
- Para poder lograrlo se estudiarán métodos de aplicación general; útiles tanto para el caso de ecuaciones algebraicas como para las trascendentes.
- Se verán métodos especiales dedicados a ecuaciones algebraicas, cuya ventaja es un mayor rendimiento, velocidad y sencillez de operación.

### Comportamiento de las Ecuaciones

- Considérese un intervalo $(a; b)$ en el cual una función $f(x)$ es continua, y sea $AB$ el arco que la representa en coordenadas cartesianas, entonces es posible afirmar que:

- I.- Si $f(x)$ tiene distintos signos en dos puntos de abscisas $a$ y $b$, se anula por lo menos una vez en $(a; b)$, y en general, un número impar de veces(1). Consultar la figura 4.1.

- II.- Si $f(x)$ tiene igual signo en dos puntos de abscisas a y b, o bien se anula un número par de veces en el intervalo $(a,b)$, o bien no tiene ninguna raíz en el mismo.
- Puede apreciarse en la figura 4.2, que entre los puntos $x = c$ y $x = d$, la función no se anula, mientras que, en el intervalo $(a; b)$ se anula cuatro veces.

- III.- Si $f(x)$ es monótona creciente (o monótona decreciente) en el intervalo $(a; b)$; \rightarrow $f'(x)$ tiene un signo determinado (más o menos) en todo punto del intervalo, y es
  - $sg f(a) \neq sg f(b), =>$ hay una sola raíz $r$ de $f(x)=0$, mientras que,
  - $sg f(a) = sg f(b), =>$ con seguridad no hay ninguna raíz.
- Nota: Una función entre conjuntos ordenados, se denomina monótona (isótona), si conserva el orden dado

- IV.- Entre cada par de raíces consecutivas de $f'(x)$ la función $f(x)$ es creciente o decreciente; es decir, monótona y de acuerdo a III, tiene una sola raíz o ninguna.
- En la figura 4.4, se puede observar gráficamente distintas opciones de estos últimos teoremas.
- Nótese que en $a6$, es $f(a) = f'(a) = 0$, siendo pues, una raíz de tipo especial: **RAÍZ MÚLTIPLE**, (en este caso doble).
- En el punto $a8$, se presenta otra particularidad; en este caso se trata de un **PUNTO DE ENSILLADURA**.

#### Figura 4.1 — Gráfica de una función en \([a,b]\)
con la imagen
![Figura.4.1](./img/figura-4-1.png)

**Descripción corta:**
Gráfico cartesiano de f(x) continua en [a,b] con f(a)<0 y f(b)>0. La curva cruza el eje x tres veces, ilustrando el caso I: un cambio de signo entre los extremos garantiza un número impar de raíces en el intervalo, pero no necesariamente una sola.

**Tipo de gráfico**
- Gráfico cartesiano de una función \(y=f(x)\)
- Curva continua en el intervalo \([a,b]\)

**Elementos visibles**
- Eje horizontal: \(x\)
- Eje vertical: \(y\)
- Extremo izquierdo del intervalo: \(x=a\)
- Extremo derecho del intervalo: \(x=b\)
- Punto inicial visible: \(A=(a,f(a))\), con \(f(a)<0\)
- Punto final visible: \(B=(b,f(b))\), con \(f(b)>0\)

**Comportamiento observado**
- La curva cruza el eje \(x\) tres veces dentro del intervalo \([a,b]\).
- Por lo tanto, la ecuación \(f(x)=0\) tiene tres raíces visibles en ese intervalo.
- Como \(f(a)<0\) y \(f(b)>0\), hay cambio de signo entre los extremos.

**Interpretación teórica**
- Si \(f\) es continua en \([a,b]\), entonces por el teorema de Bolzano existe al menos una raíz en \((a,b)\).
- En esta figura no solo se observa al menos una raíz, sino tres cambios de cruce con el eje \(x\).

**Observación importante**
- Un cambio de signo entre \(a\) y \(b\) garantiza existencia de al menos una raíz, pero no garantiza unicidad.
- Esta figura es un contraejemplo visual a la idea equivocada de que un único cambio de signo implica una sola raíz.

#### Figura 4.2 — Gráfica de una función en \([a,b]\)
![Figura 4.2](./img/nombre-archivo.png)

**Descripción corta:**
Gráfico cartesiano de f(x) continua en [a,b] con f(a)<0 y f(b)>0, con puntos internos c y d marcados. Entre a y c la curva cruza el eje x dos veces; entre c y d no lo cruza; entre d y b lo cruza dos veces más. Ilustra el caso II: igual signo en los extremos de un subintervalo puede implicar cero raíces o un número par de ellas.

**Tipo de objeto**
- Gráfico cartesiano de la función \(y=f(x)\)
- Intervalo considerado: \([a,b]\)

**Datos visuales relevantes**
- Eje horizontal: \(x\)
- Eje vertical: \(y\)
- Extremo izquierdo del intervalo: \(x=a\)
- Extremo derecho del intervalo: \(x=b\)
- Punto inicial visible: \(A=(a,f(a))\), con \(f(a)<0\)
- Punto final visible: \(B=(b,f(b))\), con \(f(b)>0\)
- Otros puntos internos en el intervalo \([a,b]\) son: \(x=c\) y \(x=d\)
- Entre \(x=a\) y \(x=c\) la curva cruza dos veces el eje \(x\); entre \(x=c\) y \(x=d\) no cruza el eje \(x\); y entre \(x=d\) y \(x=b\) cruza dos veces el eje \(x\)
- Número de intersecciones visibles con el eje \(x\): ...
- La función parece continua en el intervalo

**Comportamiento observado**
- La curva cruza el eje \(x\) cuatro veces dentro del intervalo \([a,b]\).
- Por lo tanto, la ecuación \(f(x)=0\) tiene cuatro raíces visibles en ese intervalo.

#### Figura 4.3 — Distintos casos del teorema anterior
![Figura 4.3](./img/figura-4-3.png)

**Descripción corta:**
Cuatro subgráficos que muestran los casos del teorema III: (1) función creciente con f(a)<0 y f(b)>0 → una raíz; (2) función decreciente con f(a)>0 y f(b)<0 → una raíz; (3) función decreciente con igual signo en ambos extremos → ninguna raíz garantizada; (4) función creciente con igual signo en ambos extremos → ninguna raíz garantizada.

**Descripción general**
La figura reúne cuatro gráficos de funciones \(y=f(x)\) en un intervalo \([a,b]\), mostrando distintos comportamientos del signo de la función en los extremos del intervalo.

**Caso (1)**
- Se representa una función creciente.
- En \(x=a\), la función toma un valor negativo: \(f(a)<0\).
- En \(x=b\), la función toma un valor positivo: \(f(b)>0\).
- La gráfica cruza el eje \(x\) dentro del intervalo \((a,b)\).

**Interpretación:**
Hay cambio de signo entre \(a\) y \(b\), por lo que si \(f\) es continua en \([a,b]\), existe al menos una raíz en \((a,b)\).

**Caso (2)**
- Se representa una función decreciente.
- En \(x=a\), la función toma un valor positivo: \(f(a)>0\).
- En \(x=b\), la función toma un valor negativo: \(f(b)<0\).
- La gráfica cruza el eje \(x\) dentro del intervalo \((a,b)\).

**Interpretación:**
También hay cambio de signo entre \(a\) y \(b\), por lo que si \(f\) es continua en \([a,b]\), existe al menos una raíz en \((a,b)\).

**Caso (3)**
- Se representa una función decreciente.
- En \(x=a\), la función toma un valor positivo: \(f(a)>0\).
- En \(x=b\), la función también toma un valor positivo: \(f(b)>0\).
- La gráfica no cruza el eje \(x\) en el intervalo mostrado.

**Interpretación:**
No hay cambio de signo entre los extremos del intervalo. En este caso, el teorema no garantiza existencia de raíz en \((a,b)\).

**Caso (4)**
- Se representa una función creciente.
- En \(x=a\), la función toma un valor negativo: \(f(a)<0\).
- En \(x=b\), la función también toma un valor negativo: \(f(b)<0\).
- La gráfica no cruza el eje \(x\) en el intervalo mostrado.

**Interpretación:**
Tampoco hay cambio de signo entre los extremos del intervalo. En este caso, el teorema no garantiza existencia de raíz en \((a,b)\).

**Resumen comparativo**

| Caso | Signo de \(f(a)\) | Signo de \(f(b)\) | ¿Hay cambio de signo? | ¿Se garantiza una raíz en \((a,b)\)? |
|------|-------------------|-------------------|------------------------|--------------------------------------|
| (1)  | Negativo          | Positivo          | Sí                     | Sí                                   |
| (2)  | Positivo          | Negativo          | Sí                     | Sí                                   |
| (3)  | Positivo          | Positivo          | No                     | No                                   |
| (4)  | Negativo          | Negativo          | No                     | No                                   |

**Idea clave**
El teorema garantiza la existencia de al menos una raíz en \((a,b)\) cuando:
- \(f\) es continua en \([a,b]\), y
- \(f(a)\) y \(f(b)\) tienen signos opuestos.

En cambio, si los signos en los extremos son iguales, el teorema no permite asegurar la existencia de una raíz dentro del intervalo.

#### Figura 4.4 — Gráfico de una función con varios extremos y raíces en un intervalo
![Figura 4.4](./img/figura-4-4.png)

**Descripción general**
La figura muestra la gráfica de una función \(y=f(x)\) en un intervalo que va desde \(a\) hasta \(b\).
La curva presenta varios máximos locales, mínimos locales y múltiples intersecciones con el eje \(x\).

**Elementos señalados en la figura**
- Extremo izquierdo del intervalo: \(x=a\)
- Extremo derecho del intervalo: \(x=b\)
- Puntos interiores marcados sobre el eje \(x\):
  - \(a_1\)
  - \(a_2\)
  - \(a_3\)
  - \(a_4\)
  - \(a_5\)
  - \(a_6\)
  - \(a_7\)
  - \(a_8\)

**Comportamiento cualitativo de la gráfica**
- La función no es monótona en todo el intervalo.
- Se observan varios cambios de crecimiento a decrecimiento y viceversa.
- La curva corta al eje \(x\) en varios puntos del intervalo.
- Algunos tramos de la función están por encima del eje \(x\) y otros por debajo.
- La figura sugiere la existencia de varias raíces reales en el intervalo considerado.

**Interpretación matemática**
- La ecuación \(f(x)=0\) posee múltiples soluciones en el intervalo \([a,b]\).
- La presencia de varios máximos y mínimos locales indica que una misma función puede tener varias raíces separadas.
- Para localizar raíces individuales, conviene dividir el intervalo total en subintervalos donde:
  - haya cambio de signo, o
  - la función tenga un comportamiento más simple.

**Posible uso en métodos numéricos**
Esta figura es útil para ilustrar que:
- un intervalo grande \([a,b]\) puede contener varias raíces;
- antes de aplicar métodos de búsqueda de raíces, suele ser necesario aislar cada raíz en un subintervalo adecuado;
- un cambio de signo en un subintervalo puede usarse como criterio práctico para detectar la posible existencia de una raíz.

**Idea clave**
Cuando una función presenta oscilaciones y múltiples cruces con el eje \(x\), no basta con estudiar solo el intervalo global \([a,b]\); es necesario analizar subintervalos para identificar y separar las distintas raíces.

---

- Se estudiarán varios métodos de resolución de ecuaciones, los que podrán ser aplicados tanto a la resolución de ecuaciones algebraicas como trascendentes.
- Razón de incluir más de un método es el hecho, de que no existe, **él método** que resuelva todos los problemas que se puedan presentar en la práctica.

### Métodos gráficos

**Planteamiento del problema.** Utilice el método gráfico para determinar el coeficiente de arrastre $c$ necesario para que un paracaidista de masa $m = 68.1\,\mathrm{kg}$ tenga una velocidad de $40\,\mathrm{m/s}$ después de una caída libre de $t = 10\,\mathrm{s}$. Nota: La aceleración de la gravedad es $9.8\,\mathrm{m/s^2}$.

$$
f(c) = \frac{gm}{c} \left(1 - e^{-c / m\,x}\right) - v
$$

**Solución.** Este problema se resuelve determinando la raíz de la ecuación (PT2.4) usando los parámetros $t = 10$, $g = 9.8$, $v = 40$ y $m = 68.1$:

$$
f(c) = \frac{9.8(68.1)}{c} \left(1 - e^{-(c/68.1)10}\right) - 40 = \frac{667.38}{c} \left(1 - e^{-0.146843\,v}\right) - 40
$$

| c | f(c) |
|---|------|
| 4 | 34.115 |
| 8 | 17.653 |
| 12 | 6.067 |
| 16 | -2.269 |
| 20 | -8.401 |

---

$$
f(14.75) = \frac{667.38}{14.75} \left(1 - e^{-0.146843(14.75)}\right) - 40 = 0.059
$$

$$
v = \frac{9.8(68.1)}{14.75} \left(1 - e^{-(14.75/68.1)10}\right) = 40.059
$$

### Método de tanteos

- En el MÉTODO DE TANTEOS se determinan valores de $f(x)$ correspondientes a valores sucesivos de $x$ hasta que se presente un cambio de signo en la evaluación de $f(x)$, indica que se ha pasado por una raíz.
- Se puede obtener una aproximación mejorada del valor de la raíz volviendo al último valor de $x$ que precede al cambio de signo.
- Y a partir de este, calcular los $f(x)$ correspondientes a valores sucesivos de $x$, reiterando el procedimiento, pero, utilizando, un incremento menor al del inicio, hasta que cambie nuevamente el signo de $f(x)$.
- El procedimiento se reitera con incrementos de $x$ cada vez más pequeños hasta lograr un valor suficientemente preciso de la raíz.
- Si se aplicara nuevamente para otros subintervalos de separación, se localizarán y aproximarán las sucesivas raíces de $f(x)$, en cada cambio de signo de esta.
- Previo a su aplicación: es importante acotar y separar las raíces, con el fin de no pasar por alto alguna de ellas.
- Elegir cuidadosamente el valor inicial del incremento para evitar que no se identifique una de dos raíces muy próximas.
- Método elemental, pero muy laborioso de ser aplicado manualmente,
- De uso corriente debido a la gran capacidad y rapidez de procesamiento de las computadoras electrónicas digitales.

> 💡 **Flashcard — Método de Tanteos**
> **P:** Definición y procedimiento.

##### Error en el método de tanteos

- El método visto es un algoritmo infinito que deberá ser detenido indefectiblemente mediante algún procedimiento artificial.
- Para lograr la precisión deseada, se detiene el procesamiento cuando la diferencia, en valor absoluto, entre dos valores consecutivos de la variable es menor o igual que E positiva y arbitraria, previamente establecida.
- Cuando la DIFERENCIA ABSOLUTA resulta:

  $$
  \left| x_{i-1} - x_i \right| \leq \mathbf{E}
  $$

- Una alternativa muy utilizada, consiste en operar sobre el valor de la función que, en este caso es calculada en todos los pasos para estudiar la evolución del cambio de signo de la función.
- Puede detenerse el procesamiento y adoptar el valor de $x_i$ para el cual resulta:

  $$
  \left| f(x_i) \right| \leq \mathbf{E} \tag{4.3}
  $$

- Donde $\mathbf{E}$ será el error máximo admisible en el procesamiento.

> 💡 **Flashcard — Método de Tanteos**
> **P:** Error: ¿cómo se trabaja con el error en el Método de Tanteos?

### Método del intervalo medio

- El método de bisección o del intervalo medio, conocido también como de corte binario, de partición de intervalos o de Bolzano, es un tipo de búsqueda incremental en el que el intervalo se divide siempre a la mitad.
- Si la función cambia de signo sobre un intervalo, se evalúa el valor de la función en el punto medio.
- La posición de la raíz se determina situándola en el punto medio del subintervalo, dentro del cual ocurre un cambio de signo.
- El proceso se repite hasta obtener una mejor aproximación.
- Supóngase que mediante algún método se ha separado una de las raíces de una ecuación dada por:
  - $f(x) = 0$
- Bolzano: si $f(x)$ es continua en el intervalo $(a; b)$ y en los extremos toma valores $f(a)$ y $f(b)$, respectivamente, con signos opuestos, entonces, se anula por lo menos una vez, en un punto interior de $(a; b)$.
- Una interpretación geométrica del Teorema conduce a dividir el intervalo dado en dos partes iguales;
  - Si no se anula en el punto de división => se tomará aquel subintervalo $(a_1; b_1)$ en cuyos extremos la función tiene signos diferentes (consultar la figura 4.6); es decir, si se cumple la condición:

  - $f(a_1) \cdot f(b_1) < 0$

- Dividiendo el subintervalo obtenido en el paso anterior en dos partes iguales y, si no se anula la función en el nuevo punto de subdivisión, se tomará aquel nuevo $(a_2; b_2)$ donde:

> 💡 **Flashcard — Método del Intervalo Medio**
> **P:** Procedimiento.

#### Figura 4.6 — Aplicación del método de bisección
![Figura 4.6](image_url)

**Descripción general**
La figura muestra una función continua \(y=f(x)\) en un intervalo inicial \([a,b]\), donde:
- \(a=a_1\)
- \(b=b_1\)

Se representan puntos medios sucesivos del intervalo:
- \(p_1\)
- \(p_2\)
- \(p_3\)

Cada uno de estos puntos genera nuevos subintervalos, ilustrando el procedimiento iterativo del método de bisección.

**Elementos del gráfico**
- Eje horizontal: variable \(x\)
- Eje vertical: valores de la función \(f(x)\)
- Curva: \(y=f(x)\)
- Extremos del intervalo inicial:
  - \(a=a_1\)
  - \(b=b_1\)
- Puntos medios sucesivos:
  - \(p_1\)
  - \(p_2\)
  - \(p_3\)

También se indican los valores:
- \(f(a)\)
- \(f(p_2)\)
- \(f(p_1)\)
- \(f(b)\)

**Idea representada**
El método de bisección parte de un intervalo inicial \([a,b]\) tal que:
\[
f(a)\,f(b) < 0
\]
lo que garantiza, si \(f\) es continua, la existencia de al menos una raíz en \((a,b)\).

Luego:
1. se calcula el punto medio del intervalo;
2. se evalúa la función en ese punto;
3. se elige el subintervalo donde se conserva el cambio de signo;
4. se repite el proceso.

**Secuencia mostrada en la figura**
- Intervalo inicial
\[
[a_1,b_1]
\]

Su punto medio es:
\[
p_1=\frac{a_1+b_1}{2}
\]

Según la figura, la raíz buscada queda en el subintervalo izquierdo, por lo que el siguiente intervalo es:
\[
[a_2,b_2]=[a_1,p_1]
\]

- Segunda iteración
El punto medio del nuevo intervalo es:
\[
p_2=\frac{a_2+b_2}{2}
\]

De nuevo se selecciona el subintervalo donde permanece el cambio de signo. En la figura, esto conduce a:
\[
[a_3,b_3]=[p_2,b_2]
\]

- Tercera iteración
El nuevo punto medio es:
\[
p_3=\frac{a_3+b_3}{2}
\]

Este proceso continúa hasta que el intervalo sea suficientemente pequeño o hasta alcanzar una tolerancia prefijada.

**Relación entre los intervalos**
En la parte inferior de la figura se muestran los intervalos anidados:
- \([a_1,b_1]\)
- \([a_2,b_2]\)
- \([a_3,b_3]\)

Cada nuevo intervalo está contenido en el anterior y tiene longitud igual a la mitad:
\[
b_n-a_n=\frac{b-a}{2^{\,n-1}}
\]

**Interpretación matemática**
- El método no busca la raíz directamente, sino que la va encerrando en intervalos cada vez más pequeños.
- Los puntos \(p_1,p_2,p_3,\dots\) son aproximaciones sucesivas de la raíz.
- La convergencia está garantizada si:
  - \(f\) es continua en \([a,b]\)
  - \(f(a)f(b)<0\)

**Idea clave**
El método de bisección reduce iterativamente el intervalo que contiene la raíz, conservando siempre el cambio de signo en los extremos del subintervalo elegido.

---

#### Pasos

Paso 1: Elija valores iniciales inferior, $x_i$, y superior, $x_u$, que encierren la raíz, de forma tal que la función cambie de signo en el intervalo. Esto se verifica comprobando que $f(x_i) f(x_u) < 0$.

Paso 2: Una aproximación de la raíz $x_r$ se determina mediante:

$$
x_r = \frac{x_i + x_u}{2}
$$

Paso 3: Realice las siguientes evaluaciones para determinar en qué subintervalo está la raíz:

a) Si $f(x_i)f(x_r) < 0$, entonces la raíz se encuentra dentro del subintervalo inferior o izquierdo. Por lo tanto, haga $x_u = x_r$ y vuelva al paso 2.

b) Si $f(x_i)f(x_r) > 0$, entonces la raíz se encuentra dentro del subintervalo superior o derecho. Por lo tanto, haga $x_l = x_r$ y vuelva al paso 2.

c) Si $f(x_i)f(x_r) = 0$, la raíz es igual a $x_r$, termina el cálculo.

- Reiterando el procedimiento, se llegará a un punto de subdivisión en el que, al menos teóricamente, se anula $f(x)$.
- En general, se obtendrá un par de sucesiones indefinidas monótonas que tienden a un número $u$, tal que:

  $$
  a \leq a_1 \leq \dots \leq a_n \leq \dots \leq u \leq \dots \leq b_n \leq \dots \leq b_1 \leq b
  $$

---

Considerando el procedimiento utilizado en la construcción de los subintervalos, es posible escribir

$$
b_1 - a_1 = \frac{b - a}{2}
$$

$$
b_2 - a_2 = \frac{b_1 - a_1}{2} = \frac{b - a}{2^2}
$$

$$
b_3 - a_3 = \frac{b_2 - a_2}{2} = \frac{b - a}{2^3}
$$

Y en general: (4.4)

$$
b_n - a_n = \frac{b - a}{2^n}
$$

---

- Ten la que $n$ representa la cantidad de subdivisiones realizadas en el intervalo $(a; b)$.
- Tomando límites para $n \to \infty$, resulta: (4.5)

  $$
  \lim_{n \to \infty} \left(b_n - a_n\right) = \lim_{n \to \infty} \frac{b - a}{2^n}
  $$

- Entonces, en el punto $x = u$, es $f(u) = 0$, por estar $u$ incluido en el entorno dado por $b - a$, que, por pequeño, que este sea, la función toma en sus extremos valores de signos opuestos.
- Ventajas: Converge para cualquier $f$ continua, es decir no hace falta derivabilidad como en otros métodos que veremos más adelante.

##### Error en el método del intervalo medio

- Mediante subdivisiones sucesivas por partes iguales, de un intervalo que contiene la raíz a determinar, se puede construir un algoritmo que permita obtener dicha raíz, con la aproximación que se desee, siempre que se verifique que:

  $$
  b_n - a_n \leq \mathbf{E} \tag{4.6}
  $$

- Se quiere conocer cuántas iteraciones son necesarias, realizar para que el error con que se calcula el valor de la raíz no supere un cierto valor arbitrario $\mathbf{E} > 0$, en cuyo caso por (4.4) y (4.6) es:

  $$
  b_n - a_n = \frac{b - a}{2^n} \leq \mathbf{E}
  $$

- de donde, es posible despejar el número de iteraciones que son necesarias, realizar para que el error sea menor o igual a $\mathbf{E}$:

  $$
  n \geq \frac{\log(b - a) - \log\mathbf{E}}{\log 2}
  $$

- Estudiar la posibilidad de pasar por alto raíces:
  - si solo se cuenta con un intervalo inicial de ACOTACIÓN;
  - cuando algunas raíces son de multiplicidad superior a uno.

- Se evitan si se aplica el método sobre intervalos de SEPARACIÓN exclusivamente.

> 💡 **Flashcard — Método del Intervalo Medio: Error**
> **P:** ¿Cómo saber cuántas iteraciones son necesarias para que el error no supere cierto valor E?

#### Ejemplo

Dados: $f(x) = x^{2} - 2$  [a; b] = [1; 3]  $f(1) = -1 < 0 < f(3) = 7$

- Obtener la raíz en dicho intervalo. La sucesión obtenida es:

| x1 = 2 | f(x1) = 2 | [a1; b1] = [1; 2] |
|--------|-----------|--------------------|
| x2 = 1.5 | f(x2) = 0.25 | [a2; b2] = [1; 1.5] |
| x3 = 1.25 | f(x3) = -0.4375 | [a3; b3] = [1.25; 1.5] |
| x4 = 1.375 | f(x4) = -0.109375 | [a4; b4] = [1.375; 1.5] |
| x5 = 1.4375 | f(x5) = 0.06640625 | [a5; b5] = [1.375; 1.4375] |
| x6 = 1.40625 | f(x6) = -0.022 ... | [a6; b6] = [1.40625; 1.4375] |
| x7 = 1.421875 | f(x7) = 0.02 ... | [a7; b7] = [1.40625; 1.421875] |
| x8 = 1.4140625 ... | | |

Para x8, la aproximación lograda tiene 4 cifras exactas. Fue necesario hacer ocho pasos para obtener cuatro cifras exactas $\sqrt{2} = 1.4142\ldots\ldots$

#### Algoritmo en Pseudocódigo

| INPUT | puntos extremos a, b; tolerancia a TOL; número máximo de iteraciones s N_{0} |
|-------|---------------------------------------------------------------|
| OUTPUT | solución aproximada de p o un mensaje de falla. |
| Paso 1 | Sea i = 1. |
| Paso 2 | Mientras i <= N_{0} realizar Pasos 3-6. |
| Paso 3 | Sea p = a + (b - a) / 2. (Calcula P_{i}) |
| Paso 4 | Si f(p) = 0 o (b - a) / 2 < TOL entonces |
| | OUTPUT (p); (procedimiento terminado con éxito) |
| | STOP. |
| Paso 5 | Sea i = i + 1. |
| Paso 6 | Si f(a) f(b) > 0 entonces a = p (Calcula a_{i}, b_{i}) |
| | En caso contrario sea b = p. |
| Paso 7 | OUTPUT ('El método falló después de N_{0} iteraciones s, N_{0} = ', N_{0}); |
| | (Procedimiento terminado sin éxito) |
| | STOP |

---

- Vemos otros procedimientos de detención que pueden aplicarse en el Paso 4 del algoritmo anterior, como de los cuales se aplica a cualquiera de las técnicas iterativas consideradas.
- Seleccionar una tolerancia $x > 0$ y generar $p_1, p_2, \dots, p_n$ hasta que se cumpla alguna de las siguientes condiciones:

  $$
  |p_n - p_{n-1}| < x;
  $$

  $$
  |p_n - p_{n-1}| / p_n < x; \tag{4.7}
  $$

  $$
  f(p_n) < x.
  $$

- Pueden presentarse dificultades al usar cualquiera de estos criterios para detención.
- Existen sucesiones $\{p_n\}$ con la propiedad de que las diferencias $p_n - p_{n-1}$ convergen a cero mientras que las sucesiones por sí mismas divergen.
- Es también posible que $f(p_n)$ esté cercana a cero, mientras que $p_n$ difiere significativamente de $p$.
- Sin conocimiento adicional de $f \circ p$ la desigualdad (4.7) es el mejor criterio para la detención debido a que pone a prueba el error relativo.
- Cuando se usa una computadora para generar aproximaciones, es conveniente fijar una cota superior para el número de iteraciones que se realizan. Esto evita entrar en un ciclo infinito. Una posibilidad que puede presentarse cuando una sucesión diverge (y también cuando el programa está incorrectamente codificado).
- Lo anterior se efectúa fácilmente fijando una cota inicial $p_n$ y haciendo que el procedimiento termine si $i > p_n$, como se realizó (4.7).

### Método de interpolación lineal o de Regula Falsi

Dada $f(x) = 0$, donde, uno de los subintervalos de separación viene dado por $(x_1; x_2)$, en el cual se cumple también que: $f(x_1) \cdot f(x_2) < 0$, tal como se ilustra en la figura 4.7, para $y = f(x)$.

- Como $f(x_1)$ y $f(x_2)$ tienen signos diferentes, de ser monótona en el intervalo dado $(x_1; x_2)$, entonces $f(x)$ tendrá una raíz entre $x_1$ y $x_2$.
- La ecuación de la recta que pasa por los puntos $P_1$ y $P_2$, es:

  $$
  y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1)
  $$

- Para hallar la intersección con el eje de las abscisas se hace $y = 0$, tomando $x$ el valor $x_3$, en la cual $x_3$ es una mejor aproximación del verdadero valor de la raíz
- Resulta entonces:

  $$
  - y_{1} = \frac {y_{2} - y_{1}}{x_{2} - x_{1}} \left(x_{3} - x_{1}\right)
  $$

- y, despejando de esta última:

  $$
  x_{3} = \frac {x_{1} y_{2} - x_{2} y_{1}}{y_{2} - y_{1}}
  $$

- El valor determinado de esta manera, se sustituye en la función para calcular el correspondiente valor de  $y_{3}$ .
- Luego se realiza una comparación entre los signos de  $f(x_{3})$  con los de  $f(x_{1})$  y  $f(x_{2})$ , desechando el punto para el cual la función tiene igual signo que  $f(x_{3})$ .
- Seguidamente con idéntico procedimiento al ya expuesto, se reitera el primer paso entre los puntos del subintervalo así obtenido con el objeto de determinar el valor de  $x_4$ , que es aún una mejor aproximación de la raíz buscada.
- Es necesario repetir el procedimiento con nuevos pares de puntos, hasta que se logra la aproximación.
- Este método, llamado por algunos autores **Método de la Regula Falsi**, o también **Método de las Partes Proporcionales**, puede ser utilizado en la computadora para determinar las raíces de una ecuación, con un grado especificado de precisión y un número menor de iteraciones que en el método de tanteos.
- Es un algoritmo que **converge más rápidamente a la solución** que en el método de tanteos.

#### Convergencia en el método de interpolación lineal

- Para tener la seguridad que el **Método de Interpolación Lineal** converge, es necesario que satisfaga, en los puntos $x_1; x_2$ (extremos del subintervalo inicial) algunas condiciones específicas:

  1) $f(x_1).f(x_2) < 0$
  2) $f'(x) \neq 0$ para todo $x \in (x_1; x_2)$
  3) $f(x)$ debe ser monótona para todo punto del intervalo $(x_1; x_2)$

### Método de Newton-Raphson

- Muy útil para mejorar una primera aproximación a una raíz $r$ de una ecuación de la forma $f(x) = 0$
- Aproximación obtenida por simples tanteos, o mediante algún recurso gráfico, etc.
- Si $x$ es una primera aproximación al valor de una raíz, la que puede ser directamente uno de los extremos del intervalo cerrado de separación $[a; b]$.
- Se dibuja una recta tangente a la curva en el punto $x = x_{n}$, interceptará al eje de las abscisas en un valor dado por $x = x_{n+1}$, que constituye una aproximación mejorada de la raíz $r$.
- Se puede observar que la pendiente de la recta tangente a la curva  $y = f(x)$  es:

  $$
  \operatorname{tg} \alpha = f ^{\prime} \left(x_{n}\right) = \frac {f \left(x_{n}\right)}{x_{n} - x_{n+1}}
  $$

- de donde:

  $$
  x_{n+1} = x_{n} - \frac {f (x_{n})}{f ^{\prime} (x_{n})} \tag {4.8}
  $$

  Para que esto último tenga sentido, hay que suponer  $f'(x_n) \neq 0$

---

- El valor de la función, y el de su derivada, son conocidos para el valor  $x = x_{n}$ , y la nueva aproximación de la raíz  $x_{n+1}$ , se obtiene utilizando la ecuación (4.8).
- Se repite el procedimiento descrito, partiendo de esta nueva aproximación, para obtener una mejor.
- Se continúa hasta que dos valores consecutivos de la raíz aproximada difieran en una cantidad igual o menor que un cierto E positivo y arbitrario, previamente prescrito.

#### Convergencia del método de Newton-Raphson

- Tal como se puede apreciar en la figura 4.9, si se aplica el procedimiento en el punto $x_n = b$, en lugar de lograr una mejor aproximación a la raíz, el procedimiento se hubiera alejado de ella.
- Lo mismo sucede si el procedimiento seiese aplicado en el punto $x_n = a$.
- Fourier, estableció ciertas condiciones sobre el punto en el cual debe ser aplicado el procedimiento de $N-R$, en función de los signos que toman $f(x)$ y $f''(x)$, pues, de lo contrario, la aplicación del método podría resultar divergente.

#### Figura 4.9 - Aplicación del método de Newton-Raphson desde un extremo válido del intervalo
![Figura 4.9](./img/figura4.9.png)
**Descripción corta**
La figura muestra una función \(y=f(x)\) y un intervalo de separación que contiene una raíz \(r\).
Se ilustra el caso en que solo uno de los extremos del intervalo permite aplicar correctamente el método de Newton-Raphson, mientras que el otro no resulta adecuado.
**Elementos representados**
- Eje horizontal: variable \(x\)
- Eje vertical: variable \(y\)
- Curva: \(y=f(x)\)
- Raíz de la función: \(r\), donde \(f(r)=0\)
- Extremo derecho del intervalo: \(x_n=b\)
- Siguiente aproximación obtenida por Newton-Raphson: \(x_{n+1}\)
**Interpretación geométrica**
- Se parte del extremo derecho del intervalo, \(x_n=b\).
- En ese punto se traza la recta tangente a la curva \(y=f(x)\).
- La intersección de esa tangente con el eje \(x\) determina la siguiente aproximación:
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
\]
- En la figura, esta construcción lleva a una nueva aproximación \(x_{n+1}\) situada a la izquierda.
**Idea representada**
La figura ilustra que, aunque el intervalo \([a,b]\) contenga una raíz \(r\), no siempre ambos extremos son igualmente convenientes para iniciar Newton-Raphson.
- Uno de los extremos produce una tangente cuya intersección con el eje \(x\) genera una iteración aceptable.
- El otro extremo puede no ser adecuado, porque la tangente puede alejarse de la raíz, salir del intervalo o producir una secuencia menos favorable.
**Criterio teórico asociado**
En el estudio clásico del método de Newton-Raphson, un criterio usual para elegir el extremo inicial consiste en tomar aquel donde:
\[
f(x_0)\,f''(x_0) > 0
\]
Cuando esta condición se cumple, la iteración suele avanzar de manera conveniente hacia la raíz contenida en el intervalo.

**Lectura de la figura**
- La raíz \(r\) está dentro del intervalo.
- El extremo \(b\) sí permite construir una iteración de Newton-Raphson adecuada.
- La figura sugiere que el otro extremo no cumple la condición conveniente de arranque.

**Consecuencia numérica**
Aunque exista un intervalo de separación para una raíz, en Newton-Raphson no basta con conocer el intervalo: también importa desde qué punto inicial se comienza.

**Idea clave**
En un intervalo que contiene una raíz, puede ocurrir que solo uno de los extremos sea apropiado como valor inicial para Newton-Raphson; por eso la elección de \(x_0\) es parte esencial del método.

---

- OBSERVACIÓN DE FOURIER, es posible afirmar que:
- Una función $f(x) = 0$, definida, monótona y dos veces continuamente derivable ($f \in \mathbb{C}^2$) en el intervalo $(a; b)$, que satisface las siguientes condiciones:
  - I) $f(a).f(b) < 0$
  - II) $f'(x)$ distinta de 0 para todo $x$ comprendido en $(a;b)$
  - III) $f(x0).f''(x0) > 0$ con $x$ comprendido en $(a; b)$
- Se supondrá, entonces, que en el punto $x_n$, tanto la función, como sus derivadas de primero y segundo orden tienen un signo determinado, distinto de cero.
- Fourier estableció que el procedimiento de Newton-Raphson debe aplicarse en caso de que $f(x_n)$ y $f''(x_n)$ tengan igual signo; de no ser así, en general, el procedimiento es divergente.
- En la figura 4.10 se hallan representados gráficamente los cuatro diferentes casos que, donde el método de Newton-Raphson, es aplicable.

#### Figura 4.10 - Cuatro casos en los que el método de Newton-Raphson es aplicable

![Figura 4.10](./img/figura4.10.png)

**Descripción general**
La figura reúne cuatro gráficos de funciones \(y=f(x)\) que ilustran los distintos casos clásicos en los que el método de Newton-Raphson puede aplicarse de forma adecuada dentro de un intervalo \([a,b]\) que contiene una raíz \(r\).

En todos los casos:
- \(r\) es una raíz de la función, es decir, \(f(r)=0\)
- la función es derivable en el entorno considerado
- el punto inicial debe elegirse en un extremo del intervalo que satisfaga la condición:
\[
f(x_0)\,f''(x_0)>0
\]

**Caso 1**
- La función es creciente:
\[
f'(x)>0
\]
- La función es cóncava hacia abajo:
\[
f''(x)<0
\]
- En el extremo conveniente se tiene:
\[
f(x)<0
\]

**Signos representados en la figura:**
\[
f<0,\qquad f'>0,\qquad f''<0
\]

**Interpretación:**
La raíz \(r\) está en el intervalo y Newton-Raphson puede iniciarse desde el extremo adecuado, ya que se cumple la condición de aplicabilidad.

**Caso 2**
- La función es creciente:
\[
f'(x)>0
\]
- La función es cóncava hacia arriba:
\[
f''(x)>0
\]
- En el extremo conveniente se tiene:
\[
f(x)>0
\]

**Signos representados en la figura:**
\[
f>0,\qquad f'>0,\qquad f''>0
\]

**Interpretación:**
Este es otro caso favorable para Newton-Raphson, ya que el extremo elegido satisface:
\[
f(x_0)\,f''(x_0)>0
\]

**Caso 3**
- La función es decreciente:
\[
f'(x)<0
\]
- La función es cóncava hacia arriba:
\[
f''(x)>0
\]
- En el extremo conveniente se tiene:
\[
f(x)>0
\]

**Signos representados en la figura:**
\[
f>0,\qquad f'<0,\qquad f''>0
\]

**Interpretación:**
También en este caso Newton-Raphson es aplicable desde el extremo correcto del intervalo.

**Caso 4**
- La función es decreciente:
\[
f'(x)<0
\]
- La función es cóncava hacia abajo:
\[
f''(x)<0
\]
- En el extremo conveniente se tiene:
\[
f(x)<0
\]

**Signos representados en la figura:**
\[
f<0,\qquad f'<0,\qquad f''<0
\]

**Interpretación:**
La condición
\[
f(x_0)\,f''(x_0)>0
\]
también se cumple, por lo que el método es aplicable.

**Resumen de los cuatro casos**

| Caso | Signo de \(f\) | Signo de \(f'\) | Signo de \(f''\) | ¿Se cumple \(f(x_0)f''(x_0)>0\)? |
|------|----------------|-----------------|------------------|-----------------------------------|
| 1    | \(f<0\)        | \(f'>0\)        | \(f''<0\)        | Sí                                |
| 2    | \(f>0\)        | \(f'>0\)        | \(f''>0\)        | Sí                                |
| 3    | \(f>0\)        | \(f'<0\)        | \(f''>0\)        | Sí                                |
| 4    | \(f<0\)        | \(f'<0\)        | \(f''<0\)        | Sí                                |

**Idea clave**
El método de Newton-Raphson es aplicable de forma conveniente cuando se elige un valor inicial \(x_0\) tal que:
\[
f(x_0)\,f''(x_0)>0
\]
La figura muestra los cuatro esquemas gráficos típicos en los que esta condición puede cumplirse.

---

- Demostración analítica.
- Tomando los 3 primeros términos del desarrollo en serie de Taylor de orden 2, aplicado en un entorno del punto  $x = a$ , resulta:

  $$
  f (x) = f (a) + (x - a) f ^{\prime} (a) + \frac {1}{2} (x - a) ^{2} f ^{\prime \prime} (\xi); \quad a <   \xi <   x
  $$

- para el valor de la variable igual al de la raíz  $r$ , se verifica que  $f(r) = 0$
- Suponiendo ahora que, $f'(a) \neq 0$, en el punto $x = r$, se tiene:

  $$
  0 = f(a) + (r - a)f'(a) + \frac{1}{2}(r - a)^2 f''(\xi); \quad a < \xi < r
  $$

- y despejando de esta última, el valor de $r$ correspondiente al segundo término, se obtiene:

  $$
  r = a - \frac{f(a)}{f'(a)} - \frac{1}{2}(r - a)^2 \frac{f''(\xi)}{f'(a)}; \quad a < \xi < r
  $$

- Los dos primeros términos determinan, el valor aproximado de la raíz que, si se lo designa con $a'$, resulta: (4.10)

  $$
  a' = a - \frac{f(a)}{f'(a)}
  $$

- que, como puede comprobarse, es equivalente a N-R. Se demostrará que $a'$ está más próximo a $r$ que el valor de $a$, suponiendo que la función $f(x)$ y la derivada segunda $f''(x)$ tienen igual signo en un entorno del punto $x = a$.
- En efecto:  $r - a' = -\frac{1}{2} (r - a)^2 \frac{f''(\xi)}{f'(a)}$  (4.9)
- de donde y luego de dividir ambos miembros por a- a':
  $$
  \frac{r - a'}{a' - a} = \frac{1}{2} \frac{(r - a)^2 f''(\xi)}{f(a)} > 0
  $$
- esta igualdad afirma que, si  $f''(\xi)$  tiene igual signo que  $f(a) \Rightarrow$  el numerador y el denominador del primer miembro tienen el mismo signo;
- o sea, que  $a'$  está situado entre los valores de  $a$  y  $r$ , vale decir,  $a'$  mejora la aproximación dada por  $a$ .

---

- Entonces, tomando $x_0$ como primera aproximación de la raíz $r$, el método de NEWTON-RAPHSON converge a la única solución $r$ de $f(x) = 0$.
- Nota: La tercer condición puede ser satisfecha en los dos extremos del intervalo de separación; en uno solo de ellos o, eventualmente, en ninguno.
- En la figura 4.9 se muestra el caso en que uno de los dos extremos del intervalo de separación permite la aplicación del método; mientras que, el otro no.
- Con la aplicación de la fórmula dada por la expresión 4.8, se comete un error absoluto expresado por:
  - $E < /r - a/$
  - que según la expresión 4.9, en algún momento del cálculo, resulta:

    $$
    E < \left| \frac{(r - a)^2 f''(\xi)}{2 f'(a)} \right| \tag{4.10}
    $$

- Si bien no se conocen todos los valores de las expresiones incluidas en el segundo miembro, pueden tomarse cotas superiores de las expresiones desconocidas que intervienen en ella.
- Llamando $h$ a la longitud del intervalo $(b - a)\ y$, $K$ a una cota superior de $f''(x)$, resulta entonces:

  $$
  \mathbf{E} < \left| \frac{h^2 K}{2 f'(a)} \right|
  $$

- la que se constituye en la expresión de una cota superior del error cometido en la aplicación del método de NEWTON-RAPHSON.

#### Ejemplo

- Calcular, aplicando el método de Newton una aproximación de $\sqrt{2}$. Comparar el resultado con el que se obtuvo al aplicar el método de bisección. Como antes la función es y elegimos $f(x) = x^2 - 2$

  Punto inicial $x_0 = 3$

  $$
  x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^2 - 2}{2x_n} = \frac{x_n}{2} + \frac{1}{x_n}
  $$

  Y aplicando esto obtenemos
 | x0 = 3 | x3 = 1.41499843... |
 |--------|-------------------|
 | x1 = 1.833... | x4 = 1.41421378... |
 | x2 = 1.4621212... | x5 = 1.414213562... |

  Observar que: $\sqrt{2} = 1.414213562$

  Con cinco pasos del método tenemos más de diez cifras exactas, mientras que con bisección en ocho pasos teníamos cuatro cifras exactas.

#### Algoritmo: Newton-Raphson

**INPUT:** aproximación inicial $p_0$ ; tolerancia a TOL; máximo número de iteraciones $N_0$.
**OUTPUT:** aproxima la solución $p$ o da un mensaje de fracaso.

**Paso 1:** Sea $i = 1$.
**Paso 2:** Mientras $i \leq N_0$ realizar Pasos 3-6.
**Paso 3:** Sea $p = p_0 - f(p_0) / f'(p_0)$. (Calcula $p_i$)
**Paso 4:** Si $|p - p_0| < \text{TOL entonces}$
  OUTPUT $(p)$; (procedimiento terminado con éxito)
  STOP.
**Paso 5:** Sea $i = i + 1$.
**Paso 6:** Sea $p_0 = p$. (Actualiza $p_0$)
**Paso 7:** OUTPUT ('El método fracasó después de $N_0$ iteraciones, $N_0 = '$, $N_0$);
  (Procedimiento terminado sin éxito)
  STOP.

#### Procedimiento de Newton-Raphson

- Las técnicas para detener el algoritmo: seleccionar una tolerancia $E > 0$ y construir $p_1, p_2$, $p_n$ hasta que:
  - $|p_n - p_{n-1}| < E$;
  - $|p_n - p_{n-1}| / p_n < e$; o $f(p_n) < E$.
- Note que esta última forma puede no proporcionar información acerca del error real: $|p_n - p_{n-1}|$

#### Método de Newton-Raphson

- Ventajas: técnica extremadamente eficaz
- Dificultad: Necesidad de conocer la derivada de f en cada aproximación.
- Con frecuencia f es difícil de obtener y requiere de más operaciones aritméticas para calcularse que f(x).
- A fin de evadir el problema de la evaluación de la derivada en el Método de Newton se lleva a cabo una pequeña variante: Método de la secante.

---

### Teoría General de la iteración

#### Introducción

- Se presenta con frecuencia la necesidad de resolver:

  $$
  f(x) = 0
  $$

- $f(x)$ es una función de variable real $x$ con coeficientes reales
- Hallar valores numéricos de la variable independiente $x$, llamadas raíces.
- Razón fundamental para resolver ec. no lineales es que carecen de solución exacta en la mayoría de las veces.
- Objetivo: Resolución numérica de ecuaciones mediante la aplicación de métodos iterativos, y además, haciendo uso de los resultados a los cuales ha llegado la **TEORÍA GENERAL DE LA ITERACIÓN**.
- Esta teoría permite categorizar los métodos recursivos o iterativos.
- Permite elaborar métodos que pueden clasificarse como muy rápidamente convergentes.
- Se obtienen valores altamente precisos luego de ejecutar un número relativamente bajo de pasos en el procesamiento.

#### Método de iteración

- Para calcular $r$ de la ecuación $f(x) = 0$ por el **MÉTODO DE ITERACIÓN**, es necesario reescribir la expresión analítica de la ecuación dada, en la forma:

  $$
  f_1(x) = f_2(x)
  $$

- Esto requiere la mayoría de las veces un sencillo tratamiento algebraico de la ecuación dada.
- Si en un entorno del punto común o de intersección de ambas curvas, en la figura siguiente:

  $$
  y_1 = f1(x); \quad y_2 = f2(x)
  $$

#### Figura 2.4 -
![Figura.2.4](./img/figura-2-4.png)

- en un entorno del punto $x = r$, la pendiente de la curva $|f_1'(x)| < $ la pendiente de la curva $|f_2'(x)|$

---

- El proceso que es necesario realizar se sintetiza así:

  $$
  \begin{array}{l}
  x_0 \Rightarrow f_1(x_0) = f_2(x_1) \Rightarrow x_1 \\
  x_1 \Rightarrow f_1(x_1) = f_2(x_2) \Rightarrow x_2 \\
  x_2 \Rightarrow f_1(x_2) = f_2(x_3) \Rightarrow x_3 \\
  \vdots \\
  x_n \Rightarrow f_1(x_n) = f_2(x_{n+1}) \Rightarrow x_{n+1}
  \end{array}
  $$

- lo cual permite obtener, si el proceso resultase convergente, al valor aproximado $r$, de la raíz buscada.

- Si se parte un $x_0$ y se procede sistemáticamente se obtendrán valores $x_1; x_2; x_3$ que convergen hacia la raíz $r$ buscada.

#### Figura 5.2
![Figura.5.2](./img/figura-5-2.png)
Se representan dos funciones:
- \(y=f_1(x)\), creciente
- \(y=f_2(x)\), decreciente

Ambas curvas se cortan en \(x=r\), que corresponde a la solución del problema:
\[
f_1(x)=f_2(x)
\]

Los puntos \(x_0, x_1, x_2, x_3, x_4\) representan aproximaciones sucesivas a la solución \(r\), obtenidas por un procedimiento iterativo.

**Idea clave**
La solución buscada es la abscisa del punto de intersección entre ambas curvas.

---

- Si las derivadas $f1'(x)$ y $f2'(x)$, en un entorno del punto $x = r$, tiene igual signo, como se indica en la figura (1) y recibe el nombre de **ESCALERA**.
- Si los signos de las pendientes de las curvas involucradas son diferentes, la aproximación se llama en **ESPIRAL**, como se muestra en la figura (2).

*Teorema del Valor Medio:* Dados dos puntos $a, b$; en una curva $y = f(x)$; en que $f(x)$ tiene una derivada continua, la pendiente de la cuerda entre $a$ y $b$, $f(b) - f(a)/b-a$ es igual a la pendiente de la tangente a la curva en algún punto intermedio.

#### Convergencia del Método de Iteración

- Condición de convergencia: demostrar que $x_{n+1}$ es una mejor aproximación a la raíz $r$ que $x_n$. Para ello, por ser $f_1(r) = f_2(r)$, entonces:

  $$
  f_1(r) - f_1(x_n) = f_2(r) - f_2(x_{n+1})
  $$

- Aplicando el teorema del valor medio a a.m. y tomando módulos, resulta:

  $$
  \left| r - x_n \right| \cdot \left| f_1'(\xi_1) \right| = \left| r - x_{n+1} \right| \cdot \left| f_2'(\xi_2) \right|
  $$

- donde, $r < \xi_1 < x_n$; $r < \xi_2 < x_{n+1}$

- Como $x_n \cong x_{n+1}$

- entonces $\xi_1 \cong \xi_2$

- cuando el proceso se encuentra en estado relativamente avanzado; es decir cuando el valor de $x_n$ está próximo al de la raíz $r$.

- En todo punto de un entorno de $x = r$, por hipótesis se cumple que:

  $$
  \left| f'_1(x) \right| < \left| f'_2(x) \right|
  $$

- Debe ser: $\left| r - x_{n+1} \right| < \left| r - x_n \right|$

- es decir que, la aproximación de orden $n+1$ de la raíz $r$ es mejor que la aproximación anterior, de orden $n$.

#### Punto fijo

Como se dijo antes, los métodos abiertos emplean una fórmula para predecir la raíz. Esta fórmula puede desarrollarse como una iteración simple de punto fijo (también llamada iteración de un punto o sustitución sucesiva o método de punto fijo), al arreglar la ecuación $f(x) = 0$ de tal modo que $x$ esté del lado izquierdo de la ecuación:

$$
x = g(x) \tag{6.1}
$$

Esta transformación se realiza mediante operaciones algebraicas o simplemente sumando $x$ a cada lado de la ecuación original. Por ejemplo,

$$
x^2 - 2x + 3 = 0
$$

se arregla para obtener

$$
x = \frac{x^2 + 3}{2}
$$

mientras que $\sin x = 0$ puede transformarse en la forma de la ecuación (6.1) sumando $x$ a ambos lados para obtener

$$
x = \sin x + x
$$

#### Utilidad del método de iteración

- Uso más frecuente: cuando la expresión $f(x)$ se puede escribir como $x = g(x)$. Una de las derivadas es constantemente igual a uno. Si $x_0$ es una aproximación al valor de $r$, entonces, si es:

  $$
  |g'(x)| < 1
  $$

- resulta la siguiente sucesión de iteraciones:

  $$
  \begin{array}{l}
  x_1 = g(x_0) \\
  x_2 = g(x_1) \\
  \vdots \\
  x_n = g(x_{n-1}) \\
  x_{n+1} = g(x_n) \\
  \end{array}
  $$

#### El método gráfico de las dos curvas

**Planteamiento del problema.** Separe la ecuación $e^{-x} - x = 0$ en dos partes y determine su raíz en forma gráfica.

**Solución.** Reformule la ecuación como $y_1 = x$ y $y_2 = e^{-x}$, obtienen los siguientes valores:

| x | y₁ | y₂ |
|---|----|----|
| 0.0 | 0.0 | 1.000 |
| 0.2 | 0.2 | 0.819 |
| 0.4 | 0.4 | 0.670 |
| 0.6 | 0.6 | 0.549 |
| 0.8 | 0.8 | 0.449 |
| 1.0 | 1.0 | 0.368 |
![Representación gráfica](./img/figura-.png)

El método de las dos curvas también se utiliza para ilustrar la convergencia y divergencia de la iteración de punto fijo
Representación gráfica en $\mathrm{al}$ y $\mathrm{bl}$ de la convergencia. En $\mathrm{cl}$ y $\mathrm{dl}$ de la divergencia del método de punto fijo. Las gráficas $\mathrm{al}$ y $\mathrm{cl}$ tienen un comportamiento monótono; mientras que $\mathrm{bl}$ y $\mathrm{dl}$ tienen un comportamiento oscilatorio o en espiral. Deberá notar que la convergencia se obtiene cuando $\lg(\mathrm{al}) < 1$.

#### Teoría general de la iteración

- Problema a resolver:

- Nos ofrecen un crédito de 6000 dólares a devolver en 50 mensualidades de 150 dólares. Llamando C al importe del préstamo, n al número de pagos, a al importe del plazo e i al tipo de interés por período, se cumple la ecuación siguiente:

  $$
  C r ^{n} = a \frac {r ^{n} - 1}{r - 1}
  $$

- Obtener el interés del crédito partiendo de la estimación inicial de $r = 1,1$ y con una precisión $< 10^{-6}$.
- Resolver utilizando el método del punto fijo, tomando tres funciones diferentes para hacer el estudio, analizar en cada caso la convergencia del método.

- $f(x) = 0$, de modo gral., puede ser resuelta haciendo uso de la siguiente expresión recursiva:

  $$
  x_{n+1} = \phi(X_n) \quad \text{(*)}
  $$

- Los métodos categorizados como **MÉTODOS ITERATIVOS**; y se resuelven tomando $x_0$ como una 1era. aproximación de la raíz real $r$.
- Mediante (*) se puede generar una sucesión $x_0; x_1; x_2; \ldots; x_n$ que aproximan el valor $r$.
- Llamando $E_k = x_k - r$, de la raíz, resulta:

$$
x_0 = r + E_0; \quad x_1 = r + E_1; \quad \ldots; \quad x_n = r + E_n \tag{5.5}
$$

- Bajo condiciones expuestas, la sucesión $x_0; x_1; \ldots; x_n$ tenderá al valor $r$ si, para algún $k$ en adelante:

  - (5.6) $\left|E_k\right| > \left|E_{k+1}\right| > \left|E_{k+2}\right| > \ldots > \left|E_n\right| \rightarrow 0$

- Reemplazando los valores de $x_{n+1}$ y $x_n$ de la expresión (*), por los correspondientes dados en la (5.5), se obtiene (5.7):

  $$
  r + E_{n+1} = \phi(r + E_n)
  $$

- y, aplicando el teorema de TAYLOR al segundo miembro de (5.7), es:

$$
r + E_{n+1} = \phi(r) + E_n \phi'(r) + \frac{1}{2!} E_n^2 \phi''(r) + \dots
$$

- pero, dado que r es una raíz de la ecuación dada, finalmente resulta:

  $$
  E_{n+1} = E_n \phi'(r) + \frac{1}{2!} E_n^2 \phi''(r) + \frac{1}{3!} E_n^3 \phi'''(r) + \dots
  $$

- Considerando las consecuencias de este resultado tan importante, es posible distinguir los siguientes casos:

- Caso 1. - $\phi'(r) \neq 0$. Despreciando desde el término de 2do. orden en adelante, resulta:

  (5.9)

  $$
  E_{n+1} \cong E_n \phi'(r)
  $$

- Si $|\Phi'(r)| < 1$, \rightarrow, c/ término de:

  $$
  |E_k| > |E_{k+1}| > |E_{k+2}| > \dots > |E_n| \rightarrow 0
  $$

- será menor que el anterior, de tal modo que la sucesión $x_0; x_1; x_2; \dots; x_n$ tenderá al valor de r.

- Es un caso ITERACIÓN DE 1er. ORDEN DE CONVERGENCIA. Es un proceso lineal de En.

- Dado que el valor de r es desconocido, en (5.9), se puede reemplazar su valor por el de $x_n$.

- Caso 2. - $\phi'(r) = 0; \phi''(r) \neq 0$. Si se despreciara desde el 3er. orden y potencias superiores de $E_n$, (5.13)

  $$
  E_{n+1} \cong \frac{1}{2} \phi''(r) E_n^2
  $$

- Para que la sucesión $x_0; x_1; x_2$; ... converja a la raíz $r$, es necesario que la derivada $2da.$ sea finita y $E_0$ sea relativamente pequeño.

- Se puede deducir de (5.13) que cada error es proporcional al cuadrado del anterior \rightarrow velocidad de la convergencia, es mayor.

- ITERACIÓN DE 2do. ORDEN (caso de 2do. ORDEN DE CONVERGENCIA.

- Duplican el nro. de dígitos exactos en cada iteración; si en un cierto paso se mejora la aproximación de 4 a 8 decimales exactos, en el sgte. se mejorará de 8 a 16 decimales exactos.

- Caso 3. $\phi'(r) = 0; \phi''(r) = 0; \phi'''(r) \neq 0.$

  $$
  E_{n+1} = E_n \phi'(r) + \frac{1}{2!} E_n^2 \phi''(r) + \frac{1}{3!} E_n^3 \phi'''(r) + \dots
  $$

- De manera similar a lo anterior y realizando toda la operatoria, resulta la siguiente relación de errores:

  $$
  E_{n+1} \cong \frac{1}{3!} \phi'''(r) E_n^3
  $$

- Se presenta rara vez en la práctica, obtener una convergencia muy rápida;

- Desventaja: función como sus sucesivas derivadas, expresiones mucho más complejas que en los anteriores

- Consecuencia: el tiempo ganado debido a la rapidez de convergencia, dificultad de evaluación de la función y $s$ us derivadas.

- Se trata de una ITERACIÓN DE TERCER ORDEN o bien que, este caso es de TERCER ORDEN DE CONVERGENCIA.
- Siguiendo una metodología similar, pueden ser definidos órdenes de iteración o convergencia más altos.
- Rara vez se presentan en la práctica;
- La ventaja en el aumento en la velocidad de convergencia de los mayores órdenes, se ve neutralizada por la engorrosa evaluación de la función y sus sucesivas derivadas.

#### Proceso delta-cuadrado de Aitken ($\Delta^2$)

- Método idóneo para acelerar la convergencia de cualquier fórmula recursiva (proceso iterativo) de 1er. Orden.
- Sean $x_{n-1}$; $x_n$; $x_{n+1}$ aproximaciones sucesivas y consecutivas de la raíz $r$ de $f(x)=0$ obtenidas mediante un método de 1er. Orden DE CONVERGENCIA;
- Los errores $E_{n-1}$; $E_n$; $E_{n+1}$ correspondientes, están dispuestos $\approx$, según una progresión geométrica:

  $$
  \frac{E_{n+1}}{E_n} \cong \frac{E_n}{E_{n-1}}
  $$

- o, lo que resulta equivalente:

  $$
  \frac{x_{n+1} - r}{x_n - r} \cong \frac{x_n - r}{x_{n-1} - r}
  $$

- Ecuación que, resuelta en términos de $r$, resulta:

  $$
  r \cong \frac{x_{n-1} x_{n+1} - x_n^2}{x_{n+1} - 2 x_n + x_{n-1}}
  $$

- Sumando y restando al segundo miembro de esta última expresión, el término $x_{n+1}$, se obtiene:

  $$
  r \cong x_{n+1} + \frac{x_{n-1} x_{n+1} - x_n^2}{x_{n+1} - 2 x_n + x_{n-1}} - x_{n+1} = x_{n+1} - \frac{x_{n+1}^2 - 2 x_{n+1} x_n + x_n^2}{x_{n+1} - 2 x_n + x_{n-1}}
  $$

- y, en definitiva:

  $$
  r \cong x_{n+1} - \frac{(x_{n+1} - x_n)^2}{x_{n+1} - 2 x_n + x_{n-1}} \quad \tag{5.20}
  $$

- La metodología, haciendo uso de la expresión anterior:

  - Inicio con $x = x_0$, de cualquier algoritmo iterativo de 1er orden, se calculan dos aproximaciones sucesivas $x_1$; $x_2$ de la raíz $r$ que, juntamente con la primera aproximación $x_0$ constituyen la terna de base del método de AITKEN,
  - 2.- Haciendo uso de la expresión (5.20) se calcula una cuarta aproximación a la raíz $r$ que, si satisface las condiciones de precisión previamente establecidas para el cálculo, se toma como tal,
  - 3.- De no resultar satisfactoria la aproximación obtenida en el paso anterior, es utilizada como primera aproximación para hallar otros dos valores sucesivos de la raíz, mediante el método iterativo original.

- 4.- Se reiteran los puntos 2 y 3 hasta satisfacer las condiciones de precisión previamente establecidas para la raíz.
- Ejemplo.-de iteración, conjuntamente con la aceleración de la convergencia de AITKEN, determinar la raíz comprendida en el intervalo (1;2) de la ecuación:

  $$
  e^x - x^2 - 3 = 0
  $$

- con una aproximación de cuatro cifras decimales exactas.

- Solución: Primero, y según las condiciones establecidas, es necesario volver a escribir la ecuación dada bajo la forma:

  $$
  x = \phi(x) = \sqrt{e^x - 3}
  $$

- de donde, puede deducirse que:

  $$
  \phi'(x) = \frac{e^x}{2\sqrt{e^x - 3}}
  $$

- En consecuencia, comenzando con $x_0 = 1$, es negativa la cantidad subradical del denominador, por lo tanto resulta conveniente hacer $x_0 = 1,1$. Con ello:

  $$
  \phi'(x) \cong 23,27
  $$

- Dado que el valor obtenido es > 1 \rightarrow no se generará un proceso convergente.
- **Resulta imprescindible** escribir la ecuación en forma diferente. Sea:

  $$
  x = \phi(x) = \ln(x^2 + 3)
  $$

- de donde:

  $$
  \phi'(x) = \frac{2x}{x^2 + 3}
  $$

- y finalmente, tomando $x_0 = 1$, resulta:

  $$
  \phi'(1) = 0,5
  $$

- valor aceptable, se requiere que

  $$
  |\phi'(r)| < 1
  $$

- Entonces la relación:

  $$
  x_{n+1} = \ln(x_n^2 + 3)
  $$

- con $x_0 = 1$, es idónea para iniciar el procedimiento descrito, resultando:

  $$
  x_0 = 1 \quad ; \quad x_1 = 1,38629 \quad ; \quad x_2 = 1,59367
  $$

- Utilizando los valores hallados con el objeto de la aplicación de la expresión (5.20), se obtiene:

  $$
  x_3 = 1,83405
  $$

- Aplicando nuevamente el método de iteración original, da como resultado:

  $$
  x_4 = 1,85062 \quad ; \quad x_5 = 1,86016
  $$

- valores que, juntamente con el de $x_3$ y la reiteración de la fórmula de recurrencia (5.20), arroja:

  $$
  x_6 = 1,87311
  $$

- Tomando $x_6$ valor como primera aproximación del método de iteración, resultan:

  $$
  x_7 = 1,87311 \quad ; \quad x_8 = 1,87311
  $$

- En los tres últimos resultados no se ha obtenido mejoría alguna, pudiéndose aceptar $r=1,87311$ como valor de la raíz con todas sus cifras decimales exactas.
- Resolver el mismo problema utilizando Método de Iteración y comparar el nro. de iteraciones requerido

#### Método de segundo orden de Newton

- Ventajas: Muy rápida convergencia a la solución deseada, Aproximación extremadamente cercana al valor de la raíz con un bajo número de pasos y un mínimo de cálculo.
- Limitaciones: Utilización en ecuaciones que tienen derivadas de mayor orden (por lo menos de segundo), relativamente fáciles de programar y calcular.
- Considérese una ecuación de la forma: $f(x) = 0$
- un valor aproximado de la raíz, el que puede ser uno de los extremos de algún intervalo de separación y llamando
- $x = x_n$ a este punto.

- Desarrollando la función $f(x)$ en serie de TAYLOR con respecto a $x = x_n$ se obtiene: $(**)$

  $$
  f(x_{n+1}) = f(x_n) + f'(x_n)h + \frac{f''(x_n)h^2}{2!} + \dots
  $$

- Si $h$ fuera el incremento particular de $x$ para el cual la serie dada por $(**)$ se redujera a cero, la cantidad $x_n + h$ sería la raíz exacta, como se muestra en la figura 5.4.

#### Figura 5.4 - Interpretación del incremento \(h\)
![Figura 5.4](./img/figura-5-4.png)

**Idea clave**
Gráfico de la función \( y = f(x) \) con un punto \( x_n \) sobre el eje \( x \) y la raíz \( r = x_{n+1} \) marcada.

Ilustra que \( h \) es el incremento que corrige \( x_n \) para aproximarse a la raíz, es decir:

\[
x_{n+1} = x_n + h
\]

---

- Vale decir, haciendo uso de solamente los tres primeros términos de la serie dada por (5.21), resulta:

  $$
  f(x_n) + h\left[f'(x_n) + \frac{f''(x_n)h}{2}\right] = 0
  $$

- Un valor aproximado de h, a partir de la expresión (5.22) y sumado a $x_n$ no proporcionará el valor exacto de la raíz, ya que fueron utilizados para su cálculo, solo los tres primeros términos de la serie infinita (5.21).
- Pero se obtendrá una aproximación mejor de la raíz.
- Sustituyendo el valor de h encerrado dentro del corchete por la expresión dada por NEWTON-RAPHSON, que es:

  $$
  h = x_{n+1} - x_n = - \frac{f(x_n)}{f'(x_n)}
  $$

- se obtiene:

  $$
f(x_n) + h \left[ f'(x_n) + \frac{f''(x_n)h}{2} \right] = 0
$$

$$
f(x_n) + h \left[ f'(x_n) - \frac{f''(x_n)f(x_n)}{2f'(x_n)} \right] = 0
$$

- y despejando el valor de h, resulta:

  $$
  h = x_{n+1} - x_n = - \frac{f(x_n)}{f'(x_n) - \frac{f''(x_n)f(x_n)}{2f'(x_n)}}
  $$

- finalmente, despejando $x_{n+1}$, se obtiene:

  $$
  x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n) - \frac{f''(x_n)f(x_n)}{2f'(x_n)}}
  $$

- Con aplicaciones sucesivas, es posible calcular en cada paso, aproximaciones cada vez más cercanas a la raíz, con elevada velocidad de convergencia.
- Para funciones de 2do. orden de convergencia, es el equivalente a DELTA-cuadrado de AITKEN, aplicado a ec. de 1er. orden de convergencia, para acelerar la misma.

#### Tabla Comparativa de Métodos

| Newton-Raphson | 2do. orden de Newton | Iteración |
|----------------|----------------------|-----------|
| Necesita un buen valor inicial | Converge más rápido aún | Convergencia lenta |
| Evalua en cada paso la función y su derivada | Aproximación extremadamente cercana a r con un mínimo de pasos | Gran sencillez y flexibilidad para elegir la forma de las funciones |
| Error por redondeo no se incrementa | Limitado a ec. con deriv.de orden superior simples | |
| Aplicable a raíces complejas. Derivada puede no existir en todos los puntos | Aplicable a raíces complejas | |

#### Conclusiones:

- No existe ningún método que sea la panacea universal, la selección del mismo depende de la función particular f(x).
- Un programa eficiente debe producir una aproximación a una o más soluciones de f(x) = 0, teniendo cada una un error absoluto o relativo dentro de la tolerancia fijada y el resultado debe generarse en un tiempo razonable.
- Existe numeroso software que contiene desarrollos de los métodos numéricos, por ejemplo:
  - Subrutinas en la biblioteca ISML (International Mathematical Software Library) (EEUU)
  - Subrutinas NAG (Numerical Algorithms Group) (Gran Bretaña)
  - Subrutinas NUMERICAL RECIPES en Fortran 77, Pascal y C (Cambridge University Press) (Gran Bretaña)
  - MATLAB: Paquete de cálculo numérico: ROOTS : para calcular todas las raíces reales como complejas
  - MATHEMATICA- Paquete de cálculo simbólico con funciones ya programadas.

## Unidad 4: Solución de Sistemas de Ecuaciones

Temas a desarrollar:
- Método de Gauss.
- Método de Gauss-Jordan.
- Método de Gauss-Seidel.
- Condiciones de convergencia para métodos iterativos y estimación del error.

---

### Ecuaciones lineales simultáneas

Los sistemas de ecuaciones lineales se utilizan en muchos problemas de ingeniería y de las ciencias.

También aparecen en aplicaciones matemáticas a las ciencias sociales y al estudio cuantitativo de problemas de administración y economía.

Se tiene un sistema con `n` ecuaciones y `m` incógnitas (orden `n × m`).

- Si los `C_i` no son simultáneamente nulos, el sistema es **no homogéneo**, y las ecuaciones deben ser linealmente independientes (LI) para obtener soluciones únicas.
- Si todos los `C_i` valen `0`, el sistema es **homogéneo**, y solo existen soluciones no triviales si todas las ecuaciones no son LI.

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1m}x_m = C_1 \\\\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2m}x_m = C_2 \\\\
\vdots \\\\
a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nm}x_m = C_n
\end{cases}
$$

o, en forma compacta:

$$
\sum_{j=1}^{m} a_{ij}x_j = C_i \qquad i = 1,2,\dots,n
$$

$$
A X = C
$$

- Si a la matriz `A` se le adiciona la columna formada por `C`, se obtiene la **matriz orlada** o **ampliada**.
- Se llama **rango** de una matriz `A` al máximo número de filas linealmente independientes de `A`.
- Sean `r` y `r'` las características (rangos) de la matriz del sistema `A` y de la matriz orlada `A'`, respectivamente.

Llamando:

- `r`: característica de la matriz del sistema
- `r'`: característica de la matriz orlada
- `m`: número de variables del sistema
- `n`: número de ecuaciones del sistema

todo lo referente al comportamiento algebraico de los sistemas de ecuaciones se sintetiza en el:

#### Teorema de Rouché-Frobenius

> La condición necesaria y suficiente para que un sistema de `n` ecuaciones y `m` incógnitas sea **compatible**, es que la matriz `A` y la orlada `A'` tengan la misma característica.

Casos:

- Si `r ≠ r'`: sistema **incompatible** → no tiene solución.
- Si `r = r'` y `r = m`: sistema **determinado** → una solución.
- Si `r = r'` y `r < m`: sistema **indeterminado** → infinitas soluciones, con grado de indeterminación `m - r`.

- Si `r > m` (caso no contemplado en el teorema de Rouché-Frobenius), el sistema es **sobredeterminado**.

Los principales métodos algebraicos para resolver ecuaciones lineales simultáneas son:

- **A)** método de eliminación de incógnitas mediante combinaciones lineales (**Gauss**)
- **B)** utilización de determinantes (**regla de Cramer**)

La regla de Cramer, calculando determinantes por medio de menores, requiere `(n - 1)(n + 1)!` productos, por lo que resulta poco práctica para resolver sistemas grandes.

Supondremos a continuación que `A` es una matriz de `n × m`, formada por ecuaciones linealmente independientes.

Para resolver numéricamente este tipo de sistemas se utilizan:

**Métodos directos**

Son provistos por la matemática pura y llevan a una solución exacta del problema luego de un número finito de pasos. Este número depende exclusivamente de la cantidad de ecuaciones que componen el sistema.

El error de los resultados se debe, si no hubiese errores inherentes en los parámetros, únicamente a los redondeos realizados durante los cálculos.

**Métodos iterativos**

Los métodos iterativos son estrictamente numéricos y dan una solución aproximada del sistema de ecuaciones lineales, obtenida como límite de una sucesión de vectores construida mediante un proceso de aproximaciones sucesivas.

### Sistemas no homogéneos

#### Método de eliminación de Gauss

Dado un conjunto de `n` ecuaciones con `n` incógnitas, linealmente independientes, se trata de lograr un sistema triangular equivalente, que se resuelve con facilidad mediante la denominada **sustitución inversa**.

La técnica se basa en dos fases:

1. Eliminación de las incógnitas.
2. Solución mediante sustitución hacia atrás.

El esquema de Gauss se inicia reduciendo un conjunto de ecuaciones simultáneas:

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1m}x_m = C_1 \\\\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2m}x_m = C_2 \\\\
\vdots \\\\
a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nm}x_m = C_n
\end{cases}
$$

a un sistema triangular de la forma:

$$
\begin{cases}
a_{11}^{(1)}x_1 + a_{12}^{(1)}x_2 + \cdots + a_{1n}^{(1)}x_n = C_1^{(1)} \\\\
a_{22}^{(2)}x_2 + a_{23}^{(2)}x_3 + \cdots + a_{2n}^{(2)}x_n = C_2^{(2)} \\\\
\vdots \\\\
a_{nn}^{(n-1)}x_n = C_n^{(n-1)}
\end{cases}
$$

Los superíndices indican los nuevos coeficientes que se forman en el proceso de reducción.

1. Eliminación de las incógnitas

El paso inicial será eliminar la primera incógnita `x_1` desde la segunda hasta la `n`-ésima ecuación.

Para ello, se multiplica la ecuación inicial por `a_{21}/a_{11}`.

El proceso de multiplicación del primer renglón por `a_{21}/a_{11}` es equivalente a dividirla entre `a_{11}` y multiplicarla por `a_{21}`.

Luego se resta esa ecuación transformada de la segunda fila, obteniéndose una nueva ecuación con coeficientes modificados. El superíndice prima indica que los elementos han cambiado sus valores originales.

El procedimiento continúa con las ecuaciones restantes; por ejemplo, la primera ecuación se puede multiplicar por `a_{31}/a_{11}` y el resultado se resta de la tercera ecuación.

El procedimiento se repite y da como resultado un sistema modificado.

- La ecuación utilizada para eliminar las incógnitas se denomina **ecuación pivote**.
- El coeficiente de la incógnita que se va a eliminar en las ecuaciones que la siguen se denomina **coeficiente pivote** o **elemento pivote**.
- Luego se repite el procedimiento para eliminar la segunda incógnita.

2. Aplicando un procedimiento similar a todas las ecuaciones con coeficientes `a'_{ij}`, se elimina `x_2` desde la tercera ecuación en adelante.

Este procedimiento, utilizando diferentes ecuaciones pivote, se continúa hasta que el conjunto original haya sido reducido a uno de forma triangular.

3. Una vez obtenido el sistema triangular, la última ecuación suministra directamente el valor de `x_n`.

El valor obtenido se sustituye en la penúltima ecuación para obtener el valor de `x_{n-1}`, y así sucesivamente.

Este procedimiento es el denominado **sustitución inversa**.

El número de ecuaciones que se pueden resolver satisfactoriamente es de aproximadamente **20 a 25**, por efecto de la propagación de errores.

#### Costo computacional

El número total de operaciones aritméticas en el algoritmo se puede calcular mediante fórmulas para:

- multiplicaciones/divisiones
- adiciones/sustracciones

El tiempo necesario para determinar los cálculos, así como el subsecuente error de redondeo, depende de la cantidad de operaciones de aritmética de punto flotante que deben realizarse.

En una computadora, el tiempo que se tarda en realizar divisiones y multiplicaciones es más o menos igual, y resulta mayor que el de sumas y restas.

Para valores grandes de `n`:

- el número total de multiplicaciones y divisiones es aproximadamente `n^3 / 3`
- de modo similar, el número total de adiciones y sustracciones también crece aproximadamente con `n^3`

**Tabla de crecimiento**

| n | Multipl./Divisiones | Adiciones/Sustracciones |
|---:|---:|---:|
| 3 | 17 | 11 |
| 10 | 430 | 375 |
| 50 | 44150 | 42875 |
| 100 | 343300 | 338250 |

#### Método de eliminación de Gauss — Ejemplo

Resolver el sistema:

$$
\begin{cases}
2x_1 + 2x_2 - 5x_3 = 13 \\\\
2x_1 + 3x_2 + 4x_3 = 20 \\\\
3x_1 - x_2 + 3x_3 = 10
\end{cases}
$$

**Solución**

El procedimiento conduce al sistema triangular equivalente y, mediante sustitución inversa, se obtiene:

$$
x_1 = 1,\qquad x_2 = 2,\qquad x_3 = 3
$$

**Eliminación de Gauss — Resolución del sistema lineal `n × n`**

Entrada
- número de incógnitas y de ecuaciones `n`
- matriz ampliada `A = (a_{ij})`, con `1 \le i \le n` y `1 \le j \le n+1`

Salida
- soluciones, o mensaje: **“no tiene solución única”**

Algoritmo

1. Para `i = 1, ..., n-1`, realizar los pasos 2 a 4.
2. Sea `p` el entero más pequeño con `i \le p \le n` y `a_{pi} \ne 0`.
3. Si no puede encontrarse tal `p`, entonces: **OUTPUT("no existe solución única")** y detener.
4. Si `p \ne i`, intercambiar `E_p \leftrightarrow E_i`.
5. Para `j = i+1, ..., n`, realizar pasos 5 y 6.
6. Sea `m_{ji} = a_{ji} / a_{ii}`.
7. Realizar `E_j - m_{ji}E_i \to E_j`.
8. Si `a_{nn} = 0`, entonces: **OUTPUT("no existe solución única")** y detener.
9. Sea `x_n = a_{n,n+1} / a_{nn}`.
10. Para `i = n-1, ..., 1`, sea:

$$
x_i = \frac{1}{a_{ii}}\left(a_{i,n+1} - \sum_{j=i+1}^{n} a_{ij}x_j\right)
$$

11. Output: `(x_1, ..., x_n)`.

**Estrategias de pivoteo**

Al obtener el algoritmo anterior, encontramos que era necesario un intercambio de renglones cuando uno de los elementos pivote es cero.

El intercambio de renglones tiene la forma:

$$
E_k \leftrightarrow E_p
$$

donde `p` es el entero más pequeño mayor que `k` tal que el correspondiente elemento pivote no sea cero.

Para reducir el error de redondeo, frecuentemente es necesario realizar intercambios de renglones aun cuando los elementos pivote no sean nulos.

**Implementación en la computadora**

Se requiere utilizar matrices al programar. El dato es la matriz orlada, donde para conservar la homogeneidad se debe hacer:

$$
C_i = a_{i,n+1}
$$

Se utiliza la fórmula:

$$
a'_{ij} = a_{ij} - \frac{a_{ik}}{a_{kk}}a_{kj}
$$

para los índices correspondientes del proceso.

donde:

- `a`: elemento de la matriz orlada
- `a'`: elemento de la matriz transformada
- `i`: número de fila
- `j`: número de columna
- `k`: identificación de la fila pivote
- `n`: cantidad de filas
- `m`: cantidad de columnas de la matriz orlada (`n + 1`)

Aplicando reiteradamente el proceso se llega a obtener un sistema triangular.

El proceso de sustitución inversa se puede generalizar así:

$$
x_n = \frac{a_{nm}}{a_{nn}}
$$

y para `i = n-1, n-2, ..., 1`:

$$
x_i = \frac{1}{a_{ii}}\left(a_{im} - \sum_{j=i+1}^{n} a_{ij}x_j\right)
$$

**Consideraciones**

- Se ha supuesto que cada elemento pivote es no nulo.
- Si no fuera el caso, el procedimiento debe modificarse para permitir el intercambio de filas.
- Para obtener mayor precisión, cada reducción debería realizarse utilizando como fila pivote aquella que tenga el mayor elemento pivote.

### Método de Gauss-Jordan

Constituye una variación del método de eliminación de Gauss. Permite resolver hasta **20 o 25 ecuaciones simultáneas**.

Se distingue del método de Gauss en que, cuando se elimina una incógnita, esta es eliminada de **todas** las ecuaciones restantes:

- tanto de las que preceden a la ecuación pivote
- como de las que la siguen

**Pasos a seguir**

1. Dividir la primera ecuación del sistema por el coeficiente de la primera incógnita de esa misma ecuación.
2. Formar otro sistema con la ecuación así obtenida y esa misma multiplicada por los coeficientes de la primera incógnita de las otras ecuaciones.
3. Restar la segunda y tercera ecuaciones del segundo sistema de sus homólogas del primero, dejando la primera sin modificaciones.

Los pasos descriptos se pueden realizar utilizando fórmulas para determinar todos los elementos de la nueva matriz.

Si `a` son los elementos de la matriz procesada y `b` los de la matriz resultante, se actualizan las filas y columnas según las expresiones indicadas en el apunte.

**Precauciones**

Si el elemento pivote `a_{11} = 0`, el programa debería incluir la lógica necesaria para verificar que el pivote en cada una de las matrices sea diferente de cero y efectuar, consecuentemente, el intercambio de filas si fuese necesario.

El intercambio de renglones no alterará el orden de las incógnitas en la matriz columna final.
Cuando `a_{11}` sea muy pequeño en comparación con el orden de magnitud general de los otros elementos de la columna, su utilización podría disminuir la precisión.
Es conveniente agregar al programa la codificación que permita comparar los valores absolutos de los coeficientes de la primera columna y poner como ecuación pivote la que tenga el mayor coeficiente en la primera incógnita, en valor absoluto.

### Comparación de los métodos

**Método de eliminación de Gauss**
**Ventaja:** algoritmo de solución más básico.
**Desventaja:** solución de un único conjunto de ecuaciones lineales a la vez.

**Método de Gauss-Jordan**
**Ventaja:** base para calcular la inversa; puede resolver conjuntos múltiples de ecuaciones.
**Desventaja:** menos eficiente para un único conjunto de ecuaciones.

#### Gauss-Jordan — Ejemplo

Resolver mediante el método de Gauss-Jordan el sistema:

$$
\begin{cases}
2x_1 + 2x_2 - 5x_3 = 13 \\\\
2x_1 + 3x_2 + 4x_3 = 20 \\\\
3x_1 - x_2 + 3x_3 = 10
\end{cases}
$$

**Desarrollo resumido**

Se divide la primera ecuación por el coeficiente de la primera incógnita y luego se usa para eliminar dicha incógnita de las restantes. El proceso se repite con la segunda y luego con la tercera variable, hasta obtener el sistema identidad.

**Resultado final**

$$
x_1 = 1,\qquad x_2 = 2,\qquad x_3 = 3
$$

---

### Método de Gauss-Seidel

Es un método clasificado como **iterativo**.

**Desventaja:** No siempre converge a una solución, o en ocasiones lo hace muy lentamente.

**Ventajas:**
- Adecuado para resolver sistemas con centenares de ecuaciones e incógnitas, ya que reduce el número de operaciones aritméticas y los efectos de la propagación de errores en las mismas.
- En sistemas con altos porcentajes de 0, son eficientes tanto en almacenamiento de computadora como en el tiempo de cálculo.

**Definición:** Una matriz cuadrada \(A\) recibe la denominación de **diagonalmente dominante** si:

\[
a_{ii} \ge \sum_{j \ne i} a_{ij}, \quad \forall i
\]

con desigualdad estricta, para por lo menos una de las \(i\).

La condición para que el método de Gauss-Seidel, aplicado a un sistema de ecuaciones lineales simultáneas, sea convergente, es que la matriz \(A\), de coeficientes del sistema, debe ser **diagonalmente dominante**.

Un sistema diagonalmente dominante es condición **suficiente** para asegurar la convergencia, pero no es condición **necesaria**.

**Pasos para la aplicación del método de Gauss-Seidel:**

1. Asignar un valor inicial a cada incógnita. Si es posible hacer una hipótesis razonable, se mejorará substancialmente la rapidez de convergencia; si no, fijar arbitrariamente estos valores.
2. Partiendo de la primera ecuación, determinar un nuevo valor para la incógnita dominante, utilizando para las otras incógnitas los valores supuestos según lo descripto en 1.
3. Pasar a la segunda ecuación y calcular el valor de la incógnita dominante, utilizando para ello el ya calculado en el paso anterior y los valores supuestos en las otras incógnitas.
4. Reiterar el procedimiento descripto con todas las demás ecuaciones, siempre para la incógnita dominante, utilizando los últimos valores calculados. Completado este paso se dice que se ha concluido una **iteración**.
5. Iterar los pasos 2, 3 y 4 hasta que el valor de cada incógnita difiera del valor respectivo obtenido en la iteración previa, en una cantidad menor que un \(E\) positivo y arbitrario previamente fijado.

#### Algoritmo de Gauss-Seidel

**Entrada**
- Número de ecuaciones e incógnitas \( n \).
- Elementos de la matriz \( A \) (\( a_{ij} \)).
- Vector \( b \) (\( b_i \)).
- Aproximación inicial \( x^{(0)} \).
- Tolerancia \( TOL \).
- Número máximo de iteraciones \( N \).

**Salida**
- Solución aproximada \( x_1, \dots, x_n \).
- Mensaje si se excede el número máximo de iteraciones.

**Pasos**
1. Inicializar \( k = 1 \).
2. Mientras \( k \leq N \):
   3. Para \( i = 1, \dots, n \):
      \[
      x_i = \frac{-\sum_{j=1}^{i-1} a_{ij} x_j - \sum_{j=i+1}^{n} a_{ij} x0_j + b_i}{a_{ii}}
      \]
   4. Si \( \|x - x0\| < TOL \), salir con la solución \( (x_1, \dots, x_n) \).
   5. Incrementar \( k = k + 1 \).
   6. Actualizar \( x0_i = x_i \).
7. Si se excede \( N \), salir con mensaje de "numero máximo de iteraciones excedido". PARAR.

#### Consideraciones Adicionales sobre el Método de Gauss-Seidel

En el **Paso 3 del algoritmo de Gauss-Seidel**, se requiere que cada elemento diagonal \( a_{ii} \) de la matriz \( A \) sea distinto de cero. Esto se debe a que, durante el proceso iterativo, se divide por \( a_{ii} \) para calcular el nuevo valor de cada incógnita.

- **Si \( a_{ii} = 0 \) y el sistema es no singular:**
  - Es posible **reordenar las ecuaciones** del sistema para que ningún \( a_{ii} \) sea cero.
  - Esto garantiza que el método pueda aplicarse sin problemas.

Para **acelerar la convergencia** del método de Gauss-Seidel, los elementos diagonales \( a_{ii} \) deberían ser:
- **Lo más grandes posible** en valor absoluto, en comparación con los demás elementos de su fila.
- Esto hace que la matriz sea **más diagonalmente dominante**, mejorando la estabilidad y velocidad de convergencia del método.

---

#### Ejemplo

Sistema de Ecuaciones
\[
\begin{cases}
2x_1 + 10x_2 + x_3 = 51 \\
x_1 + 2x_2 + 10x_3 = 61 \\
10x_1 + x_2 + 2x_3 = 44
\end{cases}
\]

Iteraciones
1. **Primera iteración** (valores iniciales \( x_1 = x_2 = x_3 = 0 \)):
   \[
   x_2 = 5.1, \quad x_3 = 5.08, \quad x_1 = 2.874
   \]

2. **Segunda iteración**:
   \[
   x_2 = 4.0172, \quad x_3 = 5.00916, \quad x_1 = 2.996448
   \]

3. **Tercera iteración**:
   \[
   x_1 = 2.999941296, \quad x_2 = 3.999794400, \quad x_3 = 5.000396320
   \]

**Criterio de parada:** Las diferencias entre iteraciones son menores que \( E = 0.02 \).

Conclusión
La precisión no depende exclusivamente del valor de \(E\), sino también de la velocidad de convergencia; es decir, que las diferencias de los resultados obtenidos en dos iteraciones consecutivas pueden diferir en menos de un \(E\), aun cuando estos resultados se encuentren lejos de los verdaderos valores de las incógnitas.

Para obtener mayor seguridad y precisión se recomienda utilizar las ecuaciones de error para concluir la aproximación de las incógnitas.

---

### Introducción — Factorización LU

La eliminación de Gauss resuelve de forma satisfactoria sistemas de la forma:

\[
A \cdot x = b
\]

Resulta ineficiente cuando deben resolverse ecuaciones con los mismos coeficientes \(A\), pero con diferentes constantes del lado derecho \(b\).

Los métodos de descomposición LU separan el tiempo usado en las eliminaciones para la matriz \(A\) de las manipulaciones en el lado derecho \(b\).

Una vez que \(A\) se ha descompuesto, los múltiples vectores del lado derecho \(b\) se pueden evaluar de manera eficiente.

---

Suponga que la matriz \(A\) es una matriz \(m \times n\) y se puede escribir como el producto de dos matrices:

\[
A = L U
\]

donde \(L\) es una matriz triangular inferior con números 1 en la diagonal y \(U\) es una matriz triangular superior.

Entonces, para resolver el sistema:

\[
A x = b
\]

escribimos:

\[
A x = (L U)x = L(Ux)
\]

Una posible estrategia de solución consiste en tomar:

\[
y = Ux
\]

y resolver para \(y\):

\[
Ly = b
\]

Como la matriz \(L\) es triangular inferior, este sistema puede resolverse mediante sustitución hacia adelante. Una vez encontrados los valores de \(y\), las incógnitas del sistema inicial se obtienen despejando \(x\) de:

\[
Ux = y
\]

#### Pasos en la descomposición LU

1. **Paso de descomposición LU:**
   \(A\) se factoriza o “descompone” en las matrices triangulares inferior \(L\) y superior \(U\).

2. **Paso de la sustitución:**
   \(L\) y \(U\) se usan para determinar una solución \(\{X\}\) para un lado derecho \(b\). Este paso se divide en dos:
   - Primero, la ecuación \(Ly=b\) se usa para generar un vector intermedio \(y\) mediante sustitución hacia adelante.
   - Después, el resultado se sustituye en la ecuación \(Ux=y\), que se resuelve por sustitución hacia atrás para \(x\).

#### Observaciones sobre \(U\)

Usando la descomposición LU como versión de la eliminación de Gauss:

\[
U =
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a'_{22} & a'_{23} \\
0 & 0 & a''_{33}
\end{bmatrix}
\]

Se observa fácilmente que \(U\) es el resultado directo de la eliminación hacia adelante.

Para un sistema de tres ecuaciones:

\[
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2 \\ x_3
\end{bmatrix}
=
\begin{bmatrix}
b_1 \\ b_2 \\ b_3
\end{bmatrix}
\]

El primer paso en la eliminación de Gauss consiste en multiplicar el renglón 1 por el factor:

\[
f_{21} = \frac{a_{21}}{a_{11}}
\]

y restar el resultado al segundo renglón para eliminar \(a_{21}\).

De forma similar, el renglón 1 se multiplica por:

\[
f_{31} = \frac{a_{31}}{a_{11}}
\]

y el resultado se resta al tercer renglón para eliminar \(a_{31}\).

El paso final es multiplicar el segundo renglón modificado por:

\[
f_{32} = \frac{a'_{32}}{a'_{22}}
\]

y restar el resultado al tercer renglón para eliminar \(a'_{32}\).

De ello resulta:

\[
L =
\begin{bmatrix}
1 & 0 & 0 \\
f_{21} & 1 & 0 \\
f_{31} & f_{32} & 1
\end{bmatrix}
\]

---

#### Ejemplo — Resolver utilizando la descomposición LU

Resolver el siguiente sistema de ecuaciones utilizando la descomposición LU:

\[
\begin{cases}
4x_1 - 2x_2 + x_3 = 11 \\
20x_1 - 7x_2 + 12x_3 = 70 \\
-8x_1 + 13x_2 + 17x_3 = 17
\end{cases}
\]

De forma matricial:

\[
Ax = B
\]

Obtención de \(U\)

Aplicando eliminación de Gauss obtenemos:

\[
\begin{bmatrix}
4 & -2 & 1 \\
20 & -7 & 12 \\
-8 & 13 & 17
\end{bmatrix}
\sim
\begin{bmatrix}
4 & -2 & 1 \\
0 & 3 & 7 \\
0 & 9 & 19
\end{bmatrix}
\sim
\begin{bmatrix}
4 & -2 & 1 \\
0 & 3 & 7 \\
0 & 0 & -2
\end{bmatrix}
\ = U
\]

Luego, para \(L\):

\[
f_{21} = \frac{20}{4} = 5, \qquad f_{31} = \frac{-8}{4} = -2, \qquad f_{32} = \frac{9}{3} = 3
\]

Por tanto:

\[
L =
\begin{bmatrix}
1 & 0 & 0 \\
5 & 1 & 0 \\
-2 & 3 & 1
\end{bmatrix}
\]

Resolver \(Ly = b\)

\[
\begin{bmatrix}
1 & 0 & 0 \\
5 & 1 & 0 \\
-2 & 3 & 1
\end{bmatrix}
\begin{bmatrix}
y_1 \\ y_2 \\ y_3
\end{bmatrix}
=
\begin{bmatrix}
11 \\ 70 \\ 17
\end{bmatrix}
\]

De donde:

\[
y_1 = 11,\qquad y_2 = 15,\qquad y_3 = -6
\]

Resolver \(Ux = y\)

\[
\begin{bmatrix}
4 & -2 & 1 \\
0 & 3 & 7 \\
0 & 0 & -2
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2 \\ x_3
\end{bmatrix}
=
\begin{bmatrix}
11 \\ 15 \\ -6
\end{bmatrix}
\]

Entonces:

\[
x_3 = 3,\qquad x_2 = -2,\qquad x_1 = 1
\]

---

Se considerará la solución de ecuaciones algebraicas lineales simultáneas homogéneas, que tienen la forma:

\[
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = 0 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = 0 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = 0
\end{cases}
\tag{6.20}
\]

El sistema puede escribirse en notación matricial como:

\[
A \cdot X = 0
\tag{6.21}
\]

---

### Generalidades

- Un conjunto de ecuaciones homogéneas como el (6.20) tiene siempre una solución, ya que la matriz ampliada y la del sistema presentan el mismo rango.
- Si el rango \(r\) de la matriz de coeficientes del conjunto de ecuaciones es igual al orden \(n\), el sistema tiene una única solución, que es la denominada **solución trivial**:

\[
x_1 = x_2 = \cdots = x_n = 0
\]

- Para este conjunto de ecuaciones, todas las ecuaciones del sistema son linealmente independientes, por lo tanto:

\[
\det A \ne 0
\]

- Existen soluciones **no triviales** si, y solo si, \(r < n\).
- Entonces:

\[
\det A = 0
\]

- \(r\): número de ecuaciones linealmente independientes.
- \(n-r\): ecuaciones linealmente dependientes.
- Para este tipo de soluciones, no se encuentran valores únicos para las incógnitas. Se establecen relaciones entre las incógnitas.
- Cualquier combinación de valores de \(x_i\) que satisface estas relaciones constituye una solución.
- Los problemas más importantes que se plantean en la aplicación de ecuaciones homogéneas son aquellos denominados de **valores característicos**.

Cuando se trata de escribir un modelo matemático, las ecuaciones pueden expresarse, de manera cartesiana, en la forma:

\[
\begin{cases}
(a_{11}-\lambda)x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = 0 \\
a_{21}x_1 + (a_{22}-\lambda)x_2 + \cdots + a_{2n}x_n = 0 \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \cdots + (a_{nn}-\lambda)x_n = 0
\end{cases}
\tag{6.22}
\]

donde los \(a_{ij}\) son reales, las \(x_i\) son las variables del sistema y \(\lambda\) es un parámetro particular del sistema que tiene valores, en general, desconocidos.

En notación matricial:

\[
(A - \lambda I)X = 0
\tag{6.23}
\]

- Al incorporar la matriz identidad \(I\), se puede utilizar a \((A - \lambda I)\) como matriz de coeficientes.
- La matriz columna \(X\) recibe el nombre de **vector característico**, **autovector** o **eigenvector**; siendo las \(x_i\) las componentes de dicho vector.
- Los valores que se obtienen para \(\lambda\) se conocen como **valores característicos**, **autovalores** o **eigenvalores** de la matriz \(A\).

Dado que \(\lambda\) aparece como incógnita, es posible hacer que el determinante de dicha matriz sea igual a cero. Llamando \(D\) a este determinante:

\[
D = |A - \lambda I| = 0
\tag{6.24}
\]

Encontrando valores para \(\lambda\) que hagan \(D = 0\), se tendrá la solución.

El desarrollo algebraico del determinante \(D\) produce un polinomio de grado \(n\), de la forma:

\[
\lambda^n + p_1\lambda^{n-1} + p_2\lambda^{n-2} + \cdots + p_n = 0
\tag{6.25}
\]

- Este polinomio recibe el nombre de **polinomio característico** o **ecuación característica**.
- Es necesario resolver el polinomio y obtener los \(\lambda\) que hacen \(D = 0\).
- Las \(n\) raíces reciben el nombre de **autovalores** o **valores característicos**.
- Los valores característicos se sustituyen, uno a la vez, en el conjunto original de ecuaciones para obtener un sistema correspondiente de relaciones entre las incógnitas \(x\) para cada sustitución.

Las relaciones dependerán del rango \(r\) de la matriz \((A - \lambda I)\).

- Si \(r = n - 1\), las relaciones serán tales que la hipótesis de un valor para una incógnita producirá un valor correspondiente para cada una de las ecuaciones restantes.
- Si \(r = n - 2\), las relaciones serán tales que se tendrán que suponer los valores de dos incógnitas para poder obtener un valor correspondiente a cada una de las incógnitas restantes.

Cuando \(n\) es relativamente pequeño (2 o 3), el desarrollo de determinantes por menores para obtener el polinomio característico es sencillo, y la posterior determinación de raíces no presenta grandes dificultades.

- Para calcular el determinante de una matriz de \(n \times n\), se requieren del orden de \(n!\) multiplicaciones/divisiones y sumas/restas.
- Incluso con valores de \(n\) relativamente pequeños, la cantidad de cálculos se torna inmanejable.
- Cuando \(n\) es grande, esta determinación se vuelve muy difícil, si no imposible, y se debe apelar a algún procedimiento numérico.

---

### Método de Faddeev-LeVerrier

Este método constituye una técnica eficiente para generar los coeficientes \(p_i\) del polinomio característico (6.25), tanto cuando la matriz \(A\) de los coeficientes es simétrica, como cuando no lo es.

Tiene la ventaja adicional de que se obtiene automáticamente, al finalizar el proceso, la matriz inversa del sistema:

\[
A^{-1}
\]

Traza de una matriz:
La traza de una matriz cuadrada, que se designa mediante \(\operatorname{tr}(A)\), es:

\[
\operatorname{tr}(A) = a_{11} + a_{22} + \cdots + a_{nn}
\tag{6.26}
\]

Genera en su procedimiento una sucesión de matrices \(B_1, B_2, \dots, B_n\), de las que se obtienen una serie de valores \(b_k\), con \(k = 1,2,\dots,n\), que sustituidos en el polinomio de Faddeev-LeVerrier dan como resultado los coeficientes \(p_k\).

\[
(-1)^n\left(\lambda^n - b_1\lambda^{n-1} - b_2\lambda^{n-2} - \cdots - b_n\right)=0
\tag{6.27}
\]

El factor \((-1)^n\) se utiliza para dar a los términos los signos que tendría el polinomio característico si hubiese sido generado desarrollando el determinante correspondiente.

Los valores de \(b_k\) se obtienen así:

\[
B_1 = A, \qquad b_1 = \operatorname{tr}(B_1)
\]

\[
B_2 = A(B_1 - b_1 I), \qquad b_2 = \frac{1}{2}\operatorname{tr}(B_2)
\tag{6.28}
\]

\[
\vdots
\]

\[
B_n = A(B_{n-1} - b_{n-1}I), \qquad b_n = \frac{1}{n}\operatorname{tr}(B_n)
\]

Puede demostrarse que la inversa de la matriz \(A\), cuyos valores característicos se desea hallar, se determina a partir de la ecuación:

\[
A^{-1} = \frac{1}{b_n}(B_{n-1} - b_{n-1}I)
\tag{6.29}
\]

---

#### Ejemplo

Supóngase que se ha obtenido, como modelo matemático de algún problema determinado, el siguiente sistema lineal homogéneo de ecuaciones:

\[
\begin{cases}
(3-\lambda)x_1 + 2x_2 + 4x_3 = 0 \\
2x_1 + (0-\lambda)x_2 + 2x_3 = 0 \\
4x_1 + 2x_2 + (3-\lambda)x_3 = 0
\end{cases}
\]

La matriz del sistema es:

\[
A =
\begin{bmatrix}
3 & 2 & 4 \\
2 & 0 & 2 \\
4 & 2 & 3
\end{bmatrix}
\]

Cálculo de \(B_1\) y \(b_1\)

\[
B_1 = A =
\begin{bmatrix}
3 & 2 & 4 \\
2 & 0 & 2 \\
4 & 2 & 3
\end{bmatrix}
\]

Entonces:

\[
b_1 = \operatorname{tr}(B_1) = 3 + 0 + 3 = 6
\]

Cálculo de \(B_2\) y \(b_2\)

Primero:

\[
B_1 - b_1 I =
\begin{bmatrix}
3 & 2 & 4 \\
2 & 0 & 2 \\
4 & 2 & 3
\end{bmatrix}
-
\begin{bmatrix}
6 & 0 & 0 \\
0 & 6 & 0 \\
0 & 0 & 6
\end{bmatrix}
=
\begin{bmatrix}
-3 & 2 & 4 \\
2 & -6 & 2 \\
4 & 2 & -3
\end{bmatrix}
\]

Luego:

\[
B_2 = A(B_1 - b_1 I) =
\begin{bmatrix}
3 & 2 & 4 \\
2 & 0 & 2 \\
4 & 2 & 3
\end{bmatrix}
\begin{bmatrix}
-3 & 2 & 4 \\
2 & -6 & 2 \\
4 & 2 & -3
\end{bmatrix}
=
\begin{bmatrix}
11 & 2 & 4 \\
2 & 8 & 2 \\
4 & 2 & 11
\end{bmatrix}
\]

Entonces:

\[
b_2 = \frac{1}{2}\operatorname{tr}(B_2)=\frac{1}{2}(11+8+11)=15
\]

Cálculo de \(B_3\) y \(b_3\)

Primero:

\[
B_2 - b_2 I =
\begin{bmatrix}
11 & 2 & 4 \\
2 & 8 & 2 \\
4 & 2 & 11
\end{bmatrix}
-
\begin{bmatrix}
15 & 0 & 0 \\
0 & 15 & 0 \\
0 & 0 & 15
\end{bmatrix}
=
\begin{bmatrix}
-4 & 2 & 4 \\
2 & -7 & 2 \\
4 & 2 & -4
\end{bmatrix}
\]

Luego:

\[
B_3 = A(B_2 - b_2 I) =
\begin{bmatrix}
3 & 2 & 4 \\
2 & 0 & 2 \\
4 & 2 & 3
\end{bmatrix}
\begin{bmatrix}
-4 & 2 & 4 \\
2 & -7 & 2 \\
4 & 2 & -4
\end{bmatrix}
=
\begin{bmatrix}
8 & 0 & 0 \\
0 & 8 & 0 \\
0 & 0 & 8
\end{bmatrix}
\]

Entonces:

\[
b_3 = \frac{1}{3}\operatorname{tr}(B_3)=\frac{1}{3}(8+8+8)=8
\]

#### Polinomio característico

Sustituyendo los valores de los \(b_k\) en el polinomio de Faddeev-LeVerrier, se obtiene:

\[
(-1)^3(\lambda^3 - 6\lambda^2 - 15\lambda - 8)=0
\]

De donde resulta:

\[
-\lambda^3 + 6\lambda^2 + 15\lambda + 8 = 0
\]

o, multiplicando por \(-1\):

\[
\lambda^3 - 6\lambda^2 - 15\lambda - 8 = 0
\]

Las raíces de este polinomio son los autovalores:

\[
\lambda_1 = 8, \qquad \lambda_2 = -1, \qquad \lambda_3 = -1
\]

#### Matriz inversa

Para hallar la matriz inversa del sistema, se aplica (6.29) con \(b_3 = 8\):

\[
A^{-1} = \frac{1}{8}(B_2 - 15I) = \frac{1}{8}
\begin{bmatrix}
-4 & 2 & 4 \\
2 & -7 & 2 \\
4 & 2 & -4
\end{bmatrix}
=
\begin{bmatrix}
-\frac{4}{8} & \frac{2}{8} & \frac{4}{8} \\[6pt]
\frac{2}{8} & -\frac{7}{8} & \frac{2}{8} \\[6pt]
\frac{4}{8} & \frac{2}{8} & -\frac{4}{8}
\end{bmatrix}
\]

---

### Método de las potencias

El método de las potencias es un método **iterativo**.

Se utiliza en aquellos casos en que solamente se desea conocer el autovalor más pequeño y/o más grande, juntamente con sus autovectores asociados.

Una ventaja adicional de este método es que los autovalores se obtienen simultáneamente con sus respectivos autovectores.
Para determinar el autovalor más grande, supóngase que tanto los elementos de la matriz como el autovalor son reales. Sea el sistema:

\[
(A-\lambda I)X = 0
\tag{6.38}
\]

donde, realizando el producto indicado por el paréntesis, se obtiene:

\[
AX - \lambda IX = AX - \lambda X = 0
\]

y transponiendo términos:

\[
AX = \lambda X
\tag{6.39}
\]

Haciendo uso sistemático de esta última ecuación (6.39) y realizando los siguientes pasos:

1. **Asignar valores arbitrarios** a las componentes de \(X\), designándolo con \(X_0\).
   Se sustituye en el primer miembro de \(AX = \lambda X\), con lo cual se obtiene la primera aproximación del segundo miembro.
   En general, resulta satisfactorio tomar los valores para \(x_i = 1\), para \(i=1,2,\dots,n\).

2. **Dividir los elementos del vector** \(X_1\) por \(\lambda x_1\), para que la primera componente se reduzca a la unidad.

\[
AX_0 = \lambda X_1
\]

3. Se utilizan las componentes del vector obtenido como valores mejorados de \(X\), sustituyéndolos en el primer miembro de (6.39) para volver a obtener así una mejor aproximación en un siguiente paso.

4. Se repiten los pasos II y III hasta que la expresión (6.39) quede esencialmente satisfecha, es decir, se cumpla con la cantidad \(E\) fijada de antemano.

Al iterar se conforma una sucesión:

\[
AX_0, \; A^2X_0, \; \dots, \; A^kX_0
\]

siendo \(X_0\) un vector arbitrario supuesto inicialmente. Las potencias de la matriz \(A\) que componen la sucesión son las que le dan el nombre al método.

**¿Cómo determinar el autovalor más pequeño y su autovector asociado?**

Es necesario premultiplicar por la inversa de \(A\), resultando:

\[
A^{-1}AX = A^{-1}\lambda X
\]

\[
X = \lambda A^{-1}X
\]

o equivalentemente:

\[
A^{-1}X = \frac{1}{\lambda}X
\tag{6.36}
\]

La expresión anterior producirá una convergencia al valor más pequeño del autovalor \(\lambda\).

---

#### Conclusiones

- La convergencia puede resultar lenta si los autovalores máximo e inmediatamente menor tienen valores similares, o si otro tanto ocurre con el mínimo e inmediatamente mayor.
- La convergencia es hacia el autovalor máximo. Si el autovalor máximo tiene multiplicidad dos, las componentes del autovector convergen a cualquiera de los dos que están asociados a aquel, dependiendo esto del vector \(X\) supuesto inicialmente.
- En caso de que el vector supuesto inicialmente sea ortogonal con el autovector asociado al autovalor máximo de la matriz traspuesta, convergerá al autovalor que le sigue en magnitud en lugar de hacerlo al máximo.
- Como los autovalores son cantidades que hacen que el determinante de la matriz de coeficientes \((A - \lambda I)\) sea cero, el rango \(r\) de la matriz de coeficientes debe ser necesariamente menor que el orden \(n\) de la matriz.
- Si el rango de la matriz de coeficientes es una unidad menor que el orden, el sistema de ecuaciones homogéneas que se va a resolver contiene \(n-1\) ecuaciones independientes para determinar las \(n\) componentes de los autovectores.
- Si el rango de la matriz de coeficientes es dos unidades menor que el orden, es necesario suponer valores para dos componentes del autovector para hallar valores para otras componentes. Habrá solo \(n-2\) ecuaciones independientes en el sistema. Se dice que el espacio de soluciones es bidimensional.
- Si \(n-r = 3\), se deben suponer tres componentes del autovector, y el espacio de soluciones será tridimensional. El razonamiento es idéntico cuando el grado de indeterminación es mayor.

---

## Unidad 5: Interpolación Numérica

Temas a desarrollar:
- Interpolación de Lagrange: fórmula, aplicación y error.
- Interpolación de Newton: diferencias divididas y error.

---

### Conceptos Básicos

### Polinomios y Aproximación

Una de las clases más útiles de funciones que mapean los números reales sobre sí mismos son los **polinomios algebraicos**. Estos son funciones de la forma:

\[
P_n(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0
\]

donde \( n \) es un entero no negativo y \( a_0, \ldots, a_n \) son constantes reales.

**Importancia de los polinomios:**
- Aproximan de manera uniforme a las funciones continuas.
- La derivada y la integral indefinida de un polinomio son fáciles de calcular y también son polinomios.

#### Figura - Aproximación polinómica uniforme en \([a,b]\)
![Aproximación polinómica](./img/aproximacion-polinomica.png)

La figura representa geométricamente que, si \(f\) es continua en \([a,b]\), entonces puede aproximarse uniformemente mediante un polinomio \(P(x)\).

Se muestran:
- la función original \(y=f(x)\)
- el polinomio aproximante \(y=P(x)\)
- las curvas de referencia \(y=f(x)+\epsilon\) y \(y=f(x)-\epsilon\)

La condición
\[
|f(x)-P(x)|<\epsilon \quad \text{para toda } x\in[a,b]
\]
significa que la gráfica de \(P(x)\) queda completamente contenida dentro de la banda delimitada por \(f(x)+\epsilon\) y \(f(x)-\epsilon\) en todo el intervalo \([a,b]\).

### Idea clave
El polinomio \(P(x)\) aproxima a \(f(x)\) con un error uniforme menor que \(\epsilon\) en todo el intervalo.
---

### Teorema de Aproximación de Weierstrass

Si \( f \) está definida y es continua en el intervalo \([a, b]\), entonces, para cada \( \epsilon > 0 \), existe un polinomio \( P(x) \) tal que:

\[
|f(x) - P(x)| < \epsilon \quad \text{para toda } x \in [a, b]
\]

---

### Polinomios de Taylor vs. Polinomios de Interpolación

| **Polinomios de Taylor** | **Polinomios de Interpolación** |
|--------------------------|-------------------------------|
| Coinciden con la función en un punto específico. | Aproximan la función en todo un intervalo. |
| Exactitud concentrada cerca del punto de referencia. | Exactitud distribuida en el intervalo. |

---

### Introducción a la Interpolación Numérica

#### Definición

La **interpolación numérica** consiste en encontrar un valor aproximado de una función \( y \) para un valor de \( x \) que no está explícitamente en la tabla de datos, pero sí dentro del intervalo de trabajo \([x_0, x_n]\).

**Ejemplo:**
- Una línea recta une dos puntos (polinomio de 1er grado).
- Una parábola une tres puntos (polinomio de 2do grado).
- Una parábola cúbica une cuatro puntos (polinomio de 3er grado).

---

### Interpolación Numérica: Caso General

#### Proposición

Dados \( n+1 \) puntos con abscisas distintas entre sí, existe **un único polinomio de grado \( n \)** que pasa por todos ellos.

#### Figura 7.1 — Polinomio interpolador de grado \(n\)
![Figura 7.1](./img/figura-7-1.png)

La figura muestra \(n+1\) puntos:
\[
A_0,\ A_1,\ A_2,\ \dots,\ A_{n-1},\ A_n
\]
con abscisas distintas:
\[
x_0,\ x_1,\ x_2,\ \dots,\ x_{n-1},\ x_n
\]

Todos estos puntos pertenecen al polinomio interpolador \(P_n(x)\).

Si se tienen \(n+1\) puntos con abscisas distintas, entonces existe un único polinomio de grado \(n\) que pasa por todos ellos.

En la figura también se indica una separación uniforme \(h\) entre abscisas consecutivas.

### Idea clave
El polinomio \(P_n(x)\) queda completamente determinado por los \(n+1\) puntos dados.

---

- Considerando que por los \(n+1\) puntos \(A_0\); \(A_1\); ...; \(A_n\), pasa a lo sumo una parábola que representa un polinomio \(P_n(x)\) de grado \(n\).

- Entonces conocidos \(n+1\) puntos, la parábola de grado \(n\) que pasa por ellos, permite asignar a cada valor de \(x\), un valor de \(y\), que será considerado como el valor de interpolación buscado.

### Tablas con Valores Equidistantes

**Definición**: Se asume que los valores de \( x \) están equiespaciados:

\[
x_1 - x_0 = x_2 - x_1 = \cdots = x_n - x_{n-1} = h
\]

---

### Tabla de Diferencias Avanzadas

\[
\begin{array}{ccccc}
x & y & \Delta y & \Delta^2 y & \Delta^3 y \\[6pt]

x_0 & y_0 & & & \\[6pt]

x_1 = x_0 + h & y_1 & \Delta y_0 = y_1 - y_0 & & \\[6pt]

x_2 = x_1 + h & y_2 & \Delta y_1 = y_2 - y_1 &
\Delta^2 y_0 = \Delta y_1 - \Delta y_0 & \\[6pt]

x_3 = x_2 + h & y_3 & \Delta y_2 = y_3 - y_2 &
\Delta^2 y_1 = \Delta y_2 - \Delta y_1 &
\Delta^3 y_0 = \Delta^2 y_1 - \Delta^2 y_0 \\[6pt]

x_4 = x_3 + h & y_4 & \Delta y_3 = y_4 - y_3 &
\Delta^2 y_2 = \Delta y_3 - \Delta y_2 &
\Delta^3 y_1 = \Delta^2 y_2 - \Delta^2 y_1 \\[6pt]

\vdots & \vdots & \vdots & \vdots & \vdots \\[6pt]

x_{n-1} = x_{n-2} + h & y_{n-1} & \Delta y_{n-2} = y_{n-1} - y_{n-2} &
\Delta^2 y_{n-3} = \Delta y_{n-2} - \Delta y_{n-3} &
\Delta^3 y_{n-4} = \Delta^2 y_{n-3} - \Delta^2 y_{n-4} \\[6pt]

x_n = x_{n-1} + h & y_n & \Delta y_{n-1} = y_n - y_{n-1} &
\Delta^2 y_{n-2} = \Delta y_{n-1} - \Delta y_{n-2} &
\Delta^3 y_{n-3} = \Delta^2 y_{n-2} - \Delta^2 y_{n-3}
\end{array}
\]

\[
\Delta y_0 = y_1 - y_0
\]

\[
\Delta^2 y_0 = \Delta y_1 - \Delta y_0 = y_2 - 2y_1 + y_0
\]

\[
\Delta^3 y_0 = \Delta^2 y_1 - \Delta^2 y_0 = y_3 - 3y_2 + 3y_1 - y_0
\]

Las diferencias calculadas arriba reciben el nombre de **DIFERENCIAS AVANZADAS**.

---

### Cálculo de Diferencias

\[
\Delta y_0 = y_1 - y_0
\]
\[
\Delta^2 y_0 = y_2 - 2y_1 + y_0
\]
\[
\Delta^3 y_0 = y_3 - 3y_2 + 3y_1 - y_0
\]

**Generalización:**

\[
\Delta^n y_0 = \sum_{i=0}^n (-1)^i \binom{n}{i} y_{n-i}
\]

---

### Fórmula de Newton-Gregory Ascendente

### Polinomio Interpolante

\[
P_n(x) = a_0 + a_1 (x - x_0) + a_2 (x - x_0)(x - x_1) + \cdots + a_n (x - x_0)(x - x_1) \cdots (x - x_{n-1})
\]

### Coeficientes

\[
a_0 = y_0
\]
\[
a_1 = \frac{\Delta y_0}{h}
\]
\[
a_2 = \frac{\Delta^2 y_0}{2! h^2}
\]
\[
\vdots
\]
\[
a_n = \frac{\Delta^n y_0}{n! h^n}
\]

### Fórmula Final

\[
P_n(x) = y_0 + \frac{\Delta y_0}{h} (x - x_0) + \frac{\Delta^2 y_0}{2! h^2} (x - x_0)(x - x_1) + \cdots + \frac{\Delta^n y_0}{n! h^n} (x - x_0)(x - x_1) \cdots (x - x_{n-1})
\]

---

### Cambio de Variable

Si \( x = x_0 + h u \), entonces:

\[
P_n(x) = P_n(x_0 + h u) = y_0 + u \Delta y_0 + \frac{u(u-1)}{2!} \Delta^2 y_0 + \cdots + \frac{u(u-1)\cdots(u-n+1)}{n!} \Delta^n y_0
\]

---

### Interpolación Lineal

Si las diferencias de orden superior a 1 son nulas:

\[
P_1(x) = y_0 + \frac{\Delta y_0}{h} (x - x_0)
\]

---

### Interpolación Cuadrática

Si las diferencias de orden superior a 2 son nulas:

\[
P_2(x) = y_0 + \frac{\Delta y_0}{h} (x - x_0) + \frac{\Delta^2 y_0}{2! h^2} (x - x_0)(x - x_1)
\]

**Fórmula alternativa:**

\[
y = \frac{y_2 - 2y_1 + y_0}{2h^2} x^2 + \frac{y_2 - y_0}{2h} x + y_1
\]

*Figura — Gráfico de $f(x) = \ln x$ comparando la estimación cuadrática $P_2(x)$ con la estimación lineal en $[1, 4]$. La curva cuadrática se aproxima más al valor verdadero, ilustrando la mayor precisión de la interpolación de segundo orden.*

---

### Fórmula de Newton-Gregory Descendente

#### Diferencias Atrasadas

#### Tabla de diferencias atrasadas

\[
\begin{array}{ccccc}
x & y & \nabla y & \nabla^2 y & \nabla^3 y \\[6pt]

x_0 & y_0 & & & \\[6pt]

x_1 = x_0 + h & y_1 & \nabla y_1 = y_1 - y_0 & & \\[6pt]

x_2 = x_1 + h & y_2 & \nabla y_2 = y_2 - y_1 &
\nabla^2 y_2 = \nabla y_2 - \nabla y_1 & \\[6pt]

x_3 = x_2 + h & y_3 & \nabla y_3 = y_3 - y_2 &
\nabla^2 y_3 = \nabla y_3 - \nabla y_2 &
\nabla^3 y_3 = \nabla^2 y_3 - \nabla^2 y_2 \\[6pt]

x_4 = x_3 + h & y_4 & \nabla y_4 = y_4 - y_3 &
\nabla^2 y_4 = \nabla y_4 - \nabla y_3 &
\nabla^3 y_4 = \nabla^2 y_4 - \nabla^2 y_3 \\[6pt]

\vdots & \vdots & \vdots & \vdots & \vdots \\[6pt]

x_{n-1} = x_{n-2} + h & y_{n-1} & \nabla y_{n-1} = y_{n-1} - y_{n-2} &
\nabla^2 y_{n-1} = \nabla y_{n-1} - \nabla y_{n-2} &
\nabla^3 y_{n-1} = \nabla^2 y_{n-1} - \nabla^2 y_{n-2} \\[6pt]

x_n = x_{n-1} + h & y_n & \nabla y_n = y_n - y_{n-1} &
\nabla^2 y_n = \nabla y_n - \nabla y_{n-1} &
\nabla^3 y_n = \nabla^2 y_n - \nabla^2 y_{n-1}
\end{array}
\]

Las diferencias calculadas arriba reciben el nombre de **DIFERENCIAS ATRASADAS**.

#### Polinomio Interpolante

\[
P_n(x) = y_n + \frac{\nabla y_n}{h} (x - x_n) + \frac{\nabla^2 y_n}{2! h^2} (x - x_n)(x - x_{n-1}) + \cdots + \frac{\nabla^n y_n}{n! h^n} (x - x_n)(x - x_{n-1}) \cdots (x - x_1)
\]

---

#### Cambio de Variable

Si \( x = x_n + h u \):

\[
P_n(x) = y_n + u \nabla y_n + \frac{u(u+1)}{2!} \nabla^2 y_n + \cdots + \frac{u(u+1)\cdots(u+n-1)}{n!} \nabla^n y_n
\]

## Unidad 6: Diferenciación e Integración Numérica

### Diferenciación numérica

El polinomio de interpolación es aplicable para la resolución de problemas de diferenciación en general y el cálculo de derivadas en particular. Dada una tabla de valores de $f(x)$ para diversos valores de $x$, se puede determinar el polinomio de interpolación que, satisfaciendo los valores dados, represente con cierto grado de aproximación a $f(x)$. De acuerdo a lo anterior, es posible calcular, de manera más o menos precisa, la derivada $f'(x)$ de la función en cuestión. Se puede hallar, en general y por única vez, las derivadas sucesivas de la fórmula de interpolación y aplicarlas a cada caso particular.

#### Aproximación geométrica de la derivada

Se trata de evaluar numéricamente la derivada de una función $f(x)$ a partir de valores numéricos de dicha función. Geométricamente se pueden considerar tres variantes:

- **Fórmula avanzada:** pendiente de la recta secante entre $(x,\, f(x))$ y $(x+h,\, f(x+h))$.
$$f'(x) \approx \frac{f(x+h) - f(x)}{h}$$

- **Fórmula atrasada:** pendiente entre $(x-h,\, f(x-h))$ y $(x,\, f(x))$.
$$f'(x) \approx \frac{f(x) - f(x-h)}{h}$$

- **Fórmula centrada:** pendiente entre $(x-h,\, f(x-h))$ y $(x+h,\, f(x+h))$.
$$f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}$$

#### Comportamiento del error numérico

En el cálculo numérico de derivadas se cometen errores importantes. En principio, parece evidente que al disminuir $h$ se reduce el error. Sin embargo, al reducir $h$ por debajo de cierto umbral, los errores de redondeo del sistema de punto flotante dominan y el error total aumenta. La siguiente tabla ilustra este comportamiento para la derivada de $e^x$ en $x=1$ (valor exacto: $2.71828182845905$):

| $h$ | $f'(x)$ aproximado | error |
|-----|-------------------|-------|
| 1e-01 | 2.85884195487388 | −0.14056012641483 |
| 1e-02 | 2.73191865578708 | −0.01363682732803 |
| 1e-03 | 2.71964142253278 | −0.00135959407374 |
| 1e-04 | 2.71841774707848 | −0.00013591861944 |
| 1e-07 | 2.71828196396484 | −0.00000013550580 |
| 1e-08 | 2.71828177744737 | +0.00000005101167 |
| 1e-10 | 2.71827893527643 | +0.00000289318262 |
| 1e-13 | 2.71338507218388 | +0.00489675627516 |
| 1e-14 | 2.66453525910038 | +0.05374656935867 |

El error disminuye con $h$ al principio, pero a partir de $h \approx 10^{-8}$ comienza a aumentar por efecto de los errores de redondeo.

---

#### Análisis del error mediante serie de Taylor

La serie de Taylor proporciona un medio para predecir el valor de una función en un punto en términos del valor de la función y sus derivadas en otro punto. Considerando $h = x_{i+1} - x_i$:

$$
f(x_{i+1}) = f(x_i) + f'(x_i)h + \frac{f''(x_i)}{2!}h^2 + \cdots + \frac{f^{(n)}(x_i)}{n!}h^n + R_n
$$

$$
R_n = \frac{f^{(n+1)}(\varepsilon)}{(n+1)!}h^{n+1}
$$

donde $\varepsilon$ es un valor de $x$ que se encuentra entre $x_i$ y $x_{i+1}$.

**Error de la fórmula avanzada** — a partir del desarrollo de Taylor truncado en el segundo término:

$$
f(x+h) = f(x) + f'(x)h + \frac{f''(\varepsilon)}{2!}h^2 \quad\Rightarrow\quad f'(x) = \frac{f(x+h) - f(x)}{h} - \frac{f''(\varepsilon)}{2!}h
$$

El error es de orden 1: $O(h)$.

**Error de la fórmula centrada** — se desarrolla Taylor en $x+h$ y en $x-h$:

$$
f(x+h) = f(x) + f'(x)h + \frac{f''(x)}{2!}h^2 + \frac{f'''(\varepsilon_1)}{3!}h^3
$$

$$
f(x-h) = f(x) - f'(x)h + \frac{f''(x)}{2!}h^2 - \frac{f'''(\varepsilon_2)}{3!}h^3
$$

Restando miembro a miembro y suponiendo $f'''$ continua:

$$
f(x+h) - f(x-h) = 2hf'(x) + \left(f'''(\varepsilon_1) + f'''(\varepsilon_2)\right)\frac{h^3}{3!} = 2hf'(x) + 2f'''(\varepsilon)\frac{h^3}{3!}
$$

de donde:

$$
f'(x) = \frac{f(x+h) - f(x-h)}{2h} - f'''(\varepsilon)\frac{h^2}{3!} = \frac{f(x+h) - f(x-h)}{2h} - O(h^2)
$$

La fórmula centrada es de **orden 2** y por tanto más precisa que las otras dos.

---

#### Derivación mediante fórmulas de interpolación

La metodología consiste en usar cualquiera de las fórmulas de interpolación estudiadas. Se aplica el cambio de variable $x = x_0 + hu$ a la fórmula de Newton-Gregory Ascendente:

$$
f(x_0 + hu) = f(x_0) + \Delta f(x_0)\,u + \Delta^2 f(x_0)\frac{u(u-1)}{2!} + \Delta^3 f(x_0)\frac{u(u-1)(u-2)}{3!} + \Delta^4 f(x_0)\frac{u(u-1)(u-2)(u-3)}{4!} + \cdots
$$

Derivando respecto de $u$:

$$
h f'(x_0 + hu) = \Delta f(x_0) + \Delta^2 f(x_0)\frac{2u-1}{2} + \Delta^3 f(x_0)\frac{3u^2-6u+2}{6} + \Delta^4 f(x_0)\frac{4u^3-18u^2+22u-6}{24} + \cdots
$$

Para $x = x_0$ (es decir, $u = 0$):

$$
h f'(x_0) = \Delta f(x_0) - \frac{1}{2}\Delta^2 f(x_0) + \frac{1}{3}\Delta^3 f(x_0) - \frac{1}{4}\Delta^4 f(x_0) + \cdots
$$

Para la **derivada segunda**, derivando nuevamente:

$$
h^2 f''(x_0 + hu) = \Delta^2 f(x_0) + \Delta^3 f(x_0)(u-1) + \Delta^4 f(x_0)\frac{6u^2-18u+11}{12} + \cdots
$$

y para $u = 0$:

$$
h^2 f''(x_0) = \Delta^2 f(x_0) - \Delta^3 f(x_0) + \frac{11}{12}\Delta^4 f(x_0) - \cdots \tag{8.3}
$$

Este procedimiento puede ser iterado para obtener derivadas de mayor orden. Partiendo de la fórmula de **Newton-Gregory Descendente**:

$$
f(x_n + hu) = f(x_n) + u\nabla f(x_n) + \frac{u(u+1)}{2!}\nabla^2 f(x_n) + \frac{u(u+1)(u+2)}{3!}\nabla^3 f(x_n) + \cdots
$$

se obtiene, derivando e igualando $u = 0$:

$$
h f'(x_n) = \nabla f(x_n) + \frac{1}{2}\nabla^2 f(x_n) + \frac{1}{3}\nabla^3 f(x_n) + \frac{1}{4}\nabla^4 f(x_n) + \cdots
$$

$$
h^2 f''(x_n) = \nabla^2 f(x_n) + \nabla^3 f(x_n) + \frac{11}{12}\nabla^4 f(x_n) + \cdots
$$

Si se parte de las fórmulas de Gauss, Lagrange, Bessel, etc., se encontrarán nuevas fórmulas de derivación para cada caso particular, que ofrecerán mayor o menor precisión según la posición relativa del valor de $x$ para el cual se desea calcular las derivadas.

> 💡 **Flashcard — Fórmulas de derivación numérica**
> **P:** ¿Por qué la fórmula centrada es más precisa que la avanzada o atrasada?
> **R:** Porque su error es $O(h^2)$ en lugar de $O(h)$: al reducir $h$ a la mitad, el error de la fórmula centrada se divide por 4, mientras que el de las otras solo por 2.

---

### Integración numérica

#### Problemática inicial

Dentro del campo analítico, se desconoce la primitiva de la mayor parte de las funciones, o si se conoce, su aplicación es larga y compleja. Incluso es posible que se desconozca la expresión analítica de la función sobre la cual se desea integrar. La imposibilidad o inconveniencia de aplicar métodos tradicionales está dada por:

1. Que no se conozca ninguna primitiva de la función a integrar.
2. Que aún conociéndose una primitiva, su aplicación resulte excesivamente compleja o extensa.
3. Que directamente se desconozca la expresión analítica de la función.

Cuando se conoce la primitiva $F(x)$ de $f(x)$, se aplica la **regla de Barrow**:

$$
I = \int_{a}^{b} f(x)\,dx = F(b) - F(a) \tag{8.20}
$$

Cuando no se conoce ninguna primitiva, o cuando solo se dispone de una tabla de valores experimentales, es necesario apelar a **métodos de cálculo aproximados**. La integral $\int_a^b f(x)\,dx$ equivale geométricamente al área bajo la curva $f(x)$, lo que permite desarrollar diversos métodos aproximados.

#### Fórmulas de Newton-Cotes

Las fórmulas de Newton-Cotes son los tipos de integración numérica más comunes. Se basan en reemplazar la función por un polinomio de aproximación fácil de integrar:

$$
I = \int_{a}^{b} f(x)\,dx \cong \int_{a}^{b} f_n(x)\,dx \tag{21.1}
$$

donde $f_n(x) = a_0 + a_1 x + \cdots + a_n x^n$ es un polinomio de grado $n$. Se basan en el polinomio de interpolación de Newton con argumentos igualmente espaciados.

Las principales fórmulas de Newton-Cotes son:

| Fórmula | Expresión | Error |
|---------|-----------|-------|
| **Trapezoidal** | $\dfrac{h}{2}(f_0 + f_1)$ | $-\dfrac{h^3}{12}f''(\zeta)$ |
| **Simpson 1/3** | $\dfrac{h}{3}(f_0 + 4f_1 + f_2)$ | $-\dfrac{h^5}{90}f^{(4)}(\zeta)$ |
| **Simpson 3/8** | $\dfrac{3h}{8}(f_0 + 3f_1 + 3f_2 + f_3)$ | $-\dfrac{3h^5}{80}f^{(4)}(\zeta)$ |
| **Boole** | $\dfrac{2h}{45}(7f_0 + 32f_1 + 12f_2 + 32f_3 + 7f_4)$ | $-\dfrac{8h^7}{945}f^{(6)}(\zeta)$ |

Observaciones:
- En estas fórmulas se supone $x_k = x_0 + kh$.
- Los errores dependen de potencias elevadas de $h$.
- La fórmula de Simpson 1/3 tiene una alta relación precisión/coste.
- No se suelen utilizar fórmulas de orden muy alto porque aparecen coeficientes negativos que generan problemas numéricos.

---

#### Fórmula de los trapecios

Supónganse conocidos los $n+1$ valores $y_0, y_1, \ldots, y_n$ de $f(x)$, con abscisas equidistantes ($x_k - x_{k-1} = h$). El área bajo la curva se aproxima sumando las áreas de los trapecios inscriptos en cada subintervalo:

$$
\text{área}(x_{k-1};\,x_k) \approx \frac{1}{2}(y_{k-1} + y_k)\,h
$$

Sumando todos los trapecios:

$$
\int_{x_0}^{x_n} f(x)\,dx \cong \frac{h}{2}(y_0 + 2y_1 + 2y_2 + \cdots + 2y_{n-1} + y_n) \tag{8.21}
$$

*Figura 8.1 — Aproximación de la integral mediante trapecios inscritos bajo la curva $y = f(x)$. Cada trapecio tiene base $h$ y alturas $y_{k-1}$ e $y_k$.*

La fórmula de los trapecios tiene precisión suficiente cuando no se requiere una aproximación de orden elevado. Al sustituir la curva por la poligonal inscripta, el modelo realizado puede clasificarse como una **discretización**.

**Error de la regla trapezoidal** — para una sola aplicación:

$$
E_t = -\frac{1}{12}f''(\xi)(b-a)^3 \tag{21.6}
$$

donde $\xi$ está en algún lugar del intervalo $[a, b]$. Si la función es lineal, la regla es exacta. Para funciones con curvatura ($f'' \neq 0$) se incurre en error.

---

#### Fórmula de Simpson

Basado en el uso de segmentos de parábola en lugar de segmentos de recta, se obtiene mayor precisión. Se considera el área comprendida entre el eje $x$, la parábola de eje vertical que pasa por tres puntos consecutivos $A_0, A_1, A_2$ y sus ordenadas extremas, con abscisas equidistantes $x_1 - x_0 = x_2 - x_1 = h$.

Ubicando el eje $y$ por el punto intermedio $A_1$, las abscisas resultan $x_0 = -h$, $x_1 = 0$, $x_2 = h$. La parábola $y = ax^2 + bx + c$ debe pasar por los tres puntos, lo que da el sistema:

$$
y_0 = ah^2 - bh + c, \quad y_1 = c, \quad y_2 = ah^2 + bh + c
$$

Resolviendo: $c = y_1$, y sumando la primera y tercera ecuación:

$$
a = \frac{y_0 + y_2 - 2y_1}{2h^2}, \qquad b = \frac{y_2 - y_0}{2h}, \qquad c = y_1
$$

Integrando la parábola en $[-h, h]$:

$$
I = \int_{-h}^{h}(ax^2 + bx + c)\,dx = \frac{2}{3}ah^3 + 2ch = \frac{h}{3}(y_0 + 4y_1 + y_2)
$$

Para una tabla de $n+1$ puntos con $n$ par, aplicando la fórmula cada tres puntos consecutivos:

$$
\int_{x_0}^{x_n} f(x)\,dx \cong \frac{h}{3}(y_0 + 4y_1 + y_2) + \frac{h}{3}(y_2 + 4y_3 + y_4) + \cdots + \frac{h}{3}(y_{n-2} + 4y_{n-1} + y_n)
$$

Usando los operadores $E$ (suma de ordenadas extremas), $I$ (suma de ordenadas en posición impar) y $P$ (suma de ordenadas en posición par interior):

$$
I = \int_{x_0}^{x_n} f(x)\,dx \cong \frac{h}{3}(E + 4I + 2P) \tag{8.23}
$$

Esta es la conocida **Fórmula de Simpson**, válida cuando el número de franjas $n$ es par (número de puntos impar).

---

#### Regla de los tres octavos de Simpson

La fórmula de Simpson 1/3 solo es válida cuando $n$ es par. El mismo Simpson desarrolló una fórmula para cuando $n$ es impar, usando parábolas cúbicas que conectan cuatro puntos consecutivos.

La parábola cúbica general es $y = ax^3 + bx^2 + cx + d$. Ubicando el eje $y$ en el centro del intervalo $[-3h/2,\, 3h/2]$ y resolviendo el sistema de cuatro ecuaciones para los cuatro puntos $A_0, A_1, A_2, A_3$:

$$
a = \frac{-y_0 + 3y_1 - 3y_2 + y_3}{6h^3}, \quad b = \frac{y_0 - y_1 - y_2 + y_3}{4h^2}
$$
$$
c = \frac{y_0 - 27y_1 + 27y_2 - y_3}{24h}, \quad d = \frac{-y_0 + 9y_1 + 9y_2 - y_3}{16}
$$

Integrando en $[-3h/2,\, 3h/2]$ y sustituyendo:

$$
I = \int_{-3h/2}^{3h/2} f(x)\,dx = \frac{3h}{8}(y_0 + 3y_1 + 3y_2 + y_3) \tag{8.26}
$$

Esta es la **Regla de los Tres Octavos de Simpson**.

---

#### Métodos combinados

Al quitar tres franjas a una zonificación con número impar de franjas, resulta un número par al que se puede aplicar la fórmula de Simpson 1/3. Por ejemplo, para 47 franjas: se aplica la regla 3/8 a las primeras 3 franjas, y la fórmula de Simpson 1/3 a las 44 restantes. Las dos áreas se suman.

En general, cuando el número de segmentos no se adapta directamente a ninguna fórmula sola, conviene combinar Simpson 1/3 y 3/8 para cubrir todo el intervalo con error de tercer orden.

> 💡 **Flashcard — Fórmulas de integración numérica**
> **P:** ¿Cuándo se usa Simpson 1/3 y cuándo Simpson 3/8?
> **R:** Simpson 1/3 requiere un número par de franjas (número impar de puntos). Simpson 3/8 se aplica cuando el número de franjas es impar, o para complementar Simpson 1/3 en métodos combinados.

---

#### Integración de Romberg

La **extrapolación de Richardson** es un método que combina dos estimaciones numéricas de la integral para obtener una tercera más exacta. El algoritmo computacional que implementa este procedimiento se denomina **Integración de Romberg**.

Se basa en aplicaciones sucesivas de la regla del trapecio, y a través de manipulaciones matemáticas se alcanzan mejores resultados con menos trabajo.

**Extrapolación de Richardson:**

Combinando dos estimaciones con la regla trapezoidal de $O(h^2)$ para obtener una estimación de $O(h^4)$:

$$
I = \frac{4}{3}I(h_2) - \frac{1}{3}I(h_1)
$$

Combinando dos estimaciones de $O(h^4)$ para obtener una de $O(h^6)$:

$$
I = \frac{16}{15}I_{(m)} - \frac{1}{15}I_{(l)}
$$

Combinando dos resultados de $O(h^6)$ para obtener una de $O(h^8)$:

$$
I = \frac{64}{63}I_{(m)} - \frac{1}{63}I_{(l)}
$$

donde $I_{(m)}$ es la estimación con mayor número de segmentos e $I_{(l)}$ la de menor.

**Estructura de la integración de Romberg** — cada columna representa un orden de precisión mayor:

| $O(h^2)$ | $O(h^4)$ | $O(h^6)$ | $O(h^8)$ |
|----------|----------|----------|----------|
| $I_1$ | | | |
| $I_2$ | $I_{1,2}$ | | |
| $I_4$ | $I_{2,4}$ | $I_{1,2,4}$ | |
| $I_8$ | $I_{4,8}$ | $I_{2,4,8}$ | $I_{1,2,4,8}$ |

Cada valor de la tabla se obtiene combinando los dos valores de la columna anterior mediante la fórmula de Richardson correspondiente.

> 💡 **Flashcard — Integración de Romberg**
> **P:** ¿En qué se basa la integración de Romberg y qué ventaja ofrece?
> **R:** Se basa en aplicaciones sucesivas de la regla trapezoidal combinadas con extrapolación de Richardson. Permite alcanzar alta precisión ($O(h^8)$ o mayor) con pocas evaluaciones de la función.

---

## Unidad 7: Ecuaciones Diferenciales Ordinarias

### 7.1 Fundamentos de ecuaciones diferenciales

- Muchos problemas de física, ingeniería, biología, etc., admiten una formulación en ecuaciones diferenciales.
- No es incorrecto afirmar que: Todo proceso físico que implique un cambio continuo puede ser enunciado matemáticamente en forma de ecuaciones diferenciales.
- A modo de ilustración se presenta a continuación algunos ejemplos relevantes en los que aparecen ecuaciones diferenciales.


- Caída de los cuerpos con resistencia del medio proporcional a la velocidad.
- Descomposición de una sustancia radiactiva.
- Tasa de población.
- Ley de enfriamiento de Newton.
- Ecuación del resorte.
- Deflexión de una viga uniforme.
- Termodinámica: ley del calor de Fourier.
- Electromagnetismo: ley de Faraday.

- Tasa de población.
- La tasa de cambio con respecto al tiempo "t" de una población $x(t)$ con índices constantes de nacimiento y mortalidad es, en muchos casos y con una modelización, proporcional al tamaño de la población. Esto es:
$$
x'(t) - k x(t) = 0
$$
- K es una constante de proporcionalidad


- Def. Se llama **ecuación diferencial ordinaria de orden n** a toda ecuación que establece una relación entre: la variable independiente de la ecuación: $x$, la función buscada $y = f(x)$ y sus derivadas hasta el orden n:

$$
y', y'', y''', \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots
$$

- Toda ecuación diferencial ordinaria puede ser representada mediante una expresión de la forma:

$$
(*) \quad F(x, y, y', y'', \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots \dots)
$$

El término **ordinaria** se emplea para indicar que hay una sola variable independiente en la ecuación.

Si hubiese mas de una variable independiente, hablaríamos de ecuaciones en derivadas parciales


- Def. : Se llama **orden de la ecuación diferencial** al orden de la derivada superior de la función que aparece en la ecuación diferencial
- Ejemplos:
- La ecuación $y'' + y = 0$ es una ecuación de **segundo orden o de orden 2**.
- La ecuación $y' = y$ es una ecuación de **primer orden o de orden 1**

- Def. : Toda función $y = f(x)$ que verifica la expresión
$$
F(x, y, y', y'', \dots, y^{(n)}) = 0
$$
- se dice que es una **solución o integral** de la ecuación diferencial.
- Hay que distinguir entre los conceptos de solución general y solución particular.
- Def. : Se llama **solución general** de una ecuación diferencial a la familia de todas las funciones que verifican la ecuación.
- Def. : Se llama **solución particular** de una ecuación diferencial a cualquiera de las funciones que verifican la ecuación.


- La solución general de la ec. diferencial:
- $y'x + y = 0$
- Es $y(x) = C/x$, donde C es una constante arbitraria.
- La solución general de una ec. diferencial de orden n depende en general, de n constantes arbitrarias. Para cada posible valor de C se tiene una sol. de la ec. (solución particular)

- La solución de una ecuación diferencial ordinaria es una función en términos de la variable independiente y de parámetros que satisfacen la ecuación diferencial original.
- Dado que la solución general de una ecuación diferencial depende de constantes arbitrarias, es posible imponer condiciones adicionales a las funciones solución de esas ecuaciones.
- Por ej., imponer que la función solución (o alguna de sus derivadas) pase por algún punto dado del espacio. En este sentido se definen las ecuaciones de Cauchy y las ecuaciones de contorno.


Def.: Para una ec. dif. de orden n  $F(x,y,y',y'',\dots \dots ,y^{(n)}) = 0$  dada por la formula:

se define **problema de Cauchy** a la ecuación diferencial junto con n condiciones adicionales de la forma:

$$
\left\{ \begin{array}{l} F \big (x, y, y ^{\prime}, y ^{\prime \prime}, \dots \dots y ^{n} \big) = 0 \\ \quad y \big (x_{0} \big) = y_{0} \\ \quad y ^{\prime} \big (x_{0} \big) = y_{1} \\ \dots \dots \dots \dots \dots \dots \dots \\ y ^{n - 1} \big (x_{0} \big) = y_{n - 1} \end{array} \right.
$$

Ejemplo: La solución general de la ecuación  $y''(x) + y = 0$ , depende de dos constantes arbitrarias:

$$
y (x) = C_{1} \sin (x) + C_{2} \cos (x)
$$

Esto implica que, de todas las soluciones de la ecuación, es posible seleccionar aquella que cumpla, por ejemplo, condiciones del tipo  $y(0) = 0$ ,  $y'(0) = 3$ , de donde la solución obtenida es  $y(x) = 3 \sin(x)$ .


Se dice pues que esta función es la solución del problema de Cauchy:

$$
\left\{ \begin{array}{l} y''(x) + y = 0 \\ y(0) = 0 \quad \Rightarrow y(x) = 3 \text{sen}(x) \\ y'(0) = 3 \end{array} \right.
$$

- Def.: Para una ecuación diferencial de orden n, dada por la fórmula (*) se define **problema de contorno** a la ecuación diferencial junto con n condiciones adicionales de la forma:

$$
\left\{ \begin{array}{l} F(x, y, y' y'', \dots, y^n) = 0 \\ y(x_0) = y_0 \\ y(x_1) = y_1 \\ \dots \\ y(x_{n-1}) = y_{n-1} \end{array} \right.
$$


- Dada una ecuación diferencial de orden n, cuando se imponen n condiciones adicionales sobre la función y sus derivadas en un mismo punto (una condición para cada orden de derivación) hablamos de problemas de Cauchy.
- Si se impone a la función solución pasar por n puntos dados (y no se impone ninguna condición sobre las derivadas de la función), hablamos de problemas de contorno.
- Existe una tercera posibilidad, que es la de combinar las dos anteriores. En este caso, se hablaría de problemas mixtos

Ejemplo: Dada la ecuación $y''(x) + y = 0$, resolver un problema de contorno significa imponer condiciones exclusivamente de la función solución sobre 2 puntos, por ejemplo:

$$
y(0) = 1, \quad y\left(\frac{\pi}{2}\right) = 0
$$


- De donde la solución obtenida es: $y(x) = \cos(x)$.
- Se dice que esta función es la solución del problema de contorno:

$$
\left\{ \begin{array}{l}
y''(x) + y = 0 \\
y(0) = 1 \quad \Rightarrow y(x) = \cos(x) \\
y\left(\frac{\pi}{2}\right) = 0
\end{array} \right.
$$

- Cualquier ecuación diferencial de primer orden tiene la forma: $F(x, y, y') = 0$.
- Siendo $x$ la variable del problema e $y(x)$ la función buscada en la ecuación.
- Algunas de estas ecuaciones ya son conocidas como indican los sig. Teoremas:

- **TEOREMA:**
- La ecuación $y' = 0$ tiene como solución general la familia de funciones $y(x) = C$, donde $C$ es cualquier número real.


#### Teorema
- Si $f(x)$ es una función continua, la ecuación $y' = f(x)$ tiene como solución general la familia de funciones

$$
y(x) = C + \int f(x) \, dx
$$

#### Ejemplo
La ecuación $y' = x$ es del tipo anterior. Por tanto, la solución general:

$$
y(x) = C + \frac{x^2}{2}
$$

Aplicación de métodos de resolución numérica para ecuaciones diferenciales ordinarias resulta necesario o imprescindible cuando:

- Es imposible la aplicación de la integración exacta, se desean calcular para valores de la variable $x$, los valores numéricos correspondientes de $y$, que satisfacen una ecuación diferencial dada, con un cierto grado de aproximación previamente establecido.
- El proceso de integración será realizado prescindiendo del conocimiento de la expresión analítica de la función solución $y = y(x)$ que resolvería, el problema.


- En aquellos casos en que la solución exacta no resuelve el problema en forma práctica.
- Necesidad de recurrir al uso de computadoras, por las características propias del problema, que involucran un número muy grande de pasos, de proceso complejo, imposible de realizar mediante métodos analíticos.

#### Método de Euler

La forma general de las expresiones de las ecuaciones diferenciales de primer orden, que serán tratadas a continuación:

$$
y' = f(x; y) \quad (9.1) \quad F(x, y, y') = 0
$$

en la cual, $y'$ no es simplemente función de la variable independiente $x$, sino también de la variable dependiente $y$, cuyos valores deben ser calculados.

- No es posible, la integración directa de la misma mediante algunas reglas estudiadas con anterioridad.
- $y(x)$ la función buscada en la ecuación.


![img-0.jpeg](img-0.jpeg)

![img-1.jpeg](img-1.jpeg)
Fig. 9.1.- Sol. de la ec. diferencial


Un método simple que permite una solución aproximada de

$$
y' = f(x; y)
$$

cuando se conoce una condición inicial $ y = y_0 $

para $ x = x_0 $

Supóngase que, tanto la ecuación dada como la solución de la misma:

$$
y = y(x) \tag{9.2}
$$

tienen la forma general de la figura 9.1 (b) y 9.1 (a), respectivamente.

La parte (b) de la gráfica puede ser representada dado que por la relación $ y = y(x) $, el valor de $ y $ puede ser escrito:

$$
y' = f(x; y) = f[x; y(x)] = F(x)
$$

Dado que la solución es conocida para un valor inicial $ (x_0; y_0) $ es posible determinar el valor inicial de $ y $'haciendo uso de la ecuación $ y' = f(x; y) $; entonces, reemplazando los respectivos valores iniciales dados, en la ecuación original, resulta el valor de $ y_0 $:

$$
y_0' = f(x_0; y_0)
$$


La variación de $y$ desde $x = x_0$ hasta $x = x_0 + h$ se representa mediante el área bajo la curva $y'$ entre los valores señalados de $x$, teniendo en cuenta que:

$$
\int_{x_0}^{x_1} y' dx \cong A_1
$$

y, reemplazando ambos miembros por sus valores respectivos, es:

$$
\left[ y \right]_{x_0}^{x_1} \cong y_0'(x_1 - x_0)
$$

y, en definitiva:

$$
y(x_1) - y(x_0) = y_1 - y_0 \cong y_0'h
$$

En las tres últimas expresiones, los primeros miembros representan los valores exactos y los segundos, los valores aproximados. Despejando $y_1$ de la última, resulta:

$$
y_1 = y_0 + y_0'h \tag{9.4}
$$

Habiéndose determinado una aproximación precisa al valor de $y_1$ por medio de la expresión anterior, utilizando valores pequeños de $h$, es posible obtener una aproximación de $y_1$ a partir de $y' = f(x;y)$, ya que:

$$
y_1' = f(x_1; y_1) \tag{9.5}
$$


Entonces, como la diferencia $y_{2} - y_{1}$ es aproximadamente igual al área comprendida bajo $y'$ desde $x_{1}$ hasta $x_{2}$; o sea, $A_{2}$ de la figura 9.1 (a), resulta:

$$
y_{2} = y_{1} + y_{1}'h \tag{9.4}
$$

Procediendo de la misma manera se pueden determinar los sucesivos valores de $y_{i}$, obteniéndose la expresión general:

$$
y_{n+1} = y_{n} + y_{n}'h \tag{9.5}
$$


![img-2.jpeg](img-2.jpeg)
FIGURA 25.2
Método de Euler.


![img-3.jpeg](img-3.jpeg)
FIGURA 25.3
Comparación de la solución verdadera con una solución numérica usando el método de Euler, para la integral de $y' = -2x^2 + 12x^2 - 20x + 8.5$ desde $x = 0$ hasta $x = 4$ con un tamaño de paso de 0.5. La condición inicial en $x = 0$ es $y = 1$.


![img-4.jpeg](img-4.jpeg)


La que generalmente, es conocida como FORMULA DE INTEGRACIÓN HACIA ADELANTE DE EULER.

El MÉTODO DE EULER se clasifica como MÉTODO QUE EMPIEZA POR SI MISMO

- Solo requiere de un valor de la variable dependiente para hallar la solución; es decir, el conocimiento de un único punto de la solución (valor inicial) como para dar origen al procedimiento.

![img-5.jpeg](img-5.jpeg)
Fig. 9.2


La representación de la solución $y = y(x)$ obtenida por EULER, puede apreciarse en la figura 9.2, donde es posible observar que el método de EULER se aproxima, en efecto, por medio de segmentos de recta a la solución exacta del problema. Se obtiene una aproximación a la curva representativa de la solución mediante una poligonal.

#### Error en el método de Euler
Comparando la ecuación $y_{n+1} = y_n + y'_n$ $h$ con la expresión del desarrollo en serie de Taylor se observa:

- Constituida por los dos primeros términos de Taylor.
- Se desprecian los términos que contienen $h^2$ y potencias superiores sucesivas de $h$.
- El error que se introduce en cada paso debido al uso de esta ecuación truncada es, conocido como error por truncamiento y su valor es:

(9.6) $\mathbf{E} \leq h^2$

$h$ se debe mantener lo más pequeño posible


#### Método modificado de Euler
Si $h$ es grande\rightarrow los efectos de la propagación de los errores, invalidarían cualquier resultado obtenido, luego de un número no muy grande de pasos.

El método de EULER, es poco preciso.

![img-6.jpeg](img-6.jpeg)


![img-7.jpeg](img-7.jpeg)
Fig. 9.3

Si se considera la ecuación diferencial de 1er. Orden y primer grado

$$
y' = f(x; y) \tag{9.1}
$$

en la que se conoce el valor de $y = y_0$ cuando $x = x_0$; suponiendo también que, las representaciones gráficas de $y$ e $y'$, son las que se muestran en la figura 9.3(a) y 9.3(b).


- Se sustituye en $y' = f(x; y)$ el valor inicial conocido de $y$,
- Se obtiene el correspondiente valor de $y'$ para $x = x_0$; y mediante la fórmula de EULER, se obtiene un valor aproximado para $y_1$, mediante la siguiente expresión

$$
P(y_1) = y_0 + y_0'h \tag{9.7}
$$

llamado **VALOR DE PREDICCIÓN** de $y_1$. En la expresión (9.7), el término $y_0'h$ es el área rectangular $A_1$.

Este área es diferente al área real bajo la curva dada, \rightarrow el valor de predicción de $y_1$, difiere del valor real.

Si el valor de predicción de $y_1$ se sustituye en $y' = f(x; y)$, se obtiene un valor aproximado de $y_1'$:

$y_1'$ se basa en el valor de predicción se utiliza \rightarrow la notación $P(y_1')$ para representarlo: $P(y'_1) = (f(x_1; P(y_1))$

Luego utilizando el área trapezoidal rayada que se muestra en 9.3 (a) como aproximación al área verdadera $y'$, es posible determinar un valor corregido de $y_1'$:

$$
C(y_1) = y_0 + \frac{y_0' + P(y'_1)}{2}h \tag{9.8}
$$

denominada **ECUACIÓN DE CORRECCIÓN**.


Esta característica del método es la que permite que se lo clasifique como **MÉTODO PREDICTOR-CORRECTOR**.

El valor corregido $y_i$ se sustituye a continuación en (9.1) para obtener un valor corregido de $y_i'$, de la siguiente manera:

$$
C(y_i') = f[x_i; C(y_i)]
$$

Este procedimiento se continúa hasta que, para dos valores consecutivos de $y_i$, su diferencia en valor absoluto, sea menor que un cierto E, positivo y arbitrario, que satisfaga las condiciones de precisión deseadas.

La forma general de las ecuaciones (9.7) y (9.8), para su aplicación en cualquier paso, insertas en el proceso de cálculo, son: (9.9)

(a) $P(y_{i+1}) = y_i + y_i' h$

$C(y_{i+1}') = f[x_{i+1}; C(y_{i+1})]$ (d)

(b) $P(y_{i+1}') = f[x_{i+1}; P(y_{i+1})]$

$C(y_{i+1}) = y_i + \frac{y_i' + C(y_{i+1}')}{2} h$ (e)

(c) $C(y_{i+1}) = y_i + \frac{y_i' + P(y_{i+1}')}{2} h$


Donde, las expresiones (9.9) (d) y (e) deben ser iteradas hasta tanto dos aproximaciones sucesivas de $C(y_{i+1})$ cumplan con la condición de error, previamente establecida.

El método modificado de EULER es un método que EMPIEZA POR SI MISMO y se clasifica como de PREDICTOR-CORRECTOR, destinado a resolver PROBLEMAS DE VALORES INICIALES.

Es posible demostrar que el error por paso que resulta de la aplicación del método modificado de EULER, está en el orden de:

$$
\mathbf{E} \leq h^3
$$

por lo que resulta de mayor precisión que el método de EULER estudiado en el punto anterior.


#### Ejercicio

- Resolver la ecuación diferencial de primer orden y primer grado $y' = 6x^2 / y$
- Con la condición inicial $y_0 = 16$, $x_0 = 4$; $h = 0.1$
- A) Con Euler .- (4,0 – 4,4)
- B) Con Euler Modificado.- (4,0 – 4,4)
- C) Compare y analice los errores entre ambos métodos.

### 7.2 Método de Runge-Kutta

Dada una ec. diferencial de primer orden primer grado que, en su expresión general, puede ser escrita de la siguiente manera:

$$
y' = f(x; y) \tag{9.1}
$$

se denomina **MÉTODO DE RUNGE-KUTTA** a todo aquel algoritmo que utiliza como expresión de la recurrencia la fórmula:

$$
y_{i+1} = y_i + a_1 k_1 + a_2 k_2 + \dots + a_n k_n \tag{9.10}
$$

Es decir $k_1$ aparece en la ecuación $k_2$, la cual aparece en la $k_3$, etc. Como cada $k$ es una evaluación funcional, esta recurrencia vuelve eficiente a los métodos **RK** para cálculos en computadora.


En la cual las $a_i$ son constantes que más adelante serán calculadas y los $k_i$ toman la forma:

$$
\begin{array}{l}
k_1 = f(x_i, y_i) \\
k_2 = f(x_i + p_1 h, y_i + q_{11} k_1 h) \\
k_3 = f(x_i + p_2 h, y_i + q_{21} k_1 h + q_{22} k_2 h) \\
\end{array}
$$

$$
\begin{array}{l}
k_n = f(x_i + p_{n-1} h, y_i + q_{n-1,1} k_1 h + q_{n-1,2} k_2 h + \dots + q_{n-1,n-1} k_{n-1} h) \\
\end{array}
$$

donde las $p$ y las $q$ son constantes.


- El valor de n, permite establecer, el ORDEN del método de RUNGE-KUTTA;
- Por lo tanto, con más propiedad se debería denominar METODOLOGÍA DE RUNGE-KUTTA, en vez de MÉTODOS DE RUNGE-KUTTA.
- Estos métodos empiezan por sí mismos, y teóricamente, es posible desarrollar un conjunto de ecuaciones (9.10) y (9.11) que logren cualquier grado de precisión deseado.
- Ventajas de esta metodología: la facilidad de programación y procesamiento.


- Desventaja: El requisito de que la función $f(x;y)$ debe ser calculada para varios $x$ e $y$ que difieren muy poco, en cada paso del procesamiento.
- Lo anterior lo convierte, en un método menos eficiente en lo que respecta a tiempo de procesamiento que otros métodos de precisión comparable.
- Inconveniente: es la dificultad que se presenta en estimar el error por paso para las soluciones intermedias de los métodos de orden superior de RUNGE-KUTTA.


Repasaremos algunos conceptos estudiados en el Análisis Matemático.

Dada una función compuesta; como $y' = f(x; y)$, en la cual es $y = y(x)$, su diferencial total vale:

$$
dy' = \frac{\partial f}{\partial x} dx + \frac{\partial f}{\partial y} dy \tag{9.12}
$$

Donde sus componentes (coeficientes) son los del **gradiente** de la función.


y su derivada con respecto a la variable $x$, es:

$$
\frac{dy'}{dx} = y'' = \frac{d^2y}{dx^2} = \frac{\partial f}{\partial x} \frac{dx}{dx} + \frac{\partial f}{\partial y} \frac{dy}{dx} = \frac{\partial f}{\partial x} + \frac{\partial f}{\partial y} \frac{dy}{dx}
$$

mientras que la derivada segunda, resulta:

$$
\frac{d^2y'}{dx^2} = y''' = \frac{\partial}{\partial x} \left( \frac{\partial f}{\partial x} + \frac{\partial f}{\partial y} \frac{dy}{dx} \right) \frac{dx}{dx} + \frac{\partial}{\partial y} \left( \frac{\partial f}{\partial x} + \frac{\partial f}{\partial y} \frac{dy}{dx} \right) \frac{dy}{dx} \tag{9.13}
$$

Operando de manera similar, es posible obtener las derivadas de mayor orden.


El desarrollo en serie de TAYLOR del segundo miembro de $y' = f(x; y)$, en el punto $(x_i; y_i)$, se puede expresar mediante:

$$
f(x_i + b; y_i + c) = f(x_i; y_i) + b \left[ \frac{\partial f(x_i; y_i)}{\partial x} \right] + c \left[ \frac{\partial f(x_i; y_i)}{\partial y} \right] +
$$

$$
\frac{1}{2!} \left\{ b^2 \left[ \frac{\partial^2 f(x_i; y_i)}{\partial x^2} \right] + 2bc \left[ \frac{\partial^2 f(x_i; y_i)}{\partial x \partial y} \right] + c^2 \left[ \frac{\partial^2 f(x_i; y_i)}{\partial y^2} \right] \right\} + \dots
$$

donde las constantes $b; c$ son los incrementos de las variables $x; y$, respectivamente.

#### Método de Runge-Kutta de primer orden
A efectos ilustrativos, para aportar claridad respecto de la aplicación de la metodología estudiada, se deduce el algoritmo correspondiente al método de RUNGE-KUTTA de 1er. orden el que, se reduce al método de EULER cuando $a_1 = 1$, pues, siendo en este caso $n = 1$, resulta:

$$
y_{i+1} = y_i + a_1 k_1 + a_2 k_{2+} \dots + a_n k_n
$$

$$
y_{i+1} = y_i + a_1 k_1
$$


pero, dado que:

$$
k_{l} = h f (x_{i}; y_{i}) = h y_{i} ^{\prime}
$$

entonces, para  $a_{l} = 1$ , se obtiene:

$$
y_{i+1} = y_{i} + h y_{1} ^{\prime} \quad (9.14)
$$

que no es otra cosa que la fórmula de EULER, como se deseaba demostrar.

#### Método de Runge-Kutta de segundo orden
Tomando siempre como base la expresión

$$
y_{i+1} = y_{i} + a_{1} k_{1} + a_{2} k_{2} + \dots + a_{n} k_{n}
$$

y, en este caso, haciendo  $n = 2$ , se convierte en:

$$
y_{i+1} = y_{i} + a_{1} k_{1} + a_{2} k_{2} \tag {9.15}
$$

donde:

$$
k_{l} = h f \left(x_{i}; y_{i}\right) \tag {9.16}
$$

$$
k_{2} = h f (x_{i} + p_{1} h; y_{i} + q_{1 1} k_{1})
$$


El problema consiste en determinar los valores de los parámetros:

$a_1; a_2; p_1; q_{11}$ de manera que la expresión:

$$
y_{i+1} = y_i + a_1 k_1 + a_2 k_2 \quad \text{suministre un valor preciso } y_{i+1}.
$$

Una interpretación gráfica de las funciones $k_i$ se ilustra

en la figura 9.4. El área sombreada con trazos representa $k_1$ y el área

sombreada con puntos $k_2$.


![img-0.jpeg](img-0.jpeg)


![img-1.jpeg](img-1.jpeg)
METODO DE RUNGE-KUTTA DE SEGUNDO ORDEN (4)
Fig. 9.4


Para hallar los valores de  $a_1$ ;  $a_2$ ;  $p_1$ ;  $q_{11}$ , la expresión

$$
y_{i+1} = y_{i} + a_{1} k_{1} + a_{2} k_{2}
$$

se hará equivalente a un desarrollo en serie de TAYLOR en el punto  $(x_{i};y_{i})$

Se desarrolla  $y_{i+1}$  en el punto  $y_i$ , resultando:

(9.17)

$$
y_{i+1} = y_{i} + h y_{i} ^{\prime} + \frac {h ^{2}}{2 !} y_{i} ^{\prime \prime} + \dots
$$

De las expresiones (9.1) y (9.12, diferencial total de una función compuesta), se puede apreciar que:

(9.18)  $y_{i}^{\prime} = f(x_{i};y_{i})$

(9.19)  $y_{i}^{\prime \prime} = \frac{\partial f(x_{i};y_{i})}{\partial x} +\frac{\partial f(x_{i};y_{i})}{\partial y} f(x_{i};y_{i})$


Sustituyendo ahora, las fórmulas (9.18) y (9.19), se obtiene (9.20)

$$
y_{i+1} = y_i + h f[x_i; y_i] + \frac{h^2}{2!} \left[ \frac{\partial f(x_i; y_i)}{\partial x} + \frac{\partial f(x_i; y_i)}{\partial y} f(x_i; y_i) \right] + \dots
$$

Observando las ecuaciones,

$$
y_{i+1} = y_i + a_1 k_1 + a_2 k_2; \tag{9.15}
$$

$$
k_2 = h f(x_i + p_1 h; y_i + q_{11} k_1)
$$

y (9.20) se ve que $k_2$ debe ser expresado en función de:

$$
f(x_i; y_i); \quad \frac{\partial f(x_i; y_i)}{\partial x} \quad \text{y} \quad \frac{\partial f(x_i; y_i)}{\partial y}
$$

si las ecuaciones (9.15) y (9.20) van a contener términos similares.


Esto se puede lograr desarrollando $k_2 = h f(x_i + p_1 h; y_i + q_{11} k_1)$ en términos de una serie de TAYLOR para dos variables; según (9.14), considerando que $b = p_1 h$; $c = q_{11} k_1$, se puede escribir:

$$
\begin{array}{l}
k_2 = h f(x_i + p_1 h; y_i + q_{11} k_1) = h \left\{ f(x_i; y_i) + p_1 h \frac{\partial f(x_i; y_i)}{\partial x} + \right. \\
\left. + q_{11} k_1 \frac{\partial f(x_i; y_i)}{\partial y} + \frac{1}{2!} \left[ p_1^2 h^2 \frac{\partial^2 f(x_i; y_i)}{\partial x^2} + 2 p_1 q_{11} h k_1 \frac{\partial^2 f(x_i; y_i)}{\partial x \partial y} + \right. \right. \\
\left. \left. + q_{11}^2 k_1^2 \frac{\partial f(x_i; y_i)}{\partial y^2} \right] + \dots \right\} \tag{9.21}
\end{array}
$$


Sustituyendo en $y_{i+1} = y_i + a_1 k_1 + a_2 k_2$

la primera de las expresiones $k_1 = h f(x_i; y_i)$

y utilizando los tres primeros términos de (9.21), se obtiene:

$$
\begin{array}{l}
y_{i+1} = y_i + a_1 h f(x_i; y_i) + a_2 h f(x_i; y_i) + a_2 h^2 \left[ \frac{\partial f(x_i; y_i)}{\partial x} p_1 + \right. \\
\left. + q_{11} \frac{\partial f(x_i; y_i)}{\partial y} f(x_i; y_i) \right] \quad (9.22) \text{ obtenida a partir de la (9.15)}
\end{array}
$$

#### Comparación término a término
Igualando los coeficientes de los términos semejantes de las expresiones (9.20) y

$$
\begin{array}{l}
y_{i+1} = y_i + h f(x_i; y_i) + \frac{h^2}{2!} \left[ \frac{\partial f(x_i; y_i)}{\partial x} + \frac{\partial f(x_i; y_i)}{\partial y} f(x_i; y_i) \right] + \dots \\
y_{i+1} = y_i + a_1 h f(x_i; y_i) + a_2 h f(x_i; y_i) + a_2 h^2 \left[ \frac{\partial f(x_i; y_i)}{\partial x} p_1 + \right. \\
\left. + q_{11} \frac{\partial f(x_i; y_i)}{\partial y} f(x_i; y_i) \right] \quad (9.22)
\end{array}
$$


Igualando los coeficientes de los términos semejantes de las expresiones (9.20) y (9.22) se obtienen las tres ec. Independientes:

$$
\left\{ \begin{array}{l} a_{1} + a_{2} = 1 \\ a_{2} p_{1} = \frac {1}{2} \\ a_{2} q_{1 1} = \frac {1}{2} \end{array} \right. \tag {9.23}
$$

que tienen cuatro incógnitas. Se trata de un sistema indeterminado de grado uno. Entonces, asignando un valor arbitrario a una de las incógnitas y resolviendo el sistema para determinar las otras tres, es posible obtener tantos conjuntos diferentes de valores, y a la vez, otros tantos conjuntos diferentes de ecuaciones (9.15) y (9.16) como se desee.


El procedimiento no es arbitrario. Puede demostrarse que en el método de segundo orden de RUNGE-KUTTA, la mayor precisión se alcanza cuando $a_1$ toma el valor $1/2$; con lo cual resulta:

$$
a_{1} = 1 / _ {2} \quad ; \quad a_{2} = 1 / _ {2} \quad ; \quad p_{1} = 1 \quad ; \quad q_{1 1} = 1
$$

con los parámetros reemplazados en las ecuaciones (9.15) y (9.16) se obtiene entonces:

$$
y_{i+1} = y_{i} + 1 / _ {2} \left(k_{1} + k_{2}\right)
$$

$$
k_{1} = h f \left(x_{i}; y_{i}\right) \tag {9.24}
$$

$$
k_{2} = h f \left(x_{i} + h; y_{i} + k_{1}\right)
$$

expresiones que en conjunto constituyen el MÉTODO DE RUNGE-KUTTA DE SEGUNDO ORDEN.


#### Error del método de Runge-Kutta de segundo orden
Una solución obtenida a partir de la aplicación de las ecuaciones dadas por las expresiones (9.24) tendrá que cometer, forzosamente, un error por truncamiento en cada paso, del orden de $h^3$, ya que, para la obtención de las ecuaciones (9.24) se han utilizado fórmulas truncadas, en las cuales fueron despreciados todos los términos que contienen a $h^3$ y sus potencias mayores.

El conjunto de expresiones (9.24) se puede utilizar para resolver ecuaciones diferenciales con una precisión equivalente a la del MÉTODO MODIFICADO DE EULER.


Reemplazando los valores de $k_1$ y $k_2$ en la expresión de $y_{i+1}$

$$
y_{i+1} = y_i + \frac{1}{2}(k_1 + k_2)
$$

de las ecuaciones (9.24), se obtiene:

$$
y_{i+1} = y_i + \frac{1}{2} \left\{ hf(x_i; y_i) + hf[x_i + h; y_i + hf(x_i; y_i) ] \right\} \tag{9.25}
$$

considerando, además, que $f(x_i; y_i) = y_i'$, y llamando a:

$$
f[x_i + h; y_i + hf(x_i; y_i)] = P(y_{i+1}')
$$


Resulta, sustituyéndolas en la (9.25):

$$
y_{i+1} = y_i + \frac{y_i' + P(y_{i+1}')}{2} h
$$

que es equivalente al MÉTODO MODIFICADO DE EULER cuando se omiten las iteraciones sucesivas, en cada paso.

#### Método de Runge-Kutta de mayor orden
De lo estudiado, es posible deducir que los MÉTODOS DE RUNGE-KUTTA de primero y segundo orden no sustituyen con ventajas apreciables a los de EULER y MODIFICADO DE EULER, respectivamente.

Para obtener métodos de RUNGE-KUTTA con mayor precisión es preciso hacer $n=3; 4; \ldots$ y seguir un procedimiento similar al utilizado para deducir el MÉTODO RUNGE-KUTTA de segundo orden, conservando en los desarrollos en serie de TAYLOR los términos que contienen $h^3; h^4; \ldots$ etc.


Por ej., para $n=3$ se llegará a un sistema de seis ecuaciones con ocho incógnitas, y haciendo una selección particular de valores para dos de esos parámetros, de manera que las expresiones resultantes maximicen la precisión, se obtiene el siguiente conjunto de ecuaciones, las que constituyen el MÉTODO DE RUNGE-KUTTA DE TERCER ORDEN:

$$
y_{i+1} = y_i + \frac{1}{6} (k_1 + 4k_2 + k_3) \tag{9.26}
$$


Donde:

$$
k_1 = hf(x_i; y_i)
$$

$$
k_2 = hf\left(x_i + \frac{h}{2}; y_i + \frac{k_1}{2}\right)
$$

$$
k_3 = hf(x_i + h; y_i - k_1 + 2k_2)
$$

El error que se comete al utilizar estas expresiones, resulta:

$$
\mathbf{E} \leq h^4
$$

pues, se han despreciado en los desarrollos en serie de TAYLOR, utilizados para deducirlo, todos aquellos términos que contienen $h^4$, y sus potencias mayores.


Ya en este orden, el MÉTODO DE RUNGE-KUTTA sustituye con ciertas ventajas de precisión a todos los estudiados anteriormente.

El método más frecuentemente utilizado, dentro de la metodología estudiada, es el MÉTODO DE RUNGE-KUTTA DE CUARTO ORDEN, el que resulta de hacer $n=4$ en la expresión (9.10), igualar términos hasta los que contienen $h^4$ y seleccionar un conjunto particular de los parámetros arbitrarios, que maximicen la precisión.


Los resultados del cálculo descripto en el párrafo anterior, concluyen en el siguiente conjunto de ecuaciones:

$$
y_{i+1} = y_i + \frac{1}{6} \left(k_1 + 2k_2 + 2k_3 + k_4\right) \tag{9.27}
$$

$$
k_1 = h f(x_i; y_i)
$$

donde:

$$
k_2 = h f\left(x_i + \frac{h}{2}; y_i + \frac{k_1}{2}\right)
$$

$$
k_3 = h f\left(x_i + \frac{h}{2}; y_i + \frac{k_2}{2}\right)
$$

$$
k_4 = h f(x_i + h; y_i + k_3)
$$

que, en su conjunto constituyen el método aludido.


#### Representación gráfica de pendientes
![img-2.jpeg](img-2.jpeg)
FIGURA 25.15 Representación gráfica de las pendientes estimadas empleadas en el método RK de cuarto orden.

#### Error en los métodos de Runge-Kutta de mayor orden
En el último algoritmo, dado por las expresiones (9.27), debido a que se han despreciado en los desarrollos en serie de TAYLOR correspondientes, los términos que contienen $h^4$, como aquellos que contienen potencias mayores, se cometen un error:

$$
\mathbf {E} \leq h ^{5}
$$

lo que convierte a este, en un método apto para resolver problemas normales de ingeniería y otras ramas científicas.


En general, por la misma razón apuntada al estudiar el error de los métodos de RUNGE-KUTTA del orden primero al cuarto, para el de orden $n$ será:

$$
\mathbf {E} \leq h ^{n+1}
$$

por lo cual, al menos teóricamente, es posible desarrollar un conjunto de ecuaciones que tenga cualquier grado deseado de precisión, con solo tomar $n$ suficientemente grande.

### 7.3 Métodos que no comienzan por sí mismos

Análisis Numérico.- Burden y Faires.- Ed. IberoAmérica. 1996.-


#### Problemas de valores iniciales que no empiezan por sí mismos
- Estos métodos pueden ser definidos como aquellos para los cuales un solo valor de la variable dependiente, dada en la solución inicial, no es suficiente para dar inicio al procedimiento de integración numérica.
- Es necesario el conocimiento de más de un punto de la solución, según el caso (en general 3,4 0 más).


#### Método de Milne
Sea la ecuación diferencial general de primer orden y primer grado, :

$$
y' = f(x; y) \tag{10.1}
$$

donde, al menos se conoce un punto de la solución $(x_0; y_0)$, llamada Solución Inicial.

Se dividirá el área bajo un arco dado de la curva $y' = f(x; y)$ en cuatro intervalos de amplitud $h$ (ver figura 10.1).

El área real bajo esta porción de curva se aproxima considerando el área de estas cuatro franjas como la abarcada por una parábola de segundo grado que tiene tres puntos en común con la curva real


![img-0.jpeg](img-0.jpeg)

- Figura 10.1 -


Si se hace coincidir el eje de las ordenadas con $y_{i-1}'$ no se pierde generalidad y se tiene la ventaja de simplificar las expresiones. De esta manera, el área bajo la parábola está dada por:

$$
A = \int_{-2x}^{2y} \left( ax^2 + bx + c \right) dx
$$

la que integrada resulta :

$$
A = \frac{16}{3} ah^3 + 4ch \tag{10.2}
$$

siendo las constantes $a$, $c$:

$$
a = \frac{y_i' - 2y_{i-1}' + y_{i-2}'}{2h^2}, \quad c = y_{i-1}' \tag{10.3}
$$


> Sustituyendo los coeficientes dados por (10.3) en la (10.2) se obtiene, para el área $A$ de las cuatro franjas:

$$
A = \frac{4}{3} h \left[ 2y_i' - y_{i-1}' + 2y_{i-2}' \right] \tag{10.4}
$$

Expresión que será utilizada como parte de la ecuación de predicción.

Considerando la ecuación (10.1), esta técnica consiste en obtener valores apropiados de $y$ utilizando una ecuación de PREDICCIÓN y corrigiendo luego estos valores, por el uso iterativo de una ecuación de CORRECCIÓN.


![img-1.jpeg](img-1.jpeg)


Ecuación de PREDICCIÓN DE MILNE :

$$
P \left(y_{i+1}\right) = y_{i - 3} + A = y_{i - 3} + \frac {4}{3} h \left[ 2 y_{i} ^{\prime} - y_{i - 1} ^{\prime} + 2 y_{i - 2} ^{\prime} \right] \tag {10.5}
$$

Utiliza el área de cuatro franjas bajo una aproximación parabólica de segundo grado.

La ecuación de CORRECCIÓN DE MILNE está dada por:

$$
C \left(y_{i+1}\right) = y_{i - 1} + \frac {h}{3} \left[ y_{i - 1} ^{\prime} + 4 y_{i} ^{\prime} + P \left(y_{i+1} ^{\prime}\right) \right] \tag {10.6}
$$

Y utiliza la regla de SIMPSON para determinar el área de dos franjas bajo una curva y suministrar así, valores corregidos de la variable dependiente.

![img-2.jpeg](img-2.jpeg)


La ecuación de CORRECCIÓN DE MILNE está dada por:

$$
C \left(y_{i+1}\right) = y_{i - 1} + \frac {h}{3} \left[ y_{i - 1} ^{\prime} + 4 y_{i} ^{\prime} + P \left(y_{i+1} ^{\prime}\right) \right] \tag {10.6}
$$

- Suponiendo conocidos los valores de $y_0, y_1; y_2; y_3$, el primer paso consiste en obtener el $P(y_4)$, utilizando la ec. (10.5) con $i = 3$.
- El valor así hallado se sustituye en la ec. diferencial para obtener $y_4'$, designado $P(y_4')$.
- Este último se utiliza, entonces en (10.6) para obtener un corregido de $y_4$.
- Dado que se ha partido del supuesto que se conocen cuatro valores de $y$, deben ser calculadas las derivadas primeras en los respectivos puntos: $y_0', y_1'; y_2'; y_3'$.


Deben ser determinados de alguna manera valores para: $Y_1', Y_2', Y_3', Y_1', Y_2', Y_3$

El uso de la serie de TAYLOR, resulta preciso para determinar los tres primeros valores que permiten iniciar el procedimiento. Es necesario conocer las derivadas sucesivas primeras en el punto $x = x_0$, para lograr su aplicación.

Es de buena práctica recurrir al uso del Método de Runge-Kutta para obtener aquellos valores iniciales, necesarios para la aplicación del Método de Milne.

La solución de la ecuación $y' = f(x; y)$ se puede lograr utilizando el método de RUNGE-KUTTA de cuarto orden, pero el método de MILNE utiliza menos tiempo de procesamiento y la estimación del error es más sencilla y precisa.

La ecuación de corrección expresada en (10.6), juntamente con la ecuación diferencial dada (10.1), se utilizan en forma iterativa hasta que dos valores consecutivos de $y_{i+1}$ difieran en menos de un cierto E previamente establecido.


Ejemplo 10.1.- Resolver la ecuación diferencial $y' = x + y$, con la condición inicial (0;0) en el intervalo (0;2,4), siendo $h = 0,3$ y tomando $\mathbf{E} < 0,001$.

Solución: Mediante la serie de TAYLOR es posible calcular:

$$
\begin{array}{l}
y(0,3) = 0,050 \quad ; \quad y'(0,3) = 0,350 \\
y(0,6) = 0,222 \quad ; \quad y'(0,6) = 0,822 \\
y(0,9) = 0,560 \quad ; \quad y'(0,9) = 1,460 \\
\end{array}
$$


Métodos que no se inician por sí mismos

4. En función a los resultados obtenidos en 3.a complete la siguiente tabla:

|  x | y | y²  |
| --- | --- | --- |
|  0 |  |   |
|  0,2 |  |   |
|  0,4 |  |   |
|  0,6 |  |   |

a) Calcule la solución en los puntos x=0,8 y x=1, aplicando el Método de Milne.

MÉTODO DE MILNE (8)

Aplicando sistemáticamente las ecuaciones (10.5), (10.1) y (10.6) se obtiene

|  x_i | P(y_{i+1}) | P(y'_{i+1}) | C(y_{i+1}) | C(y'_{i+1}) | C(y_{i+1})  |
| --- | --- | --- | --- | --- | --- |
|  1,2 | 1,119 | 2,319 | 1,119 | 2,319 | 1,119  |
|  1,5 | 1,979 | 3,479 | 1,982 | 3,482 | 1,981  |
|  1,8 | 3,248 | 5,048 | 3,249 | 5,049 | 3,249  |
|  2,1 | 5,062 | 7,162 | 5,066 | 7,166 | 5,066  |
|  2,4 | 7,618 | 10,018 | 7,622 | 10,019 | 7,623  |


#### Error en el método de Milne
Las ecuaciones de Predicción (10.5) y de Corrección (10.6) resultan exactas bajo condiciones muy particulares. Puede demostrarse que el error cometido con la aplicación de las ecuaciones es del orden:

$$
\mathbf {E} \leq - \frac {1}{9 0} h ^{5} f ^{I V} (\theta) \tag {10.7}
$$

donde  $x_{i - 3} <   \theta <  x_{i - 1}$

El error no puede ser calculado con exactitud, pero, puede acotarse tomando el extremo del intervalo que hace máxima la derivada cuarta de  $f$ .

#### Generalización del método de Milne
Los principios empleados en la deducción de las fórmulas de Predicción (10.5) y Corrección (10.6) del método se prestan a ser extendidas a otros. Esto hace aumentar la precisión de las fórmulas pero, se requerirán más de cuatro puntos de la curva integral. Para el caso particular de 6 franjas bajo la curva  $y'(x)$ :

$$
P \left(y_{i+1}\right) = y_{i - 5} + \frac {3}{1 0} h \left[ 1 1 y_{i - 4} ^{\prime} - 1 4 y_{i - 3} ^{\prime} + 2 6 y_{i - 2} ^{\prime} - 1 4 y_{i - 1} ^{\prime} + 1 1 y_{i} ^{\prime} \right] \tag {10.8}
$$

$$
C \left(y_{i+1}\right) = y_{i - 3} + \frac {2}{4 5} h \left[ 7 y_{i - 3} ^{\prime} + 3 2 y_{i - 2} ^{\prime} + 1 2 y_{i - 1} ^{\prime} + 3 2 y_{i} ^{\prime} + 7 P \left(y_{i+1} ^{\prime}\right) \right] \tag {10.9}
$$

El error que se comete por paso, aplicando las expresiones (10.8) y (10.9) es del orden:

$$
E \leq \left| - \frac {8}{9 4 5} h ^{7} f ^{V I I} (\theta) \right| \quad (1 0.1 0) \quad x_{i - 5} <   \theta <   x_{i - 2}
$$


#### Estabilidad de los métodos de integración
PASO: conjunto de operaciones aritméticas elementales y decisiones lógicas que componen la parte del algoritmo de resolución de una ecuación diferencial, destinada a determinar el valor de la variable en cada punto del intervalo comprometido en el procesamiento.

El error por paso de un método aproximado se denomina **ERROR LOCAL**, puesto que es un error que se introduce en el paso correspondiente del proceso de integración.

El **ERROR TOTAL** que existe en la solución durante un paso particular (diferencia entre el valor verdadero y el valor calculado numéricamente) depende no solo de la magnitud de los errores locales introducidos por ese paso particular, sino también de las características de propagación de los errores locales que se han introducido en los pasos previos.


Sea la ecuación diferencial: $$y' = f(x; y)$$ (10.1)

**Definición 10.1.-** "Se dice que un método numérico es ESTABLE, si en el proceso de integrar una ecuación diferencial, donde $f_y < 0$, la diferencia entre la solución real y la solución numérica (error total), tiende a disminuir en magnitud conforme la integración progresa".

**Definición 10.2.-** "Se dice que un método numérico destinado a resolver ecuaciones diferenciales, es RELATIVAMENTE ESTABLE, si la velocidad de crecimiento del error total durante el proceso de integración es menor que la velocidad de crecimiento del valor absoluto de la solución".


La **estabilidad** de un método de integración numérica no se define en el caso en que la derivada con respecto a $y$ sea mayor que cero $(f_y > 0)$.

Si $(f_y > 0)$: la solución de la ecuación diferencial crecerá en forma exponencial y el error total generalmente crecerá en la misma forma. Para la solución de una ecuación de ese tipo, sobre un rango extendido de integración, se debe utilizar un método que sea **RELATIVAMENTE ESTABLE**, pues, suponiendo que la solución exacta tiene la forma:

$$
y = A e^x \tag{10.11}
$$

El error total causado por el método numérico en la solución debe tener la forma general siguiente

$$
\mathbf{E} = B e^{mx} \tag{10.12}
$$

Si es $m < 1$, el método se considera relativamente estable


**Estabilidad relativa**: es también importante cuando se utiliza para resolver una ecuación, para la cual $f_y < 0$, la solución tiende a cero asintóticamente, porque, se desea una solución precisa que encierre un valor de $y$ muy cercano a cero.

La velocidad de disminución del error total debe ser mayor que la de la solución. En forma analítica, si la solución tiene la forma:

$$
y = A e^{-x} \tag{10.13}
$$

entonces el error total producido por el método debe tener la forma general:

$$
\mathbf{E} = B e^{-mx} \tag{10.14}
$$

en el cual $m > 1$, para que el método se considere relativamente estable.


Los conceptos de ESTABILIDAD y ESTABILIDAD RELATIVA son independientes y no excluyentes; de ningún modo el primero implica al segundo, como parte propia; ni tampoco que, el segundo invalida al primero de los mencionados.

La propagación de los errores durante una integración no es un obstáculo serio en la solución de la mayoría de los problemas prácticos. El uso de valores relativamente pequeños de $h$ suministrará respuestas suficientemente precisas, independientemente de las características de estabilidad o estabilidad relativa del método numérico empleado.

Sin embargo, si se desearan soluciones sobre intervalos de integración muy grandes, se deberá recurrir a métodos estables o relativamente estables

#### Método de Hamming
Esté método, permite resolver ecuaciones diferenciales del tipo $y' = f(x; y)$ y es ESTABLE y RELATIVAMENTE ESTABLE.

Se trata, de un método del tipo PREDICTOR - CORRECTOR

Utiliza, la misma fórmula de predicción que el método de MILNE:

$$
P(y_{i+1}) = y_{i-3} + \frac{4}{3} h \left[ 2 y_i' - y_{i-1}' + 2 y_{i-2}' \right] \tag{10.15}
$$

Para obtener una mejor aproximación de este valor se utiliza la denominada ECUACIÓN GENERALIZADA DE CORRECCIÓN DE HAMMING dada por la siguiente expresión:

$$
y_{i+1} = a_i y_i + a_{i-1} y_{i-1} + a_{i-2} y_{i-2} + h \left[ b_{i+1} y_{i+1}' + b_i y_i' + b_{i-1} y_{i-1}' \right] \tag{10.15}
$$


Sustituyendo los valores de $y_{i-2}$; $y_{i-1}$; $y_{i'}$; $y_{i-1}'$; $y_{i+1}'$ por sus respectivos desarrollos en serie de TAYLOR en función de $y_i$, se obtiene:

$$
\begin{array}{l}
y_{i+1} = a_i y_i + a_{i-1} \left[ y_i + y_i'(-h) + \frac{1}{2!} y_i''(-h)^2 + \frac{1}{3!} y''_i'(-h)^3 + \dots \right] + \tag{10.16} \\
\quad + a_{i-2} \left[ y_i + y_i'(-2h) + \frac{1}{2!} y_i''(-2h)^2 + \frac{1}{3!} y_i''(-2h)^3 + \dots \right] + \\
\quad + h \left\{ b_{i+1} \left[ y_i' + y_i''h + \frac{1}{2!} y_i''h^2 + \frac{1}{3!} y_i^{IV} h^3 + \dots \right] + b_{i} y_i' + \right. \\
\quad \left. + b_{i-1} \left[ y_i' + y_i''(-h) + \frac{1}{2!} y_i''(-h)^2 + \frac{1}{3!} y_i^{IV} (-h)^3 + \dots \right] \right\}
\end{array}
$$

El desarrollo en serie de TAYLOR de la función $y_{i+1}$, resulta:

$$
y_{i+1} = y_i + h y_i' + \frac{1}{2!} h^2 y_i'' + \frac{1}{3!} h^3 y_i''' + \dots \tag{10.17}
$$


Igualando los coeficientes, en la expresión (10.16) con los homólogos de (10.17), se llega al siguiente conjunto de ecuaciones lineales simultáneas:

$$
\left\{
\begin{array}{l}
a_i + a_{i-1} + a_{i-2} = 1 \\
- a_{i-1} - 2 a_{i-2} + b_{i+1} + b_i + b_{i-1} = 1 \\
\frac{1}{2} a_{i-1} + 2 a_{i-2} + b_{i+1} - b_{i-1} = \frac{1}{2} \\
- \frac{1}{6} a_{i-1} - \frac{4}{3} a_{i-2} + \frac{1}{2} b_{i+1} + \frac{1}{2} b_{i-1} = \frac{1}{6} \\
\frac{1}{24} a_{i-1} + \frac{2}{3} a_{i-2} + b_{i+1} - \frac{1}{6} b_{i-1} = \frac{1}{24}
\end{array}
\right.
$$

Sistema con seis incógnitas. Será necesario, de una sexta ecuación para determinar su valor, HAMMING demuestra que $a_{i-1} = 0$, se logra una ecuación de corrección que es estable y relativamente estable cuando se imponen ciertas condiciones a la magnitud del incremento $h$.


Utilizando $a_{i-1} = 0$, el sistema (10.18) arroja los siguientes valores:

$$
a_i = \frac{9}{8}; a_{i-1} = 0; a_{i-2} = -\frac{1}{8}; b_{i+1} = \frac{3}{8}; b_i = \frac{3}{4}; b_{i-1} = -\frac{3}{8} \tag{10.19}
$$

La sustitución de los valores obtenidos, en la ecuación (10.15) produce la ECUACIÓN DE CORRECCIÓN DE HAMMING:

$$
C(y_{i+1}) = \frac{1}{8} \left\{9 y_i - y_{i-2} + 3 h \left[ P(y_{i+1}') + 2 y_i' - y_{i-1}' \right] \right\} \tag{10.20}
$$


Esta ecuación es ESTABLE y RELATIVAMENTE ESTABLE cuando $f_y < 0$, si se toma:

$$
h < \frac{0,75}{|f_y|} \tag{10.21}
$$

Usada conjuntamente con la ecuación (10.20), para realizar la iteración hasta lograr la convergencia deseada

La ecuación de corrección es RELATIVAMENTE ESTABLE para la solución de las ecuaciones diferenciales en intervalos donde $f_y > 0$, cuando:

$$
h < \frac{0,4}{f_y} \tag{10.22}
$$


Para mantener pequeño el error por paso, el valor de $h$ debe ser menor que los especificados por las relaciones (10.21) y (10.22). En este método es del orden de $h^2$.

Operación del método: calcular los valores de $y_{i-2}$; $y_{i-1}$; $y_i$; $y_{i-2}'$; $y_{i-1}'$; $y_i'$.

Una vez obtenidos, predecir el valor de $y_{i+1}$ por medio de la fórmula (10.5) de predicción de MILNE, luego utilizar la ecuación diferencial dada (10.1) para calcular una predicción de la derivada primera.

Por último, corregir las predicciones mediante la aplicación iterativa de la fórmula de corrección de HAMMING (10.20), hasta obtener la convergencia deseada.

#### Método modificado de Hamming
La mayor parte del error que se comete en el cálculo del valor de predicción, se puede eliminar utilizando la siguiente ecuación:

$$
M(y_{i+1}) = P(y_{i+1}) - \frac{112}{121}[P(y_i) - C(y_i)] \tag{10.23}
$$

Este valor se sustituye luego en la ecuación diferencial y se obtiene un valor modificado de $y_{i+1}'$. $M(y_{i+1}')$; se utiliza en la ecuación de corrección para obtener

$$
C(y_{i+1}) = \frac{1}{8} \left\{9 y_i - y_{i-2} + 3 h \left[ P(y_{i+1}') + 2 y_i' - y_{i-1}' \right] \right\} \tag{10.24}
$$

El valor del corregido puede a su vez mejorarse utilizando la expresión:

$$
F(y_{i+1}) = C(y_{i+1}) - \frac{9}{121}[P(y_{i+1}) - C(y_{i+1})] \tag{10.25}
$$

Donde $F(y_{i+1})$ representa directamente, es decir sin iteraciones, el VALOR FINAL DEL MÉTODO MODIFICADO DE HAMMING


Este método también resulta estable y relativamente estable si se aplica en el caso en que $f_y < 0$, tomando el incremento:

$$
h < \frac{0,65}{|f_y|}
$$

En caso contrario; cuando $f_y > 0$, resulta relativamente estable tomando al incremento:

$$
h < \frac{0,4}{f_y}
$$

#### Análisis del error
El objetivo primordial del análisis del error consiste en suministrar un método para controlar el error total

El error total en cualquier paso proviene, de las siguientes fuentes:

a) El ERROR POR REDONDEO
b) El ERROR POR TRUNCAMIENTO
c) El ERROR ACUMULADO


Se debe recordar que, en ocasiones, los valores iniciales con que se da origen al proceso están afectados de ciertos errores denominados INHERENTES. En estos casos no tiene ningún sentido calcular la solución con mayor precisión que la que justifican los datos utilizados, seleccionando un tamaño de paso demasiado pequeño.

Tarea crítica es definir el tamaño del paso. Es necesario examinar el efecto de cada uno de los errores por paso, en función del incremento y su influencia sobre el error total.


El error POR REDONDEO está presente en cada paso y su magnitud depende de la capacidad del soporte de la computadora utilizada. Es independiente del tamaño del intervalo, y aumenta en proporción con el número de pasos comprometidos en el procesamiento.

El error POR TRUNCAMIENTO aparece también en cada paso del proceso, pero es función de la magnitud del intervalo $h$, ya que varía con el orden del error $h^n$.

La única forma de controlar el error total por paso consiste en controlar el error por truncamiento, en cada paso el error total disminuye conforme se reduce el error por truncamiento de cada paso.


#### Selección de un método de integración numérica
Habiéndose estudiado algunos de los métodos de integración numérica existentes, para resolver ecuaciones diferenciales, y el error que en cada uno de ellos se comete.

Es conveniente compararlos desde un punto de vista tal que permita seleccionar el más apto para una aplicación determinada, siguiendo ciertos criterios definidos:


1. Cuando el intervalo de integración de un problema es relativamente corto, es poco probable que la estabilidad sea un problema, de manera que un método simple como el de Euler o Modificado de Euler, es aceptable
2. Para intervalos que involucran un gran nro de pasos, el error por truncamiento por paso debe mantenerse pequeño. Los métodos de Milne y de Hamming resultan adecuados en este caso.
3. En caso de intervalos muy grandes, deberá utilizarse el método de Hamming para valores de $h$ que lo hagan estable, además de realizar un análisis del error en cada paso


4. Cuando se desea un error por truncamiento por paso pequeño y no es importante el tiempo por procesamiento, resulta conveniente el método de 4to orden de Runge-Kutta

5. Si el rango de integración es intermedio, y además debe considerarse la acumulación del error y el tiempo por procesamiento, pero ninguno como factor crítico, se utilizan los métodos modificado de Euler o Runge-Kutta de orden 3.
