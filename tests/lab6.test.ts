import assert from "node:assert/strict";
import test from "node:test";
import {
  newtonGregoryBackwardDerivative,
  newtonGregoryForwardDerivative,
} from "../src/algorithms/lab6/differentiation";
import {
  integrateCompositeAuto,
  simpsonOneThirdComposite,
} from "../src/algorithms/lab6/integration";
import { buildFiniteDifferenceTable } from "../src/algorithms/lab6/tabulated";

function assertApproximately(actual: number, expected: number, tolerance = 1e-9): void {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Se esperaba ${expected} y se obtuvo ${actual}.`
  );
}

test("Lab 6: construye la tabla de diferencias finitas esperada", () => {
  const table = buildFiniteDifferenceTable([0, 1, 2], [0, 1, 4], "forward");

  assert.deepEqual(table.columns, [[0, 1, 4], [1, 3], [2]]);
});

test("Lab 6: Newton-Gregory ascendente aproxima la primera derivada de x^2", () => {
  const result = newtonGregoryForwardDerivative([0, 1, 2, 3], [0, 1, 4, 9], 0.5, 1);

  assertApproximately(result.value, 1);
});

test("Lab 6: Newton-Gregory descendente aproxima la segunda derivada de x^2", () => {
  const result = newtonGregoryBackwardDerivative([0, 1, 2, 3], [0, 1, 4, 9], 2.5, 2);

  assertApproximately(result.value, 2);
});

test("Lab 6: integracion combinada usa Simpson 1/3 y 3/8 sobre x^3", () => {
  const xValues = [0, 1, 2, 3, 4, 5];
  const yValues = xValues.map((x) => x ** 3);
  const result = integrateCompositeAuto(xValues, yValues);

  assertApproximately(result.value, 156.25);
  assert.equal(result.segments.length, 2);
  assert.deepEqual(
    result.segments.map((segment) => segment.method),
    ["simpson_13", "simpson_38"]
  );
});

test("Lab 6: Simpson 1/3 compuesta rechaza una cantidad impar de subintervalos", () => {
  assert.throws(
    () => simpsonOneThirdComposite([0, 1, 2, 3], [0, 1, 4, 9]),
    /cantidad par de subintervalos/
  );
});
