import { createSingleVariableExpression } from "../core/expression";

export type Root = {
    root: number;
    error_a: number;
    iterations: number;
}

function relativeError(current: number, previous: number): number {
    if (current === 0) {
        return Math.abs(current - previous);
    }
    return Math.abs((current - previous) / current);
}

function logIterationWithBounds(
    method: string,
    iteration: number,
    approx: number,
    errorRel: number,
    xLower: number,
    xUpper: number
): void {
    console.log(
        `[${method}] iter=${iteration} aprox=${approx} error_rel=${errorRel} x_lower=${xLower} x_upper=${xUpper}`
    );
}

function logIterationNoBounds(
    method: string,
    iteration: number,
    approx: number,
    errorRel: number
): void {
    console.log(
        `[${method}] iter=${iteration} aprox=${approx} error_rel=${errorRel}`
    );
}

/**
 * Resuelve una ecuación no lineal usando el método de interpolación lineal.
 * @param f Función no lineal
 * @param xl Límite inferior del intervalo
 * @param xu Límite superior del intervalo
 * @param iter_max Número máximo de iteraciones
 * @param err Error relativo aceptado
 * @returns Raíz aproximada, error absoluto y número de iteraciones
 */
function algo_linear_interpolation(
    f: (x: number) => number, 
    xl: number, 
    xu: number,
    iter_max: number,
    err: number
):Root{
    // Validaciones iniciales
    if (f(xl) * f(xu) >= 0) {
        console.log("La función no cumple con la condición de cambio de signo en el intervalo [xl, xu]");
        throw new Error("La función debe cambiar de signo en el intervalo [xl, xu]");
    }
    if (xl >= xu) {
        console.log("xl debe ser menor que xu");
        throw new Error("xl debe ser menor que xu");
    }
    const eps = 1e-12;
    let xCurr: number = xl;
    let xrOld: number = xCurr;
    let i: number = 0;
    let err_rel: number = Number.POSITIVE_INFINITY;
    do {
        i++;
        const fxl = f(xl);
        const fxu = f(xu);
        const denom = fxl - fxu;
        if (Math.abs(denom) < 1e-15) throw new Error("Denominador muy pequeño: posible división por cero.");
        xrOld = xCurr;
        xCurr = xu - (fxu * (xl - xu)) / denom;
        err_rel = i === 1 ? Number.POSITIVE_INFINITY : relativeError(xCurr, xrOld);
        logIterationWithBounds("RegulaFalsi", i, xCurr, err_rel, xl, xu);

        const fxr = f(xCurr);
        if (Math.abs(fxr) < eps) {
            return {
                root: xCurr,
                error_a: err_rel,
                iterations: i,
            }
        } else if (fxl * fxr < 0){
            xu = xCurr;
        } else {
            xl = xCurr;
        }
    } while (err_rel > err && i < iter_max);
    return {
        root: xCurr,
        error_a: err_rel,
        iterations: i,
    }
}

export { algo_linear_interpolation };

// Método de iteración a realizar, función incompleta.
function algo_iteration(
    f:(x: number) => number,
    a: number, 
    b: number,
    iter_max: number, 
    err: number,
    x0?: number,
): Root {
    if (iter_max <= 0) {
        throw new Error("iter_max debe ser mayor que 0");
    }
    if (err <= 0) {
        throw new Error("err debe ser mayor que 0");
    }

    let i = 0;
    let xPrev = x0 ?? (a + b) / 2;
    let xCurr = xPrev;
    let err_rel = Number.POSITIVE_INFINITY;

    while (i < iter_max && err_rel > err) {
        i++;
        xCurr = f(xPrev);

        if (!Number.isFinite(xCurr)) {
            throw new Error("La función de iteración diverge o no es válida.");
        }

        err_rel = i === 1 ? Number.POSITIVE_INFINITY : relativeError(xCurr, xPrev);
        logIterationWithBounds("Iteracion", i, xCurr, err_rel, a, b);
        xPrev = xCurr;
    }

    return {
        root: xCurr,
        error_a: err_rel,
        iterations: i,
    };
}

export { algo_iteration };

/**
 * Resuelve una ecuación no lineal usando iteración de punto fijo
 * con aceleración de Aitken.
 * @param f Función de iteración g(x)
 * @param a Límite inferior del intervalo (solo para semilla inicial)
 * @param b Límite superior del intervalo (solo para semilla inicial)
 * @param iter_max Número máximo de iteraciones
 * @param err Error relativo aceptado
 * @returns Raíz aproximada, error relativo y número de iteraciones
 */
function algo_iteration_aitken(
    f:(x: number) => number,
    a: number,
    b: number,
    iter_max: number,
    err: number,
    x0?: number,
): Root {
    if (iter_max <= 0) {
        throw new Error("iter_max debe ser mayor que 0");
    }
    if (err <= 0) {
        throw new Error("err debe ser mayor que 0");
    }

    let i = 0;
    let x = x0 ?? (a + b) / 2;
    let error_a = Number.POSITIVE_INFINITY;

    while (i < iter_max && error_a > err) {
        const x1 = f(x);
        const x2 = f(x1);

        if (!Number.isFinite(x1) || !Number.isFinite(x2)) {
            throw new Error("La función de iteración diverge o no es válida.");
        }

        const denom = x2 - 2 * x1 + x;
        let xNext = x1;

        if (Math.abs(denom) > 1e-14) {
            xNext = x - ((x1 - x) * (x1 - x)) / denom;
        }

        if (!Number.isFinite(xNext)) {
            throw new Error("La aceleración de Aitken produjo un valor no válido.");
        }

        error_a = i === 0 ? Number.POSITIVE_INFINITY : relativeError(xNext, x);
        logIterationWithBounds("IteracionAitken", i + 1, xNext, error_a, a, b);
        x = xNext;
        i++;
    }

    return {
        root: x,
        error_a,
        iterations: i,
    };
}

export { algo_iteration_aitken };

/**
 * Resuelve una ecuación no lineal usando el método de Newton-Raphson.
 * @param f Función no lineal
 * @param x0 Punto inicial de iteración
 * @param iter_max Número máximo de iteraciones
 * @param err Error relativo aceptado
 * @param onIteration Callback opcional que recibe información numérica de cada iteración
 * @returns Raíz aproximada, error relativo y número de iteraciones
 */
function algo_newton_raphson(
    f:(x: number) => number,
    x0: number,
    iter_max: number,
    err: number,
    onIteration?: (info: NewtonIterationInfo) => void
): Root {
    const eps = 1e-12;
    let xCurr: number = x0;
    let i: number = 0;
    let err_rel: number = Number.POSITIVE_INFINITY;

    while (i < iter_max && err_rel > err) {
        i++;
        const der = derivative(f, xCurr);
        if (Math.abs(der) < eps) {
            throw new Error("Derivada cercana a cero, no se puede continuar Newton-Raphson.");
        }

        const xPrev = xCurr;
        const xNext = xCurr - (f(xCurr) / der);
        err_rel = i === 1 ? Number.POSITIVE_INFINITY : relativeError(xNext, xCurr);
        logIterationNoBounds("NewtonRaphson", i, xNext, err_rel);

        const y = f(xNext);
        const derAtNext = derivative(f, xNext);
        const secondAtNext = secondDerivative(f, xNext);
        const fourierProduct = y * secondAtNext;

        if (onIteration) {
            onIteration({
                iteration: i,
                approx: xNext,
                previousApprox: xPrev,
                errorRel: err_rel,
                y,
                derivative: derAtNext,
                secondDerivative: secondAtNext,
                fourierProduct,
            });
        }

        if (Math.abs(y) < eps) {
            return {
                root: xNext,
                error_a: err_rel,
                iterations: i,
            }
        }
        if(!third_condition_Fourier(f, xNext)) {
            throw new Error("La función no cumple con la tercera condición de Fourier.");
        }

        xCurr = xNext;
    }

    return {
        root: xCurr,
        error_a: err_rel,
        iterations: i,
    }
}

export { algo_newton_raphson };


/**
 * Resuelve una ecuación no lineal usando el método de bisección.
 * @param f Función no lineal
 * @param xl Límite inferior del intervalo
 * @param xu Límite superior del intervalo
 * @param iter_max Número máximo de iteraciones
 * @param err Error relativo aceptado
 * @returns Raíz aproximada, error absoluto y número de iteraciones
 */
function algo_bisection(
    f:(x: number) => number, 
    xl: number, 
    xu: number, 
    iter_max: number, 
    err: number
): Root {
    // Validaciones iniciales
    let fl = f(xl);
    let fu = f(xu);
    if (fl * fu >= 0) {
        console.log("La función no cumple con la condición de cambio de signo en el intervalo [xl, xu]");
        throw new Error("La función debe cambiar de signo en el intervalo [xl, xu]");
    }
    if (xl >= xu) {
        console.log("xl debe ser menor que xu");
        throw new Error("xl debe ser menor que xu");
    }
    if (Math.abs(fl) <= err) {
        return { root: xl, error_a: Math.abs(fl), iterations: 0 };
    }
    if (Math.abs(fu) <= err) {
        return { root: xu, error_a: Math.abs(fu), iterations: 0 };
    }

    const eps = 1e-12;
    let xCurr: number = xl;
    let xrOld: number = xCurr;
    let i: number = 0;
    let err_rel: number = Number.POSITIVE_INFINITY;
    do {
        i++;
        xrOld = xCurr;
        xCurr = (xl + xu) / 2;
        err_rel = i === 1 ? Number.POSITIVE_INFINITY : relativeError(xCurr, xrOld);
        logIterationWithBounds("Biseccion", i, xCurr, err_rel, xl, xu);

        if (Math.abs(f(xCurr)) < eps) {
            return {
                root: xCurr,
                error_a: err_rel,
                iterations: i,
            }
        } else if (f(xl) * f(xCurr) < 0){
            xu = xCurr;
        } else {
            xl = xCurr;
        }
    } while (i < iter_max && err_rel > err);
    
    return {
        root: xCurr,
        error_a: err_rel,
        iterations: i,
    }
}
export { algo_bisection };

/**
 * Calcula la derivada de una función en un punto dado usando diferencias finitas.
 * @param f Función para la cual se calculará la derivada
 * @param x Punto en el cual se evaluará la derivada
 * @returns Valor de la derivada en el punto x
 */
function derivative(f: (x: number) => number, x: number): number {
    try{
        const h: number = 1e-5;
        return (f(x + h) - f(x - h)) / (2 * h);
    } catch (error) {
        console.log("Error al calcular la derivada:", error);
        throw error;
    }
}

/**
 * Calcula la segunda derivada de una función en un punto dado usando diferencias finitas.
 * @param f Función para la cual se calculará la segunda derivada
 * @param x Punto en el cual se evaluará la segunda derivada
 * @returns Valor de la segunda derivada en el punto x
 */
function secondDerivative(f: (x: number) => number, x: number): number {
    try{
        const h = 1e-4; // un poco mayor que en la 1ª derivada para estabilidad
        return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
    } catch (error) {
        console.log("Error al calcular la segunda derivada:", error);
        throw error;
    }
}

/**
 * Verifica si la derivada de una función es distinta de cero en un intervalo dado.
 * @param f Función para la cual se verificará la derivada
 * @param a Límite inferior del intervalo
 * @param b Límite superior del intervalo
 * @returns Verdadero si la derivada es distinta de cero en el intervalo, falso en caso contrario
 */
function isDerivativeNonZero(
    f: (x: number) => number,
    a: number,
    b: number,
): boolean {
    for (let i = a; i < b; i+= 0.01) {
        let deriv = derivative(f, i);
        // Verificar si la derivada es cercana a cero
        if (Math.abs(deriv) < 1e-10) {
            return false;
        }
    }
    return true;
}

export { isDerivativeNonZero };

/**
 * Verifica si la tercera condición de Fourier se cumple para una función en un intervalo dado.
 * @param f Función para la cual se verificará la tercera condición de Fourier
 * @param a Límite inferior del intervalo
 * @param b Límite superior del intervalo
 * @returns Verdadero si la tercera condición de Fourier se cumple, falso en caso contrario
 */
function third_condition_Fourier(f: (x: number) => number, x: number): boolean {
    if(f(x) * secondDerivative(f, x) > 0) {
        return true;
    }
    return false;
}

export type FourierConditionId = "I" | "II" | "III";

export type FourierConditionResult = {
    id: FourierConditionId;
    description: string;
    satisfied: boolean;
    details: string;
};

export type FourierEvaluation = {
    ok: boolean;
    results: FourierConditionResult[];
};

export type NewtonIterationInfo = {
    iteration: number;
    approx: number;
    previousApprox: number;
    errorRel: number;
    y: number;
    derivative: number;
    secondDerivative: number;
    fourierProduct: number;
};

/**
 * Evalua las tres condiciones de Fourier sobre un intervalo [a, b].
 *
 * I)   f(a)·f(b) < 0  (la raiz esta encerrada)
 * II)  f'(x) != 0 para todo x en (a, b)
 * III) f''(x) != 0 para todo x en (a, b)
 *
 * @param f Funcion no lineal
 * @param a Limite inferior del intervalo
 * @param b Limite superior del intervalo
 * @param samples Cantidad de puntos para muestrear f' y f'' dentro del intervalo
 * @returns Resultado con el detalle de cada condicion y si todas se cumplen
 */
function evaluateFourierConditions(
    f: (x: number) => number,
    a: number,
    b: number,
    samples = 200
): FourierEvaluation {
    if (b <= a) {
        throw new Error("b debe ser mayor que a para evaluar las condiciones de Fourier.");
    }
    if (samples < 2) {
        throw new Error("La cantidad de muestras debe ser al menos 2.");
    }
    const eps = 1e-12;

    const fa = f(a);
    const fb = f(b);
    const productEnds = fa * fb;
    const cond1Satisfied = productEnds < 0;
    const cond1: FourierConditionResult = {
        id: "I",
        description: "f(a)·f(b) < 0 (raiz encerrada en el intervalo)",
        satisfied: cond1Satisfied,
        details: `f(a)·f(b) = ${fa} · ${fb} = ${productEnds} (${cond1Satisfied ? "< 0" : "no < 0"})`,
    };

    let minAbsDeriv = Number.POSITIVE_INFINITY;
    let xAtMinDeriv = a;
    for (let i = 1; i < samples; i += 1) {
        const x = a + (i / samples) * (b - a);
        const d = derivative(f, x);
        if (Math.abs(d) < minAbsDeriv) {
            minAbsDeriv = Math.abs(d);
            xAtMinDeriv = x;
        }
    }
    const cond2Satisfied = minAbsDeriv > eps;
    const cond2: FourierConditionResult = {
        id: "II",
        description: "f'(x) != 0 para todo x en (a, b)",
        satisfied: cond2Satisfied,
        details: `min|f'(x)| ≈ ${minAbsDeriv} en x ≈ ${xAtMinDeriv} (${cond2Satisfied ? "> eps" : "<= eps"})`,
    };

    let minAbsSecond = Number.POSITIVE_INFINITY;
    let xAtMinSecond = a;
    for (let i = 1; i < samples; i += 1) {
        const x = a + (i / samples) * (b - a);
        const s = secondDerivative(f, x);
        if (Math.abs(s) < minAbsSecond) {
            minAbsSecond = Math.abs(s);
            xAtMinSecond = x;
        }
    }
    const cond3Satisfied = minAbsSecond > eps;
    const cond3: FourierConditionResult = {
        id: "III",
        description: "f''(x) != 0 para todo x en (a, b)",
        satisfied: cond3Satisfied,
        details: `min|f''(x)| ≈ ${minAbsSecond} en x ≈ ${xAtMinSecond} (${cond3Satisfied ? "> eps" : "<= eps"})`,
    };

    const results = [cond1, cond2, cond3];
    return {
        ok: results.every((r) => r.satisfied),
        results,
    };
}

export { evaluateFourierConditions };

/**
 * Crea una función a partir de una cadena de texto.
 * @param funcString Cadena de texto que representa la función
 * @returns Función que se puede evaluar en un punto dado
 */
const createFunctionFromString = (funcString: string): ((x: number) => number) => {
    return createSingleVariableExpression(funcString, "f(x)");
  };

  export { createFunctionFromString };

/** * Método de Tanteo para separar los intervalos donde la función 
 * cambia de signo y por ende tiene raíces.
 * @param funcString Cadena de texto que representa la función
 * @returns Lista de intervalos [a, b] donde la función cambia de signo
 */
  const guessIntervals = (
    funcString: string,
    domainStart = -100,
    domainEnd = 100,
    dx = 0.5,
  ): [number, number][] => {
    if (dx <= 0) {
      throw new Error("El incremento debe ser mayor que 0.");
    }
    if (domainEnd <= domainStart) {
      throw new Error("x_upper debe ser mayor que x_lower.");
    }

    const f = createFunctionFromString(funcString);
    const intervals: [number, number][] = [];
    let prevX = domainStart;
    let prevF = f(prevX);

    for (let x = domainStart + dx; x <= domainEnd; x += dx) {
      const currF = f(x);

      if (!Number.isFinite(prevF) || !Number.isFinite(currF)) {
        prevX = x;
        prevF = currF;
        continue;
      }

      if (prevF * currF <= 0) {
        intervals.push([prevX, x]);
      }
      prevX = x;
      prevF = currF;
    }

    return intervals;
  };

  export { guessIntervals };
