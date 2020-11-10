import { Button, Descriptions, Tag } from 'antd';

interface TestDetailsProps {
  subject: string;
  code: number;
  year: number;
  testFileLink: string;
}

export const TestDetails: React.FC<TestDetailsProps> = ({
  subject,
  code,
  year,
  testFileLink,
}) => {
  return (
    <div>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Subject">
          <Tag color="blue">{subject}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Code">
          <Tag color="blue">{code}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Year">
          <Tag color="blue">{year}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <Button href={testFileLink} target="_blank">
        Questions Download
      </Button>
    </div>
  );
};
