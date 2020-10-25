import { Typography } from 'antd';
import { NextPage } from 'next';
import Head from 'next/head';

interface NewTestPageProps {}

const NewTestPage: NextPage<NewTestPageProps> = () => {
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
      </main>
    </div>
  );
};

export default NewTestPage;
