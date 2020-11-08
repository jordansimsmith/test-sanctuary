import { Divider, Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { initializeApollo } from '../../../../../../lib/graphql/apolloClient';
import { GET_TEST_AND_QUESTIONS } from '../../../../../../lib/graphql/tests';
import { PageProps } from '../../../../../../types/types';
import { TestDetails } from '../../../../../../components/TestDetails';
import { GetTestAndQuestions } from '../../../../../../types/generated/GetTestAndQuestions';
import { AttemptForm } from '../../../../../../components/AttemptForm';

interface NewAttemptPageProps extends PageProps, GetTestAndQuestions {}

const NewAttemptPage: NextPage<NewAttemptPageProps> = ({ institution }) => {
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
          {`Create Attempt: ${test.name}`}
        </Typography.Title>

        <Divider>Test Information</Divider>

        <TestDetails test={test} />

        <Divider>Attempt Information</Divider>

        <AttemptForm
          test={test}
          onFinish={(e) => alert(JSON.stringify(e, null, 2))}
        />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<NewAttemptPageProps> = async (
  ctx,
) => {
  const institutionId = ctx.query.institution;
  const testId = ctx.query.test;

  const client = initializeApollo();

  const { data } = await client.query<GetTestAndQuestions>({
    query: GET_TEST_AND_QUESTIONS,
    variables: { institutionId, testId },
  });

  return {
    props: {
      institution: data.institution,
      initialApolloState: client.extract(),
    },
  };
};

export default NewAttemptPage;
