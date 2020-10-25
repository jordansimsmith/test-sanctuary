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

export const CREATE_TEST = gql`
  mutation CreateTest($test: CreateTestDto!) {
    createTest(input: $test) {
      id
      name
      code
      subject
      year
    }
  }
`;
