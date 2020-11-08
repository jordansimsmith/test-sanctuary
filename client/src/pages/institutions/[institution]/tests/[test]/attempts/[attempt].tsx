import { Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { initializeApollo } from '../../../../../../lib/graphql/apolloClient';
import { GET_ATTEMPT } from '../../../../../../lib/graphql/attempts';
import { GetAttempt } from '../../../../../../types/generated/GetAttempt';
import { PageProps } from '../../../../../../types/types';
import { getSessionOrLogin } from '../../../../../../lib/auth/auth';

interface AttemptPageProps extends PageProps, GetAttempt {}

const AttemptPage: NextPage<AttemptPageProps> = ({ institution }) => {
  if (!institution?.test?.attempt) {
    return <ErrorPage statusCode={404} />;
  }
  const attempt = institution.test.attempt;
  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          {attempt.name}
        </Typography.Title>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<AttemptPageProps> = async (
  ctx,
) => {
  const session = await getSessionOrLogin(ctx);
  if (!session) {
    return;
  }

  const institutionId = ctx.query.institution;
  const testId = ctx.query.test;
  const attemptId = ctx.query.attempt;

  const client = initializeApollo();

  const { data } = await client.query<GetAttempt>({
    query: GET_ATTEMPT,
    variables: {
      institutionId,
      testId,
      attemptId,
    },
    context: {
      headers: {
        authorization: `Bearer ${session.accessToken}`,
      },
    },
  });

  return {
    props: {
      institution: data.institution,
      initialApolloState: client.extract(),
    },
  };
};

export default AttemptPage;
