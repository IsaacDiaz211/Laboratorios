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
import { runLab4Exercise1 } from "./labs/lab4/lab4-1";
import { runLab4Exercise2 } from "./labs/lab4/lab4-2";
import { runLab4Exercise3 } from "./labs/lab4/lab4-3";
import { runLab4Exercise4 } from "./labs/lab4/lab4-4";
import { runLab4Exercise5 } from "./labs/lab4/lab4-5";
import { runLab4Exercise6 } from "./labs/lab4/lab4-6";

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

const lab4Exercises: Exercise[] = [
  { title: "1) Eliminacion de Gauss", run: runLab4Exercise1 },
  { title: "2) Gauss-Jordan", run: runLab4Exercise2 },
  { title: "3) Descomposicion LU", run: runLab4Exercise3 },
  { title: "4) Gauss-Seidel", run: runLab4Exercise4 },
  { title: "5) Fadeev-Leverrier", run: runLab4Exercise5 },
  { title: "6) Metodo de las potencias", run: runLab4Exercise6 },
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

    const labChoice = await askSelect<"lab1" | "lab2" | "lab4" | "exit">(
      "Seleccione un laboratorio",
      [
        { title: "Laboratorio 1", value: "lab1" },
        { title: "Laboratorio 2", value: "lab2" },
        { title: "Laboratorio 4", value: "lab4" },
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
          : lab4Exercises;
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
