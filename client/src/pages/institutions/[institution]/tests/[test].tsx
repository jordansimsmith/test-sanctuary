import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { GET_TEST } from '../../../../lib/graphql/tests';
import { GetTest } from '../../../../types/generated/GetTest';
import { initializeApollo } from '../../../../lib/graphql/apolloClient';
import { PageProps } from '../../../../types/types';
import { TestDetails } from '../../../../components/TestDetails';

interface TestPageProps extends PageProps, GetTest {}

const TestPage: NextPage<TestPageProps> = ({ institution }) => {
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
        <TestDetails test={test} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TestPageProps> = async (
  ctx,
) => {
  const institutionId = ctx.query.institution;
  const testId = ctx.query.test;

  const client = initializeApollo();

  const { data } = await client.query<GetTest>({
    query: GET_TEST,
    variables: { institutionId, testId },
  });

  return {
    props: {
      institution: data.institution,
      initialApolloState: client.extract(),
    },
  };
};

export default TestPage;
