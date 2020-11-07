import { useMutation } from '@apollo/client';
import { Alert, Typography } from 'antd';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { InstitutionForm } from '../../components/InstitutionForm';
import { getSessionOrLogin } from '../../lib/auth/auth';
import { CREATE_INSTITUTION } from '../../lib/graphql/institutions';
import {
  CreateInstitution,
  CreateInstitutionVariables,
} from '../../types/generated/CreateInstitution';
import { PageProps } from '../../types/types';

interface NewInstitutionPageProps extends PageProps {}

const NewInstitutionPage: NextPage<NewInstitutionPageProps> = () => {
  const router = useRouter();

  const navigateToNewInstitution = (data: CreateInstitution) => {
    const newUrl = `/institutions/${data.createInstitution.id}`;
    router.push(newUrl);
  };

  const [createInstitution, { loading, error }] = useMutation<
    CreateInstitution,
    CreateInstitutionVariables
  >(CREATE_INSTITUTION, { onCompleted: navigateToNewInstitution });

  const onFinish = (institution) =>
    createInstitution({ variables: { institution } });

  return (
    <div className="container">
      <Head>
        <title>Test Sanctuary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography.Title className="title" level={2}>
          Create Institution
        </Typography.Title>

        {error && <Alert type="error" message={error.message} />}

        <InstitutionForm onFinish={onFinish} loading={loading} />
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
