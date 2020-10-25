import { Button, PageHeader } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { InstitutionSelector } from './InstitutionSelector';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();

  return (
    <PageHeader
      className="header"
      title="Test Sanctuary"
      extra={[<InstitutionSelector key="1" />, <Button key="2">Log In</Button>]}
      onBack={() => router.back()}
    />
  );
};
