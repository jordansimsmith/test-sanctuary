import { Alert, Divider, Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { initializeApollo } from '../../../../../../lib/graphql/apolloClient';
import { GET_TEST_AND_QUESTIONS } from '../../../../../../lib/graphql/tests';
import { PageProps } from '../../../../../../types/types';
import { TestDetails } from '../../../../../../components/TestDetails';
import { GetTestAndQuestions } from '../../../../../../types/generated/GetTestAndQuestions';
import { AttemptForm } from '../../../../../../components/AttemptForm';
import { getSessionOrLogin } from '../../../../../../lib/auth/auth';
import {
  CreateAttempt,
  CreateAttemptVariables,
} from '../../../../../../types/generated/CreateAttempt';
import { CREATE_ATTEMPT } from '../../../../../../lib/graphql/attempts';

interface NewAttemptPageProps extends PageProps, GetTestAndQuestions {}

const NewAttemptPage: NextPage<NewAttemptPageProps> = ({ institution }) => {
  const router = useRouter();

  const navigateToNewAttempt = (data: CreateAttempt) => {
    const newUrl = `/institutions/${router.query.institution}/tests/${router.query.test}/attempts/${data.createAttempt.id}`;
    router.push(newUrl);
  };

  const [createAttempt, { loading, error }] = useMutation<
    CreateAttempt,
    CreateAttemptVariables
  >(CREATE_ATTEMPT, { onCompleted: navigateToNewAttempt });

  const onFinish = async (attempt) => {
    try {
      await createAttempt({ variables: { attempt } });
    } catch (e) {
      console.error(e);
    }
  };

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

        {error && <Alert type="error" message={error.message} />}

        <AttemptForm test={test} onFinish={onFinish} loading={loading} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<NewAttemptPageProps> = async (
  ctx,
) => {
  const session = await getSessionOrLogin(ctx);
  if (!session) {
    return;
  }

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
