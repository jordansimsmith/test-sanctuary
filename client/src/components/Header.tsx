import { Button, Col, PageHeader, Row, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { InstitutionSelector } from './InstitutionSelector';
import { UserContext } from './UserContext';
import { createLoginUrl } from '../lib/auth/auth';

interface HeaderActionsProps {}

const HeaderActions: React.FC<HeaderActionsProps> = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();
  const loginUrl = createLoginUrl(router.asPath);

  return (
    <Row gutter={[6, 6]}>
      <Col xs={24} sm={12} className="col-block">
        <InstitutionSelector />
      </Col>

      <Col xs={24} sm={8}>
        <Button href="/profile" icon={<UserOutlined />} block disabled={!user}>
          {user?.name ?? 'Profile'}
        </Button>
      </Col>

      <Col xs={24} sm={4}>
        {user ? (
          <Button href="/api/logout" block>
            Log Out
          </Button>
        ) : (
          <Button href={loginUrl} block>
            Log In
          </Button>
        )}
      </Col>
    </Row>
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
