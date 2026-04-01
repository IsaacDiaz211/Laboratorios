import { askConfirm, askSelect } from "./core/input";
import { runLab1Exercise1 } from "./labs/lab1/lab1-1";
import { runLab1Exercise2 } from "./labs/lab1/lab1-2";
import { runLab1Exercise3 } from "./labs/lab1/lab1-3";
import { runLab1Exercise4 } from "./labs/lab1/lab1-4";
import { runLab1Exercise5 } from "./labs/lab1/lab1-5";
import { runLab1Exercise6 } from "./labs/lab1/lab1-6";
import { runLab2Exercise1 } from "./labs/lab2/lab2-1";
import { runLab2Exercise3 } from "./labs/lab2/lab2-3";
import { runLab2Exercise4 } from "./labs/lab2/lab2-4";
import { runLab2Exercise6 } from "./labs/lab2/lab2-6";
import { runLab2Exercise7 } from "./labs/lab2/lab2-7";
import { runLab3Exercise1 } from "./labs/lab3/lab3-1";
import { runLab4Exercise1 } from "./labs/lab4/lab4-1";
import { runLab4Exercise2 } from "./labs/lab4/lab4-2";
import { runLab4Exercise3 } from "./labs/lab4/lab4-3";
import { runLab4Exercise4 } from "./labs/lab4/lab4-4";
import { runLab4Exercise5 } from "./labs/lab4/lab4-5";
import { runLab4Exercise6 } from "./labs/lab4/lab4-6";
import { runLab5Exercise1 } from "./labs/lab5/lab5-1";
import { runLab5Exercise2 } from "./labs/lab5/lab5-2";
import { runLab5Exercise3 } from "./labs/lab5/lab5-3";
import { runLab5Exercise4 } from "./labs/lab5/lab5-4";
import { runLab5Exercise5 } from "./labs/lab5/lab5-5";
import { runLab5Exercise6 } from "./labs/lab5/lab5-6";
import { runLab6Exercise1 } from "./labs/lab6/lab6-1";
import { runLab6Exercise2 } from "./labs/lab6/lab6-2";
import { runLab6Exercise3 } from "./labs/lab6/lab6-3";
import { runLab6Exercise4 } from "./labs/lab6/lab6-4";
import { runLab6Exercise5 } from "./labs/lab6/lab6-5";
import { runLab6Exercise6 } from "./labs/lab6/lab6-6";
import { runLab6Exercise7 } from "./labs/lab6/lab6-7";
import { runLab7Exercise1 } from "./labs/lab7/lab7-1";
import { runLab7Exercise2 } from "./labs/lab7/lab7-2";
import { runLab7Exercise3 } from "./labs/lab7/lab7-3";
import { runLab7Exercise4 } from "./labs/lab7/lab7-4";
import { runLab7Exercise5 } from "./labs/lab7/lab7-5";
import { runLab7Exercise6 } from "./labs/lab7/lab7-6";

type Exercise = {
  title: string;
  run: () => Promise<void>;
};

function clearConsole(): void {
  console.clear();
}

const lab1Exercises: Exercise[] = [
  { title: "1) Suma de valores (0..255)", run: runLab1Exercise1 },
  { title: "2) Suma de pares (200 numeros)", run: runLab1Exercise2 },
  { title: "3) Sucesion de Fibonacci", run: runLab1Exercise3 },
  { title: "4) Raices 3*x^2 + 2*x - 1 = 0", run: runLab1Exercise4 },
  { title: "5) Calculo de e", run: runLab1Exercise5 },
  { title: "6) Calculo de pi", run: runLab1Exercise6 },
];

const lab2Exercises: Exercise[] = [
  { title: "1) Digitos correctos de pi/e", run: runLab2Exercise1 },
  { title: "3) Raices ax^2 + bx + c", run: runLab2Exercise3 },
  { title: "4) Error relativo mayor", run: runLab2Exercise4 },
  { title: "6) Sumas con precision", run: runLab2Exercise6 },
  { title: "7) Serie 1/n^2", run: runLab2Exercise7 },
];

const lab3Exercises: Exercise[] = [
  { title: "1) Raices de ecuaciones", run: runLab3Exercise1 },
];

const lab4Exercises: Exercise[] = [
  { title: "1) Eliminacion de Gauss", run: runLab4Exercise1 },
  { title: "2) Gauss-Jordan", run: runLab4Exercise2 },
  { title: "3) Descomposicion LU", run: runLab4Exercise3 },
  { title: "4) Gauss-Seidel", run: runLab4Exercise4 },
  { title: "5) Fadeev-Leverrier", run: runLab4Exercise5 },
  { title: "6) Metodo de las potencias", run: runLab4Exercise6 },
];

const lab5Exercises: Exercise[] = [
  { title: "1) Newton-Gregory Ascendente", run: runLab5Exercise1 },
  { title: "2) Newton-Gregory Descendente", run: runLab5Exercise2 },
  { title: "3) Interpolacion Inversa Lineal", run: runLab5Exercise3 },
  { title: "4) Interpolacion Inversa Cuadratica", run: runLab5Exercise4 },
  { title: "5) Lagrange", run: runLab5Exercise5 },
  {
    title: "6) Interpolacion parabolica progresiva",
    run: runLab5Exercise6,
  },
];

const lab6Exercises: Exercise[] = [
  { title: "1) Construir tabla de diferencias", run: runLab6Exercise1 },
  {
    title: "2) Derivacion por Newton-Gregory Ascendente",
    run: runLab6Exercise2,
  },
  {
    title: "3) Derivacion por Newton-Gregory Descendente",
    run: runLab6Exercise3,
  },
  { title: "4) Integracion por Trapecio", run: runLab6Exercise4 },
  { title: "5) Integracion por Simpson 1/3", run: runLab6Exercise5 },
  { title: "6) Integracion por Simpson 3/8", run: runLab6Exercise6 },
  { title: "7) Integracion combinada", run: runLab6Exercise7 },
];

const lab7Exercises: Exercise[] = [
  { title: "1) Metodo de Euler", run: runLab7Exercise1 },
  { title: "2) Metodo Modificado de Euler", run: runLab7Exercise2 },
  { title: "3) Runge-Kutta de 2do orden", run: runLab7Exercise3 },
  { title: "4) Runge-Kutta de 4to orden", run: runLab7Exercise4 },
  { title: "5) Metodo de Milne", run: runLab7Exercise5 },
  { title: "6) Comparacion entre metodos", run: runLab7Exercise6 },
];

async function chooseExercise(exercises: Exercise[]): Promise<Exercise> {
  const choiceIndex = await askSelect<number>(
    "Seleccione un ejercicio",
    exercises.map((exercise, index) => ({
      title: exercise.title,
      value: index,
    }))
  );
  return exercises[choiceIndex];
}

async function main(): Promise<void> {
  clearConsole();
  console.log("Laboratorios de Metodos Computacionales");

  let continueRunning = true;
  while (continueRunning) {
    clearConsole();
    console.log("Laboratorios de Metodos Computacionales");

    const labChoice = await askSelect<
      "lab1" | "lab2" | "lab3" | "lab4" | "lab5" | "lab6" | "lab7" | "exit"
    >(
      "Seleccione un laboratorio",
      [
        { title: "Laboratorio 1", value: "lab1" },
        { title: "Laboratorio 2", value: "lab2" },
        { title: "Laboratorio 3", value: "lab3" },
        { title: "Laboratorio 4", value: "lab4" },
        { title: "Laboratorio 5", value: "lab5" },
        { title: "Laboratorio 6", value: "lab6" },
        { title: "Laboratorio 7", value: "lab7" },
        { title: "Salir", value: "exit" },
      ]
    );

    if (labChoice === "exit") {
      break;
    }

    const exercises =
      labChoice === "lab1"
        ? lab1Exercises
        : labChoice === "lab2"
          ? lab2Exercises
          : labChoice === "lab3"
            ? lab3Exercises
            : labChoice === "lab4"
              ? lab4Exercises
              : labChoice === "lab5"
                ? lab5Exercises
                : labChoice === "lab6"
                  ? lab6Exercises
                  : lab7Exercises;
    const selected = await chooseExercise(exercises);

    clearConsole();
    await selected.run();

    continueRunning = await askConfirm("Desea ejecutar otro ejercicio?");
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: ${message}`);
  process.exit(1);
});
