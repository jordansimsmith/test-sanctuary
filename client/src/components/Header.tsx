import { Button, PageHeader } from 'antd';
import { InstitutionSelector } from './InstitutionSelector';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <PageHeader
      title="Test Sanctuary"
      extra={[<InstitutionSelector key="1" />, <Button key="2">Log In</Button>]}
    />
  );
};

export { Header };
