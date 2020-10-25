import { Card, Tag } from 'antd';
import { useRouter } from 'next/dist/client/router';
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
  const router = useRouter();
  const testRef = {
    pathname: `${router.pathname}/tests/${id}`,
    query: router.query,
  };

  return (
    <Link href={testRef}>
      <Card title={name} extra={<Link href={testRef}>More</Link>} hoverable>
        <Tag color="blue">{subject}</Tag>
        <Tag color="blue">{code}</Tag>
        <Tag color="blue">{year}</Tag>
      </Card>
    </Link>
  );
};
