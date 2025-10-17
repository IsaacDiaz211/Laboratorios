export type Root = {
    root: number;
    error_a: number;
    iterations: number;
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
    let xr: number = 0;
    let xr_old: number = 0;
    let i: number = 0;
    let err_rel: number = 100;
    do {
        i++;
        let denom = f(xl) - f(xu);
        if (Math.abs(denom) < 1e-15) throw new Error("Denominador muy pequeño: posible división por cero.");
        xr_old = xr;
        xr = xu - (f(xu) * (xl - xu)) / (f(xl) - f(xu));
        if (Math.abs(f(xr)) < eps) {
            return {
                root: xr,
                error_a: Math.abs((xr - xr_old) / xr),
                iterations: i,
            }
        } else if (f(xl) * f(xr) < 0){
            xu = xr;
        } else {
            xl = xr;
        }
        err_rel = Math.abs((xr - xr_old) / xr);
    } while (err_rel > err && i < iter_max);
    return {
        root: xr,
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
    err: number
): Root {
    let i: number = 0;
    do {
        i++;
        a = f(a);
    } while (i <= iter_max && Math.abs(f(a)) > err);
    return {
        root: + a + b,
        error_a: Math.abs(f(a)),
        iterations: i,
    }
}

export { algo_iteration };

/**
 * Resuelve una ecuación no lineal usando el método de Newton-Raphson.
 * @param f Función no lineal
 * @param a Límite inferior del intervalo
 * @param b Límite superior del intervalo
 * @param xn Punto inicial
 * @param iter_max Número máximo de iteraciones
 * @param err Error relativo aceptado
 * @returns Raíz aproximada, error absoluto y número de iteraciones
 */
function algo_newton_raphson(
    f:(x: number) => number,
    b: number,
    iter_max: number, 
    err: number
): Root {
    /* // Validaciones iniciales
    if (f(a) * f(b) >= 0) {
        console.log("La función no cumple con la condición de cambio de signo en el intervalo [a, b]");
        throw new Error("La función debe cambiar de signo en el intervalo [a, b]");
    }
    if (a >= b) {
        throw new Error("a debe ser menor que b");
    }
    if (!isDerivativeNonZero(f, a, b)) {
        console.log("La función no es distinta de cero en el intervalo [a, b]");
        throw new Error("La función no es distinta de cero en el intervalo [a, b]");
    }
    if (!third_condition_Fourier(f, b)) {
        console.log("La función no cumple con la tercera condición de Fourier en el intervalo [a, b]");
        throw new Error("La función no cumple con la tercera condición de Fourier en el intervalo [a, b]");
    }*/

    const eps = 1e-12;
    let xn: number = b;
    let xr: number = 0;
    let i: number = 0;
    let err_rel: number = 100;
    do{
        xr = xn - (f(xn) / derivative(f, xn));
        if (Math.abs(f(xr)) < eps) {
            return {
                root: xr,
                error_a: Math.abs((xr - xn) / xr),
                iterations: i,
            }
        }
        if(!third_condition_Fourier(f, xr)) {
            console.log("La función no cumple con la tercera condición de Fourier en el intervalo [a, b]");
            throw new Error("La función no cumple con la tercera condición de Fourier en el intervalo [a, b]");
        }
        err_rel = Math.abs((xr - xn) / xr);
        xn = xr;
        i++;
    } while(i <= iter_max && err_rel > err)

    return {
        root: xr,
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
    let xr: number = 0;
    let xr_old: number = 0;
    let i: number = 0;
    let err_rel: number = 100;
    do {
        i++;
        xr_old = xr;
        xr = (xl + xu) / 2;
        if (Math.abs(f(xr)) < eps) {
            return {
                root: xr,
                error_a: 0,
                iterations: i,
            }
        } else if (f(xl) * f(xr) < 0){
            err_rel = Math.abs((xr - xr_old) / xr);
            xu = xr;
        } else {
            xl = xr;
        }
    } while (i <= iter_max && err_rel > err);
    
    return {
        root: xr,
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

/**
 * Crea una función a partir de una cadena de texto.
 * @param funcString Cadena de texto que representa la función
 * @returns Función que se puede evaluar en un punto dado
 */
const createFunctionFromString = (funcString: string): ((x: number) => number) => {
    return (x: number): number => {
      try {
        // Reemplazar ^ con ** para potencias
        const expression = funcString.replace(/\^/g, '**');
        
        // Crear función segura
        const func = new Function('x', `return ${expression}`);
        const result = func(x);
        
        // Validar resultado
        if (typeof result === 'number' && isFinite(result)) {
          return result;
        }
        console.log("Resultado no válido:", result);
        throw new Error('Resultado no válido');
      } catch (error) {
        console.error('Error evaluando función:', error);
        return NaN;
      }
    };
  };

  export { createFunctionFromString };