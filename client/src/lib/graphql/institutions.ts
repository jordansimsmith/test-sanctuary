import { gql } from '@apollo/client';

export const GET_INSTITUTIONS = gql`
  query GetInstitutions {
    institutions {
      id
      displayName
    }
  }
`;

export const GET_INSTITUTION_AND_TESTS = gql`
  query GetInstitutionAndTests($institutionId: ID!) {
    institution(id: $institutionId) {
      id
      displayName
      tests {
        id
        name
        subject
        code
        year
      }
    }
  }
`;

export const CREATE_INSTITUTION = gql`
  mutation CreateInstitution($institution: CreateInstitutionDto!) {
    createInstitution(input: $institution) {
      id
      displayName
    }
  }
`;
