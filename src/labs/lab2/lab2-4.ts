import { askNumber } from "../../core/input";
import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

type RelativeErrorResult = {
  relative1: number;
  relative2: number;
  larger: "primero" | "segundo" | "igual";
};

function computeRelativeErrors(
  nMeters: number,
  mMillimeters: number,
  xKilometers: number,
  yMeters: number
): RelativeErrorResult {
  const error1Meters = mMillimeters / 1000;
  const relative1 = error1Meters / nMeters;

  const measure2Meters = xKilometers * 1000;
  const relative2 = yMeters / measure2Meters;

  let larger: RelativeErrorResult["larger"] = "igual";
  if (relative1 > relative2) {
    larger = "primero";
  } else if (relative2 > relative1) {
    larger = "segundo";
  }

  return { relative1, relative2, larger };
}

export async function runLab2Exercise4(): Promise<void> {
  console.log("Laboratorio 2 - Ejercicio 4");

  let nMeters = await askNumber("Ingrese N (metros)", { float: true, min: 0 });
  while (nMeters === 0) {
    console.log("N debe ser mayor que 0.");
    nMeters = await askNumber("Ingrese N (metros)", {
      float: true,
      min: 0,
    });
  }

  const mMillimeters = await askNumber("Ingrese M (milimetros)", {
    float: true,
    min: 0,
  });

  let xKilometers = await askNumber("Ingrese X (kilometros)", {
    float: true,
    min: 0,
  });
  while (xKilometers === 0) {
    console.log("X debe ser mayor que 0.");
    xKilometers = await askNumber("Ingrese X (kilometros)", {
      float: true,
      min: 0,
    });
  }

  const yMeters = await askNumber("Ingrese Y (metros)", { float: true, min: 0 });

  const { result, ms } = await timeExecution(() =>
    computeRelativeErrors(nMeters, mMillimeters, xKilometers, yMeters)
  );

  console.log(`Error relativo 1: ${result.relative1}`);
  console.log(`Error relativo 2: ${result.relative2}`);

  if (result.larger === "primero") {
    console.log("El error relativo mayor es el de N metros.");
  } else if (result.larger === "segundo") {
    console.log("El error relativo mayor es el de X km.");
  } else {
    console.log("Los errores relativos son iguales.");
  }

  printExecutionTime(ms);
}
