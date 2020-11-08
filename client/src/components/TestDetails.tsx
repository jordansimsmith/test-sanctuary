import { Button, Descriptions, Tag } from 'antd';
import { GetTest_institution_test } from '../types/generated/GetTest';

interface TestDetailsProps {
  test: GetTest_institution_test;
}

export const TestDetails: React.FC<TestDetailsProps> = ({ test }) => {
  return (
    <div>
      <Descriptions layout="vertical">
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
