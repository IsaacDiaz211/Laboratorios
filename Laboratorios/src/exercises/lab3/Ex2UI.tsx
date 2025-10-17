import {
    Alert,
    Button,
    Radio, 
    InputNumber, 
    Input, 
    Typography
} from "antd";
import { useState } from "react";
import RepoDir from "../../components/RepoDir";
import { 
    algo_bisection,
    algo_newton_raphson,
    algo_iteration,
    algo_linear_interpolation,
    Root,
    createFunctionFromString
} from "./algos_FindRoots";
import { normalizeError } from "../../utils/helpers";

type Props = {
  method: string;
  setMethod: (m: string) => void;
  setExpression: (n: string) => void;
};

function Ex2UI({ method, setMethod, setExpression }: Props) {
  const [f, setF] = useState<string>("x");
  const [iterr, setIterr] = useState<number>(10);
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(1);
  const [err, setErr] = useState<number>(0.0001);
  const [errorB, setErrorB] = useState<string | null>(null);
  const [result, setResult] = useState<Root | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  function handleFChange(value: string | null){
    const expresion = value ?? "x";
    setF(expresion);
    setExpression(expresion);
    setResult(null);
    setExecTime(null);
    setErrMsg(null);
  }

  function handleIterrChange(value: number | null){
    setIterr(value ?? 0);
    setResult(null);
    setExecTime(null);
    setErrMsg(null);
  }

  function handleErrChange(value: number | null){
    setErr(value ?? 0);
    setResult(null);
    setExecTime(null);
    setErrMsg(null);
  }

  function handleAChange(value: number | null){
    setA(value ?? 0);
    if (value !== null && b !== null && b <= value) {
      setErrorB("b debe ser mayor que a");
    } else {
      setErrorB("");
    }
    setResult(null);
    setExecTime(null);
    setErrMsg(null);
  };

  function handleBChange(value: number | null){
    setB(value ?? 0);
    if (value !== null && a !== null && value <= a) {
      setErrorB("b debe ser mayor que a");
    } else {
      setErrorB("");
    }
    setResult(null);
    setExecTime(null);
    setErrMsg(null);
  };


  function handleCalculate(){
    setResult(null);
    setExecTime(null);
    setErrMsg(null);
    let start: number = 0;
    let end: number = 0;
    let roots: Root | null = null;
    
    // Convertir string a función
    let func: (x: number) => number;
    try {
      func = createFunctionFromString(f);
    } catch (e) {
      setErrMsg("No pude interpretar f(x). Revísala. Detalle: " + normalizeError(e));
      return;
    }
    try {
      switch(method){
        case "biseccion":
            start = performance.now();
            roots = algo_bisection(func, a, b, iterr, err);
            end = performance.now();
            setResult(roots);
            setExecTime(end - start);
            break;
        case "regula":
            start = performance.now();
            roots = algo_linear_interpolation(func, a, b, iterr, err);
            end = performance.now();
            setResult(roots);
            setExecTime(end - start);
            break;
        case "newton":
            start = performance.now();
            roots = algo_newton_raphson(func, b, iterr, err);
            end = performance.now();
            setResult(roots);
            setExecTime(end - start);
            break;
        case "iteracion":
            start = performance.now();
            roots = algo_iteration(func, a, b, iterr, err);
            end = performance.now();
            setResult(roots);
            setExecTime(end - start);
            break;
        default:
          throw new Error("Método no soportado");
        }
    } catch (e) {
      setErrMsg(normalizeError(e));
      return;
    }
  }

  return(
    <div
      style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}
    >
      <div>
        <Typography.Title level={5}>Función f(x): </Typography.Title>
        <Input value={f} onChange={(e) => handleFChange(e.target.value)} />
      </div>
      <div>
        <Typography.Title level={5}>Cantidad máxima de iteraciones: </Typography.Title>
        <InputNumber min={10} max={500} defaultValue={10} value={iterr} onChange={handleIterrChange} />
      </div>
      <div>
        <Typography.Title level={5}>Error tolerado: </Typography.Title>
        <InputNumber min={0} step={0.0001} onChange={handleErrChange} />
      </div>
      <div>
        <Typography.Title level={5}>Intervalo [a, b]: </Typography.Title>
        <InputNumber 
          placeholder="a" 
          value={a}
          onChange={handleAChange}
        /> - 
        <InputNumber 
          placeholder="b" 
          value={b}
          onChange={handleBChange}
          status={errorB ? "error" : ""}
          disabled={a === null}
          min={a !== null ? a + 0.0001 : undefined}
        />
        {errorB && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errorB}</div>}
      </div>
      

      <Radio.Group
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{ marginTop: 16 }}
      >
        <Radio.Button value="biseccion">Bisección</Radio.Button>
        <Radio.Button value="regula">Regula Falsi</Radio.Button>
        <Radio.Button value="newton">Newton-Raphson</Radio.Button>
        <Radio.Button value="iteracion" disabled = {true}>Iteración</Radio.Button>
      </Radio.Group>
      <br/>
      <Button type="primary" onClick={handleCalculate}>
        Hallar raíces
      </Button> 
      {errMsg && (
        <div style={{ marginTop: 12 }}>
          <Alert
            message="Error al calcular"
            description={errMsg}
            type="error"
            showIcon
          />
        </div>
      )}
      {result !== null && (
          <div style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 10 }}>
                <Typography.Text>Raíz: {result.root}, Iter: {result.iterations}, Error relativo: {result.error_a}</Typography.Text>
                <br/>
                <Typography.Text type="secondary">
                  Tiempo de ejecución: {execTime?.toFixed(9)} ms
              </Typography.Text>
              </div>        
          </div>
        )}

      <RepoDir url="https://github.com/IsaacDiaz211/Laboratorios/blob/master/Laboratorios/src/exercises/lab3/algos_FindRoots.ts" />
    </div>
  );
};

export default Ex2UI;