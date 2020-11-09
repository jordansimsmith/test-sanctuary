import { Card, Descriptions, Tag } from 'antd';
import Link from 'next/link';

interface AttemptCardProps {
  testName: string;
  testId: number;
  institutionId: string;
  id: number;
  name: string;
  datetime: string;
}

export const AttemptCard: React.FC<AttemptCardProps> = ({
  testName,
  testId,
  institutionId,
  id,
  name,
  datetime,
}) => {
  const attemptUrl = `/institutions/${institutionId}/tests/${testId}/attempts/${id}`;

  return (
    <Link href={attemptUrl}>
      <Card title={name} hoverable size="small">
        <Descriptions>
          <Descriptions.Item label="Test Name">
            <Tag color="blue">{testName}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            <Tag color="blue">{new Date(datetime).toDateString()}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Link>
  );
};
