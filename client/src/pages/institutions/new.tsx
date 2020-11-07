import { Typography } from 'antd';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { InstitutionForm } from '../../components/InstitutionForm';
import { getSessionOrLogin } from '../../lib/auth/auth';
import { PageProps } from '../../types/types';

interface NewInstitutionPageProps extends PageProps {}

const NewInstitutionPage: NextPage<NewInstitutionPageProps> = () => {
  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          Create Institution
          <InstitutionForm
            onFinish={(e) => alert(JSON.stringify(e, null, 2))}
          />
        </Typography.Title>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<NewInstitutionPageProps> = async (
  ctx,
) => {
  const session = await getSessionOrLogin(ctx);
  if (!session) {
    return;
  }

  return { props: {} };
};

export default NewInstitutionPage;
