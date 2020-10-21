import { gql } from '@apollo/client';

export const GET_INSTITUTION_BY_ID = gql`
  query GetInstitutionById($institutionId: ID!) {
    institution(id: $institutionId) {
      id
      displayName
    }
  }
`;
