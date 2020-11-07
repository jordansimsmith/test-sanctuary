import { useMutation } from '@apollo/client';
import { Alert, Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { TestForm } from '../../../../components/TestForm';
import { getSessionOrLogin } from '../../../../lib/auth/auth';
import { CREATE_TEST } from '../../../../lib/graphql/tests';
import {
  CreateTest,
  CreateTestVariables,
} from '../../../../types/generated/CreateTest';
import { PageProps } from '../../../../types/types';

interface NewTestPageProps extends PageProps {}

const NewTestPage: NextPage<NewTestPageProps> = () => {
  const router = useRouter();

  const navigateToNewTest = (data: CreateTest) => {
    const newTestUrl = `/institutions/${router.query.institution}/tests/${data.createTest.id}`;
    router.push(newTestUrl);
  };

  const [createTest, { loading, error }] = useMutation<
    CreateTest,
    CreateTestVariables
  >(CREATE_TEST, { onCompleted: navigateToNewTest });

  const onFinish = (test) => createTest({ variables: { test } });

  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          Create Test
        </Typography.Title>

        {error && <Alert type="error" message={error.message} />}

        <TestForm onFinish={onFinish} loading={loading} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<NewTestPageProps> = async (
  ctx,
) => {
  const session = await getSessionOrLogin(ctx);
  if (!session) {
    return;
  }

  return { props: {} };
};

export default NewTestPage;
