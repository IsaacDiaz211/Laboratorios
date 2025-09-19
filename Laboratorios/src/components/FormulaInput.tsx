import React, { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";

type Props = {
  value: string;
  onChange: (latex: string) => void;
};

const FormulaInput: React.FC<Props> = ({ value, onChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mfRef = useRef<MathfieldElement | null>(null);

  // Se monta una sola vez
  useEffect(() => {
    if (containerRef.current && !mfRef.current) {
      const mf = new MathfieldElement();
      mf.value = value;
      mf.addEventListener("input", () => {
        onChange(mf.value);
      });
      containerRef.current.appendChild(mf);
      mfRef.current = mf;
    }
  }, []);

  // Cuando cambian las props `value`
  useEffect(() => {
    if (mfRef.current && mfRef.current.value !== value) {
      mfRef.current.value = value;
    }
  }, [value]);

  return <div ref={containerRef}></div>;
};

export default FormulaInput;