import { Typography } from "antd";

type CodeProps = { code: string };

function Code({ code }: CodeProps) {
  return (
    <Typography>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '16px', 
        borderRadius: '4px',
        overflow: 'auto',
        fontFamily: 'monospace'
      }}>
        <code>{code}</code>
      </pre>
    </Typography>
  );
}

export default Code;
