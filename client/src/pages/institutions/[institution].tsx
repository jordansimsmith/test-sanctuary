import { Button, Space, Typography } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { TestCard } from '../../components/TestCard';
import { initializeApollo } from '../../lib/graphql/apolloClient';
import { GET_INSTITUTION_AND_TESTS } from '../../lib/graphql/institutions';
import { GetInstitutionAndTests } from '../../types/generated/GetInstitutionAndTests';
import { PageProps } from '../../types/types';

interface InstitutionPageProps extends PageProps, GetInstitutionAndTests {}

const InstitutionPage: NextPage<InstitutionPageProps> = ({ institution }) => {
  const router = useRouter();
  const newTestRef = {
    pathname: `${router.pathname}/tests/new`,
    query: router.query,
  };

  if (!institution) {
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
          {institution.displayName}
        </Typography.Title>

        <Space direction="vertical">
          <Link href={newTestRef}>
            <Button type="primary">Create Test</Button>
          </Link>

          {institution.tests.map((test) => (
            <TestCard key={test.id} {...test} />
          ))}
        </Space>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<InstitutionPageProps> = async (
  ctx,
) => {
  const institutionId = ctx.query.institution;

  const client = initializeApollo();

  const { data } = await client.query<GetInstitutionAndTests>({
    query: GET_INSTITUTION_AND_TESTS,
    variables: { institutionId },
  });

  return {
    props: {
      institution: data.institution,
      initialApolloState: client.extract(),
    },
  };
};

export default InstitutionPage;
