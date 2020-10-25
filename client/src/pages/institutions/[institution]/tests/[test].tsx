import { Typography } from 'antd';
import { NextPage } from 'next';
import Head from 'next/head';

interface TestPage {}

const TestPage: NextPage<TestPage> = () => {
  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          Test
        </Typography.Title>
      </main>
    </div>
  );
};

export default TestPage;
