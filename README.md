# Laboratorios - A TAURI APP

## Índice
- [Descripción](#descripción)
- [Instalación](#instalación)
- [Laboratorio 1](#laboratorio1)
- [Laboratorio 2](#laboratorio2)
- [Laboratorio 3](#laboratorio3)
- [Laboratorio 4](#laboratorio4)
- [Laboratorio 5](#laboratorio5)
- [Laboratorio 6](#laboratorio6)
- [Laboratorio 7](#laboratorio7)

## Descripción

Proyecto destinado a crear una app de escritorio para los laboratorios de la materia Métodos Computacionales de la carrera Licenciatura en Sistemas
de la UNNE. A cargo de [Diaz, Isaac](https://github.com/IsaacDiaz211) y [Pérez Ruíz, Federico](https://github.com/Fede-Code-007).
Construido con TypeScript, React y Tauri.
Más informacíon sobre las tecnologías usadas:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://es.react.dev/)
- [Tauri](https://tauri.app/)
- [Ant Design](https://ant.design/)
- [Katex](https://katex.org/)

## Instalación
¿Quiere instalar y probar la app en su escritorio Windows? Sigue los siguientes pasos:

### 🔧 Requisitos previos

Antes de comenzar, asegurate de tener instalados los siguientes componentes:

#### 📦 Node.js ≥ 18
Descargá desde [nodejs.org](https://nodejs.org/)
#### 📦 Rust ≥ 1.89.0
Descargá desde [rust-lang.org](https://rust-lang.org/learn/get-started/)
#### 📦 Microsoft C++ Build Tools
Descargá desde [c++-build-tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

Es importante reiniciar la Terminal para asegurarse que reconozca la nueva instalación. En algunos casos, podría ser necesario reiniciar el equipo.
Una vez listo con los requisitos puedes clonar el repositorio o descargarlo en formato zip. Abre una terminal y ubicate en la carpeta donde haz
creado el proyecto, instala las dependencias, espera a que esté listo y ejecuta el proyecto:
`npm install`
`npm run tauri dev`
Si desea obtener el ejecutable '.exe', utilice `npm run tauri build`, le generará el archivo y lo encontrará al finalizar su ejecución en la carpeta
Laboratorios\Laboratorios\src-tauri\target\release\bundle\nsis.

## Laboratorio 1
Ejercicios 
1. Dado 𝑁 números positivos, hallar la suma de todos los valores de 𝑋1 a 𝑋𝑁. Probar con N 
comprendido en el siguiente rango de representación de números enteros: 0 a 255. 
Luego probar con N=10000.
  Para cargar listas mayores a 15 elementos se requerirá un archivo '.json' con el siguiente formato:  
"[  
  x1,  
  x2,  
  ...  
  xn  
]"

2. Dados 200 números positivos hallar la suma de todos los valores pares desde 𝑋1 a 𝑋𝑁.
   Para cargar listas mayores a 15 elementos se requerirá un archivo '.json' con el siguiente formato:  
"[  
  x1,  
  x2,  
  ...  
  xn  
]"

3. Obtener los N primero números de la sucesión de Fibonacci. Probar con N=200

4. Si al quíntuple de un número se le suma el triple de su cuadrado, se obtiene el triple del 
mismo más 1. Armar la ecuación de segundo grado correspondiente y encontrar los 
valores numéricos que cumplen esa condición

5. Calcular e imprimir el valor del número 𝑒 como suma de la serie:
   e = 1 + 1/1! + 1/2! + ... 1/n!

6. Sea tener que calcular el valor de la constante absoluta 𝑃𝑖 con 𝑛 cifras decimales exactas 
deducida a partir de un desarrollo en serie de Taylor. Utilizar la expresión dada por la 
serie:
  Pi = 4 * (1 - 1/3 + 1/5 - 1/7 + ...)
  i. Calcular la cantidad de términos de la serie necesarios para alcanzar 3 dígitos 
  exactos. 
  ii. Calcular la cantidad de términos de la serie necesarios alcanzar 4 dígitos decimales 
  y luego la cantidad de término necesarios para alcanzar 5 dígitos decimales exactos. 
  Comparar los resultados con el obtenido en el punto anterior teniendo en cuenta 
  la convergencia. Controlar los tiempos de ejecución utilizando los comandos cputime, 
  oclock u otro que considere apropiado. Emitir conclusiones. 

## Laboratorio 2
1. Dados 𝜋 y e redondeados a seis decimales, ¿cuantos dígitos significativos y decimales 
correctos tendrá el cociente 𝜋 / e?

3.  Se mide un folio de 29,6 cm obteniéndose un resultado de 30 cm. Si con la misma regla 
se mide el ancho de un pupitre de 65,0 cm, dando como resultado 65,4 cm. ¿Cuál es la 
medida más precisa? ¿Por qué? 

4. La fórmula cuadrática −𝑏±√𝑏2−4𝑎𝑐 /2𝑎 permite obtener las raíces de la ecuación cuadrática 
a𝑥2 + 𝑏𝑥 + 𝑐 = 0.   Resuelva   la   ecuación   a𝑥^(2) + b𝑥 + 𝑐 cuando a = , 𝑐 = 1 y b = 108 
manualmente y a través del uso de la computadora. Interprete los resultados. 

4. En la medida de 1 m se ha cometido un error de 1 mm, y en 300 Km, 300 m. ¿Qué error 
relativo es mayor?

6. Una piscina tiene de dimensiones √2 m de ancho y √8 m de largo. Al realizar con la 
calculadora dichas raíces obtenemos un ancho de, aproximadamente 1,41 m y un largo 
de, aproximadamente 2,83 m. Si queremos calcular el área de la piscina, tenemos que 
ésta tiene un valor de: A = 1,41 x 2,83 = 3,99 𝑚2 . 
a) ¿Es ese el valor real del área? Justificar por qué. 
b) ¿Existe alguna otra forma de calcular el área de manera más exacta? 

7. Investigue el efecto del error de redondeo en un gran número de cálculos 
interdependientes. Desarrolle un programa que sume un número 100 000 veces. Sume 
el número 1 con precisión simple, y 0.00001 con precisiones simple y doble. 
 
8. La serie infinita 𝑓(𝑁) = ∑i hasta N de 1/i^(2) converge sobre un valor de 𝑓(𝑁) = 𝜋2/6 conforme 𝑁 tiende 
a infinito. Escriba un programa para calcular (𝑁) para 𝑁 = 10000 por medio de calcular la 
suma desde i = 1 hasta 10000. Después repita el cálculo pero en sentido inverso (desde =10000 hasta 1). Explique los resultados.

## Laboratorio 3
## Laboratorio 4
## Laboratorio 5
## Laboratorio 6
## Laboratorio 7
