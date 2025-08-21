import React from 'react';
import { Tabs } from 'antd';

const List: React.FC<{ n_exercises: number }> = ({ n_exercises }) => {
  return (
    <>
      <Tabs
        tabPosition={'left'}
        items={Array.from({ length: n_exercises }).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Ejercicio ${id}`,
            key: id,
            children: `Contenido`,
          };
        })}
      />
    </>
  );
};

export default List;