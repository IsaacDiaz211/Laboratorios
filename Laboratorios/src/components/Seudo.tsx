import { Typography } from "antd";

type SeudoProps = { code: string };

function Seudo({ code }: SeudoProps) {
  return (
    <Typography.Paragraph>
      <pre>{code}</pre>
    </Typography.Paragraph>
  );
}

export default Seudo;
