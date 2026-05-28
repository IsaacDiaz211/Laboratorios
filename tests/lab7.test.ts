import assert from "node:assert/strict";
import test from "node:test";
import { solveEuler, solveModifiedEuler } from "../src/algorithms/lab7/euler";
import { resolveGrid } from "../src/algorithms/lab7/ivp";
import {
  generateMilneSeedsWithRK4,
  solveMilnePredictorCorrector,
} from "../src/algorithms/lab7/milne";
import {
  solveRungeKuttaFourthOrder,
  solveRungeKuttaSecondOrder,
} from "../src/algorithms/lab7/runge-kutta";

function assertApproximately(actual: number, expected: number, tolerance = 1e-9): void {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Se esperaba ${expected} y se obtuvo ${actual}.`
  );
}

const problem = {
  f: (_x: number, y: number) => y,
  x0: 0,
  y0: 1,
  h: 0.1,
  steps: 4,
  exactSolution: (x: number) => Math.exp(x),
};

test("Lab 7: resuelve la grilla consistentemente con xEnd", () => {
  const grid = resolveGrid({ x0: 0, h: 0.1, xEnd: 0.4 });

  assert.equal(grid.steps, 4);
  assert.deepEqual(grid.xValues, [0, 0.1, 0.2, 0.30000000000000004, 0.4]);
});

test("Lab 7: Euler produce la aproximacion esperada para y' = y", () => {
  const result = solveEuler(problem);

  assertApproximately(result.finalValue, 1.4641, 1e-12);
});

test("Lab 7: Euler modificado y RK2 Heun coinciden en este problema", () => {
  const modifiedEuler = solveModifiedEuler(problem);
  const rk2Heun = solveRungeKuttaSecondOrder(problem, "heun");

  assertApproximately(modifiedEuler.finalValue, rk2Heun.finalValue, 1e-12);
});

test("Lab 7: RK4 clasico aproxima e^0.4 con buen error", () => {
  const result = solveRungeKuttaFourthOrder(problem);

  assert.ok(Math.abs(result.finalValue - Math.exp(0.4)) < 1e-5);
});

test("Lab 7: Milne genera semillas con RK4 y entrega advertencia informativa", () => {
  const seeds = generateMilneSeedsWithRK4(problem);
  const result = solveMilnePredictorCorrector(problem);

  assert.equal(seeds.length, 4);
  assert.ok(result.warnings.some((warning) => warning.includes("RK4")));
  assert.ok(Math.abs(result.finalValue - Math.exp(0.4)) < 1e-4);
});

test("Lab 7: Milne rechaza semillas manuales inconsistentes con la grilla", () => {
  assert.throws(
    () =>
      solveMilnePredictorCorrector(problem, [
        { x: 0, y: 1 },
        { x: 0.1, y: 1.1 },
        { x: 0.25, y: 1.2 },
        { x: 0.3, y: 1.3 },
      ]),
    /no son consistentes con x0 y h/
  );
});

test("Lab 7: RK2 punto medio supera a Euler en error final para y' = y", () => {
  const euler = solveEuler(problem);
  const rk2Midpoint = solveRungeKuttaSecondOrder(problem, "punto_medio");

  const eulerError = Math.abs(euler.finalValue - Math.exp(0.4));
  const rk2Error = Math.abs(rk2Midpoint.finalValue - Math.exp(0.4));
  assert.ok(rk2Error < eulerError);
});
