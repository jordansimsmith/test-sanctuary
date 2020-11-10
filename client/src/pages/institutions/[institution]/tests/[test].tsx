import { Button, Divider, Space, Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { GET_TEST_AND_ATTEMPTS } from '../../../../lib/graphql/tests';
import { initializeApollo } from '../../../../lib/graphql/apolloClient';
import { PageProps } from '../../../../types/types';
import { TestDetails } from '../../../../components/TestDetails';
import { useRouter } from 'next/router';
import {
  GetTestAndAttempts,
  GetTestAndAttemptsVariables,
} from '../../../../types/generated/GetTestAndAttempts';
import { auth } from '../../../../lib/auth/auth';
import React from 'react';
import { AttemptCard } from '../../../../components/AttemptCard';

interface TestPageProps extends PageProps, GetTestAndAttempts {}

const TestPage: NextPage<TestPageProps> = ({ institution }) => {
  const test = institution?.test;

  const router = useRouter();
  const newAttemptUrl = `${router.asPath}/attempts/new`;

  if (!test) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          {test.name}
        </Typography.Title>

        <Divider>Test Information</Divider>

        <TestDetails {...test} />

        <Divider>Attempt Information</Divider>

        <Space direction="vertical">
          <Button href={newAttemptUrl} type="primary">
            Attempt this Test
          </Button>

          {test.attempts &&
            test.attempts.map((a) => (
              <AttemptCard
                key={a.id}
                id={+a.id}
                testName={test.name}
                datetime={a.datetime}
                name={a.name}
                testId={+test.id}
                institutionId={institution.id}
              />
            ))}
        </Space>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TestPageProps> = async (
  ctx,
) => {
  const session = await auth.getSession(ctx.req);

  const institutionId = ctx.query.institution as string;
  const testId = ctx.query.test as string;

  const client = initializeApollo();

  const { data } = await client.query<
    GetTestAndAttempts,
    GetTestAndAttemptsVariables
  >({
    query: GET_TEST_AND_ATTEMPTS,
    variables: { institutionId, testId, authenticated: !!session },
    context: {
      headers: {
        authorization: session ? `Bearer ${session.accessToken}` : '',
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

export default TestPage;
