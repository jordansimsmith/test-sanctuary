import { gql } from '@apollo/client';

export const GET_TEST = gql`
  query GetTest($institutionId: ID!, $testId: ID!) {
    institution(id: $institutionId) {
      test(id: $testId) {
        id
        name
        subject
        code
        year
      }
    }
  }
`;
