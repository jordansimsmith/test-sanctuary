import { Divider, Space, Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { AttemptCard } from '../components/AttemptCard';
import { getSessionOrLogin } from '../lib/auth/auth';
import { initializeApollo } from '../lib/graphql/apolloClient';
import { GET_ATTEMPTS } from '../lib/graphql/attempts';
import { GetAttempts } from '../types/generated/GetAttempts';
import { PageProps, UserProfile } from '../types/types';

interface ProfilePageProps extends PageProps, GetAttempts {
  user: UserProfile;
}

const Profile: NextPage<ProfilePageProps> = ({ user, attempts }) => {
  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          {`${user.name}'s Profile`}
        </Typography.Title>

        <Divider>Attempt History</Divider>

        <Space direction="vertical">
          {attempts.map((a) => (
            <AttemptCard
              key={a.id}
              id={+a.id}
              testName={a.test.name}
              datetime={a.datetime}
              name={a.name}
              testId={+a.test.id}
              institutionId={a.test.institution.id}
            />
          ))}
        </Space>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  ctx,
) => {
  const session = await getSessionOrLogin(ctx);
  if (!session) {
    return;
  }

  const client = initializeApollo();
  const { data } = await client.query<GetAttempts>({
    query: GET_ATTEMPTS,
    context: {
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    },
  });

  return {
    props: { user: session.user as UserProfile, attempts: data.attempts },
  };
};

export default Profile;
