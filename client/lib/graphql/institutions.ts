import { gql } from '@apollo/client';

export const GET_INSTITUTION_BY_ID = gql`
  query GetInstitutionById($institutionId: String!) {
    institution(id: $institutionId) {
      id
      displayName
    }
  }
`;
