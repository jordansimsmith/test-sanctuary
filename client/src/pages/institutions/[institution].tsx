import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Space, Typography } from 'antd';
import { NextPage } from 'next';
import { ApolloPageContext } from 'next-with-apollo';
import ErrorPage from 'next/error';
import { TestCard } from '../../components/TestCard';
import { GET_INSTITUTION_AND_TESTS } from '../../lib/graphql/institutions';
import { GetInstitutionAndTests } from '../../types/generated/GetInstitutionAndTests';

interface InstitutionPageProps extends GetInstitutionAndTests {}

const InstitutionPage: NextPage<InstitutionPageProps> = ({ institution }) => {
  if (!institution) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="container">
      <Typography.Title className="title" level={2}>
        {institution.displayName}
      </Typography.Title>

      <Space direction="vertical">
        {institution.tests.map((test) => (
          <TestCard key={test.id} {...test} />
        ))}
      </Space>
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
