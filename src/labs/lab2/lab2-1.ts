import { printExecutionTime } from "../../core/output";
import { timeExecution } from "../../core/timer";

function roundToDecimals(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function countCorrectDecimals(absError: number): number {
  if (absError === 0) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.max(0, Math.floor(-Math.log10(absError) - Math.log10(2)));
}

function countCorrectSignificantDigits(relError: number): number {
  if (relError === 0) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.max(0, Math.floor(-Math.log10(relError) - Math.log10(2)));
}

export async function runLab2Exercise1(): Promise<void> {
  console.log("Laboratorio 2 - Ejercicio 1");

  const { result, ms } = await timeExecution(() => {
    const piRounded = roundToDecimals(Math.PI, 6);
    const eRounded = roundToDecimals(Math.E, 6);
    const quotientApprox = piRounded / eRounded;
    const quotientTrue = Math.PI / Math.E;

    const absError = Math.abs(quotientTrue - quotientApprox);
    const relError = absError / Math.abs(quotientTrue);
    const decimalsCorrect = countCorrectDecimals(absError);
    const digitsCorrect = countCorrectSignificantDigits(relError);

    return {
      piRounded,
      eRounded,
      quotientApprox,
      quotientTrue,
      absError,
      relError,
      decimalsCorrect,
      digitsCorrect,
    };
  });

  console.log(`pi redondeado: ${result.piRounded}`);
  console.log(`e redondeado: ${result.eRounded}`);
  console.log(`cociente aproximado: ${result.quotientApprox}`);
  console.log(`cociente real: ${result.quotientTrue}`);
  console.log(`error absoluto: ${result.absError}`);
  console.log(`error relativo: ${result.relError}`);

  const decimalsText = Number.isFinite(result.decimalsCorrect)
    ? String(result.decimalsCorrect)
    : "ilimitados";
  const digitsText = Number.isFinite(result.digitsCorrect)
    ? String(result.digitsCorrect)
    : "ilimitados";

  console.log(`decimales correctos: ${decimalsText}`);
  console.log(`digitos significativos correctos: ${digitsText}`);
  printExecutionTime(ms);
}
