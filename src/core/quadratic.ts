export type QuadraticSolution =
  | {
      type: "real";
      discriminant: number;
      roots: [number, number];
    }
  | {
      type: "double";
      discriminant: number;
      root: number;
    }
  | {
      type: "complex";
      discriminant: number;
      real: number;
      imag: number;
    };

export function solveQuadratic(
  a: number,
  b: number,
  c: number
): QuadraticSolution {
  const discriminant = b * b - 4 * a * c;
  const twoA = 2 * a;

  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    const x1 = (-b + sqrtD) / twoA;
    const x2 = (-b - sqrtD) / twoA;
    return { type: "real", discriminant, roots: [x1, x2] };
  }

  if (discriminant === 0) {
    const root = -b / twoA;
    return { type: "double", discriminant, root };
  }

  const real = -b / twoA;
  const imag = Math.sqrt(-discriminant) / twoA;
  return { type: "complex", discriminant, real, imag };
}
