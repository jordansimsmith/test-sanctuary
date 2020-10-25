import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Button, Space, Typography } from 'antd';
import { NextPage } from 'next';
import { ApolloPageContext } from 'next-with-apollo';
import { useRouter } from 'next/dist/client/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { TestCard } from '../../components/TestCard';
import { GET_INSTITUTION_AND_TESTS } from '../../lib/graphql/institutions';
import { GetInstitutionAndTests } from '../../types/generated/GetInstitutionAndTests';

interface InstitutionPageProps extends GetInstitutionAndTests {}

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

InstitutionPage.getInitialProps = async (ctx: ApolloPageContext) => {
  const institutionId = ctx.query.institution;

  const client = ctx.apolloClient as ApolloClient<NormalizedCacheObject>;

  const { data } = await client.query<GetInstitutionAndTests>({
    query: GET_INSTITUTION_AND_TESTS,
    variables: { institutionId },
  });

  return { institution: data.institution };
};

export default InstitutionPage;
