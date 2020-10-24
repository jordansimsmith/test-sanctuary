import { Button, PageHeader } from 'antd';
import { InstitutionSelector } from './InstitutionSelector';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <PageHeader
      className="header"
      title="Test Sanctuary"
      extra={[<InstitutionSelector key="1" />, <Button key="2">Log In</Button>]}
    />
  );
};
