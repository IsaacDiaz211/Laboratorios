import React, { useState } from 'react';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import './CodeBlock.css';

type CodeProps = { code: string };

const CodeBlock: React.FC<CodeProps> = ({ code }: CodeProps) => {

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      message.success('Código copiado');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="simple-code-block">
      <div className="code-header">
        <span className="language-label">TypeScript</span>
        <Button 
          size="small" 
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={copyToClipboard}
          className="copy-btn"
        >
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
      </div>
      
      <div className="code-content">
        <pre>
          <code className={`language-typescript`}>
            {code.split('\n').map((line, i) => (
              <div key={i} className="code-line">
                {true && <span className="line-number">{i + 1}</span>}
                <span>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;