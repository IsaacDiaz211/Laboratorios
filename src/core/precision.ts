export function toFloat32(value: number): number {
  return new Float32Array([value])[0];
}

export function sumRepeatedFloat32(value: number, times: number): number {
  const v = toFloat32(value);
  let acc = toFloat32(0);
  for (let i = 0; i < times; i += 1) {
    acc = toFloat32(acc + v);
  }
  return acc;
}

export function sumRepeatedDouble(value: number, times: number): number {
  let acc = 0;
  for (let i = 0; i < times; i += 1) {
    acc += value;
  }
  return acc;
}
