import { exp, parse } from "mathjs";

export type Root = {
    root: number;
    error_abs: number;
    iterations: number;
}

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
    } while (Math.abs(f(xr)) > err && i <= iter_max);
    return {
        root: xr,
        error_abs: Math.abs(f(xr)),
        iterations: i,
    }
}

export { algo_linear_interpolation };

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
        error_abs: Math.abs(f(a)),
        iterations: i,
    }
}

export { algo_iteration };

function algo_newton_raphson(
    f:(x: number) => number, 
    a: number, b: number, 
    xn: number, 
    iter_max: number, 
    err: number
): Root {
    // Validaciones iniciales
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
    if (!third_condition_Fourier(f, a, b)) {
        console.log("La función no cumple con la tercera condición de Fourier en el intervalo [a, b]");
        throw new Error("La función no cumple con la tercera condición de Fourier en el intervalo [a, b]");
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
    } while(i <= iter_max && Math.abs(f(xr)) > err)

    return {
        root: xr,
        error_abs: Math.abs(f(xr)),
        iterations: i,
    }
}

export { algo_newton_raphson };

function algo_bisection(
    f:(x: number) => number, 
    xl: number, 
    xu: number, 
    iter_max: number, 
    err: number
): Root {
    // Validaciones iniciales
    if (f(xl) * f(xu) >= 0) {
        console.log("La función no cumple con la condición de cambio de signo en el intervalo [xl, xu]");
        throw new Error("La función debe cambiar de signo en el intervalo [xl, xu]");
    }
    if (xl >= xu) {
        console.log("xl debe ser menor que xu");
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
    } while (i <= iter_max && Math.abs(f(xr)) > err);
    
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

  function latexToJS(latex: string): string {
    try {
      const node = parse(latex);
      return node.toString({ handler: jsHandler });
    } catch (error) {
      console.error('Error convirtiendo LaTeX a JS:', error);
      return "x";
    }
  }

  function jsHandler(node: any, options: any) {
    if (node.type === "SymbolNode") {
        if (node.name === "pi") return "Math.PI";
        if (node.name === "e") return "Math.E";
    }
    if (node.type === "OperatorNode" && node.op === "^") {
        // usar ** en vez de ^
        return `(${node.args[0].toString(options)}**${node.args[1].toString(
        options
        )})`;
    }
    return node.toString(options);
  }
  export {latexToJS};


