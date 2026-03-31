/**
 * Convierte un numero de precision doble a precision simple Float32.
 * @param value Valor original en precision doble.
 * @returns Valor convertido a Float32.
 */
export function toFloat32(value: number): number {
  return new Float32Array([value])[0];
}

/**
 * Suma repetidamente un valor usando precision simple Float32.
 * @param value Valor a sumar en cada iteracion.
 * @param times Cantidad de sumas a realizar.
 * @returns Resultado acumulado en precision simple.
 */
export function sumRepeatedFloat32(value: number, times: number): number {
  const v = toFloat32(value);
  let acc = toFloat32(0);
  for (let i = 0; i < times; i += 1) {
    acc = toFloat32(acc + v);
  }
  return acc;
}

/**
 * Suma repetidamente un valor usando precision doble de JavaScript.
 * @param value Valor a sumar en cada iteracion.
 * @param times Cantidad de sumas a realizar.
 * @returns Resultado acumulado en precision doble.
 */
export function sumRepeatedDouble(value: number, times: number): number {
  let acc = 0;
  for (let i = 0; i < times; i += 1) {
    acc += value;
  }
  return acc;
}

/**
 * Redondea un valor a un numero fijo de cifras significativas.
 * @param value Valor numerico a redondear.
 * @param significantDigits Cantidad de cifras significativas; si es undefined no aplica redondeo.
 * @returns Valor redondeado o el mismo valor original si no se pidio redondeo.
 */
export function applySignificantDigits(
  value: number,
  significantDigits?: number
): number {
  if (significantDigits === undefined) {
    return value;
  }

  if (!Number.isInteger(significantDigits) || significantDigits <= 0) {
    throw new Error("Las cifras significativas deben ser un entero positivo.");
  }

  if (value === 0 || !Number.isFinite(value)) {
    return value;
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const factor = 10 ** (significantDigits - exponent - 1);
  return Math.round(value * factor) / factor;
}
