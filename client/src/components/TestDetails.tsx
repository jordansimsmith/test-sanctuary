import { Button, Descriptions, Tag, Typography } from 'antd';
import { GetTest_institution_test } from '../types/generated/GetTest';

interface TestDetailsProps {
  test: GetTest_institution_test;
}

export const TestDetails: React.FC<TestDetailsProps> = ({ test }) => {
  return (
    <div>
      <Typography.Title className="title" level={2}>
        {test.name}
      </Typography.Title>

      <Descriptions title="Test Information" layout="vertical">
        <Descriptions.Item label="Subject">
          <Tag color="blue">{test.subject}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Code">
          <Tag color="blue">{test.code}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Year">
          <Tag color="blue">{test.year}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <Button href={test.testFileLink} target="_blank">
        Questions Download
      </Button>
    </div>
  );
};
