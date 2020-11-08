import { Typography } from 'antd';
import { NextPage } from 'next';
import Head from 'next/head';
import { PageProps } from '../../../../../../types/types';

interface NewAttemptPageProps extends PageProps {}

const NewAttemptPage: NextPage<NewAttemptPageProps> = () => {
  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          Create Attempt
        </Typography.Title>
      </main>
    </div>
  );
};

export default NewAttemptPage;
