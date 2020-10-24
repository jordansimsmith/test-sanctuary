import { Card, Tag } from 'antd';
import Link from 'next/link';
import { GetInstitutionAndTests_institution_tests } from '../types/generated/GetInstitutionAndTests';

interface TestCardProps extends GetInstitutionAndTests_institution_tests {}

export const TestCard: React.FC<TestCardProps> = ({
  id,
  name,
  subject,
  code,
  year,
}) => {
  const testUrl = `/tests/${id}`;

  return (
    <Link href={testUrl}>
      <Card title={name} extra={<Link href={testUrl}>More</Link>} hoverable>
        <Tag>{subject}</Tag>
        <Tag>{code}</Tag>
        <Tag>{year}</Tag>
      </Card>
    </Link>
  );
};
