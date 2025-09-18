type Root = {
    root: number;
    error_abs: number;
    iterations: number;
}
function algo_linear_interpolation(f: (x: number) => number, xl: number, xu: number, error: number):Root{
    // Validaciones iniciales
    if (f(xl) * f(xu) >= 0) {
        throw new Error("La función debe cambiar de signo en el intervalo [xl, xu]");
    }
    if (xl >= xu) {
        throw new Error("xl debe ser menor que xu");
    }

    let xr: number;
    let i: number = 0;
    do {
        i++;
        xr = xu - (f(xu) * (xl - xu)) / (f(xl) - f(xu));
        if (f(xr) === 0) {
            return {
                root: xr,
                error_abs: 0,
                iterations: i,
            }
        } else if (f(xl) * f(xr) < 0){
            xu = xr;
        } else {
            xl = xr;
        }
    } while (Math.abs(f(xr)) > error);
    return {
        root: xr,
        error_abs: Math.abs(f(xr)),
        iterations: i,
    }
}

export { algo_linear_interpolation };

function algo_iteration(x: number): number {
    return x ** 2 - 2;
}

export { algo_iteration };

function algo_newton_raphson(f:(x: number) => number, a: number, b: number, xn: number, iter_max: number, err_min: number): Root {
    // Validaciones iniciales
    if (f(a) * f(b) >= 0) {
        throw new Error("La función debe cambiar de signo en el intervalo [a, b]");
    }
    if (a >= b) {
        throw new Error("a debe ser menor que b");
    }
    if (!isDerivativeNonZero(f, a, b)) {
        throw new Error("La función no es distinta de cero en el intervalo [xl, xu]");
    }
    if (!third_condition_Fourier(f, a, b)) {
        throw new Error("La función no cumple con la tercera condición de Fourier en el intervalo [xl, xu]");
    }
    let xr: number;
    let i: number = 0;
    do{
        i++;
        xr = xn - (f(xn) / derivative(f, xn));
        if(xr === 0){
            return {
                root: xr,
                error_abs: 0,
                iterations: i,
            }
        }
        xn = xr;
    } while(i <= iter_max && Math.abs(f(xr)) > err_min)

    return {
        root: xr,
        error_abs: Math.abs(f(xr)),
        iterations: i,
    }
}

export { algo_newton_raphson };

function algo_bisection(f:(x: number) => number, xl: number, xu: number, iter_max: number, err_min: number): Root {
    // Validaciones iniciales
    if (f(xl) * f(xu) >= 0) {
        throw new Error("La función debe cambiar de signo en el intervalo [xl, xu]");
    }
    if (xl >= xu) {
        throw new Error("xl debe ser menor que xu");
    }
    let xr: number;
    let i: number = 1;
    do {
        i++;
        xr = (xl + xu) / 2;
        if (f(xr) === 0) {
            return {
                root: xr,
                error_abs: 0,
                iterations: i,
            }
        } else if (f(xl) * f(xr) < 0){
            xu = xr;
        } else {
            xl = xr;
        }
    } while (i <= iter_max && Math.abs(f(xr)) > err_min);
    
    return {
        root: xr,
        error_abs: Math.abs(f(xr)),
        iterations: i,
    }
}
export { algo_bisection };

// Derivada por diferencia central
function derivative(f: (x: number) => number, x: number): number {
    const h: number = 1e-5;
    return (f(x + h) - f(x - h)) / (2 * h);
}

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

function third_condition_Fourier(f: (x: number) => number, a: number, b: number): boolean {
    for(let i = a; i < b; i += 0.01) {
        if(f(i) * derivative(f, i) < 0) {
            return true;
        }
    }
    return true;
}
