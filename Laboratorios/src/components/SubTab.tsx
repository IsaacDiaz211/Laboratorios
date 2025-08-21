import React from 'react';
import { Segmented } from 'antd';

type TabProps = {
  graph: boolean;
  value: string;
  onChange: (val: string) => void;
};

const SubTab: React.FC<TabProps> = ({graph, value, onChange}) => {

  const options = [
    {
      label: 'Interfaz',
      value: 'interfaz',
    },
    {
      label: 'Seudo',
      value: 'seudo',
    },
    {
      label: 'Código',
      value: 'codigo',
    },
    ...(graph ? [
      {
        label: 'Gráfico',
        value: 'grafico',
      }
    ] : []),
  ];

  return (
    <>
      <Segmented
        style={{ marginBottom: 8 }}
        options={options}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default SubTab;