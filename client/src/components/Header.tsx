import { Button, PageHeader, Space, Spin } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { InstitutionSelector } from './InstitutionSelector';
import { useContext } from 'react';
import { UserContext } from './UserContext';

interface HeaderActionsProps {}

const HeaderActions: React.FC<HeaderActionsProps> = () => {
  const { user, loading } = useContext(UserContext);

  return (
    <Space>
      <InstitutionSelector />

      {loading && <Spin />}

      {user ? (
        <>
          <span>{user.name}</span>
          <Button href="/api/logout">Log Out</Button>
        </>
      ) : (
        <Button href="/api/login">Log In</Button>
      )}
    </Space>
  );
};

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();

  return (
    <PageHeader
      className="header"
      title={<Link href="/">Test Sanctuary</Link>}
      onBack={() => router.back()}
      extra={[<HeaderActions key="1" />]}
    ></PageHeader>
  );
};
