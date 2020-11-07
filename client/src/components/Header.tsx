import { Button, PageHeader, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { InstitutionSelector } from './InstitutionSelector';
import { UserContext } from './UserContext';
import { createLoginUrl } from '../lib/auth/auth';

interface HeaderActionsProps {}

const HeaderActions: React.FC<HeaderActionsProps> = () => {
  const { user, loading } = useContext(UserContext);

  const router = useRouter();
  const loginUrl = createLoginUrl(router.asPath);

  return (
    <Space>
      <InstitutionSelector />

      {loading && <Spin />}

      {user ? (
        <>
          <Button href="/profile" icon={<UserOutlined />}>
            {user.name}
          </Button>
          <Button href="/api/logout">Log Out</Button>
        </>
      ) : (
        <Button href={loginUrl}>Log In</Button>
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
