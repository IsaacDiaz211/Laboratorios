import React from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const TabMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const activeKey = location.pathname.startsWith('/lab') 
    ? location.pathname.replace('/lab', '') 
    : '1';

  const handleTabChange = (key: string) => {
    navigate(`/lab${key}`);
  };

  return (
    <Tabs
      activeKey={activeKey}
      defaultActiveKey="1"
      centered
      onChange={handleTabChange}
      items={Array.from({ length: 7 }).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Laboratorio ${id}`,
          key: id,
        };
      })}
    />
  );
};

export default TabMenu;
