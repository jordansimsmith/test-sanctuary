import { Button, Col, PageHeader, Row, Tooltip } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
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
      <Col xs={20} sm={10} className="col-block">
        <InstitutionSelector />
      </Col>

      <Col xs={4} sm={2}>
        <Tooltip title="Create an institution">
          <Button
            href="/institutions/new"
            icon={<PlusOutlined />}
            block
            disabled={!user}
          />
        </Tooltip>
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
