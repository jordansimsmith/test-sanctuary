import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Typography } from 'antd';
import { NextPage } from 'next';
import { ApolloPageContext } from 'next-with-apollo';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { GET_TEST } from '../../../../lib/graphql/tests';
import { GetTest } from '../../../../types/generated/GetTest';

interface TestPage extends GetTest {}

const TestPage: NextPage<TestPage> = ({ institution }) => {
  const test = institution?.test;
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
      </main>
    </div>
  );
};

TestPage.getInitialProps = async (ctx: ApolloPageContext) => {
  const institutionId = ctx.query.institution;
  const testId = ctx.query.test;

  const client = ctx.apolloClient as ApolloClient<NormalizedCacheObject>;

  const { data } = await client.query<GetTest>({
    query: GET_TEST,
    variables: { institutionId, testId },
  });

  return data;
};

export default TestPage;
