import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextPage } from 'next';
import { ApolloPageContext } from 'next-with-apollo';
import ErrorPage from 'next/error';
import { GET_INSTITUTION_BY_ID } from '../../lib/graphql/institutions';
import { GetInstitutionById } from '../../types/generated/GetInstitutionById';

interface InstitutionPageProps extends GetInstitutionById {}

const InstitutionPage: NextPage<InstitutionPageProps> = ({ institution }) => {
  if (!institution) {
    return <ErrorPage statusCode={404} />;
  }
  return <div>{institution.displayName}</div>;
};

InstitutionPage.getInitialProps = async (ctx: ApolloPageContext) => {
  const institutionId = ctx.query.institution;

  const client = ctx.apolloClient as ApolloClient<NormalizedCacheObject>;

  const { data } = await client.query<GetInstitutionById>({
    query: GET_INSTITUTION_BY_ID,
    variables: { institutionId },
  });

  return { institution: data.institution };
};

export default InstitutionPage;
