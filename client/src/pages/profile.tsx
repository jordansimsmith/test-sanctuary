import { Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { auth, createLoginUrl } from '../lib/auth/auth';
import { PageProps, UserProfile } from '../types/types';

interface ProfilePageProps extends PageProps {
  user: UserProfile;
}

const Profile: NextPage<ProfilePageProps> = ({ user }) => {
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
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  ctx,
) => {
  const session = await auth.getSession(ctx.req);
  if (!session || !session.user) {
    ctx.res.writeHead(302, {
      Location: createLoginUrl(ctx.req.url),
    });
    ctx.res.end();
    return;
  }

  return { props: { user: session.user as UserProfile } };
};

export default Profile;
