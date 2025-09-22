import React from "react";
import Plot from "react-plotly.js";
import { Typography } from "antd";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { createFunctionFromString } from "../utils/algos_FindRoots";

type GraphProps = {
  xRange: [number, number];
  yRange?: [number, number];
  functionString: string;
  expresion: string;
  step?: number;
};

const FunctionPlot: React.FC<GraphProps> = ({
  xRange,
  yRange,
  functionString,
  expresion,
  step = 0.1,
}) => {
  const xValues: number[] = [];
  const yValues: number[] = [];
  const func = createFunctionFromString(functionString);
  
  for (let x = xRange[0]; x <= xRange[1]; x += step) {
    try {
      //evaluamos la expresión con "x" en scope
      const y = func(x);
      if (typeof y === "number" && isFinite(y)) {
        xValues.push(x);
        yValues.push(y);
      }
    } catch (err) {
      console.error("Error evaluando la función:", err);
    }
  }

  return (
    <div>
      <Typography.Title level={5}>
        Gráfico de y ={" "}
        <InlineMath math={expresion} />
      </Typography.Title>
        <Plot
        data={[
            {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines",
            line: { color: "blue" },
            },
        ]}
        layout={{
            xaxis: { title: { text: "x" }, range: xRange },
            yaxis: { title: { text: "y" }, range: yRange },
            autosize: true,
        }}
        style={{ width: 600, height:500, marginTop: 16 }}
        />
    </div>
  );
};

export default FunctionPlot;