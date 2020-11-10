import { gql } from '@apollo/client';

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

export const GET_TEST_AND_QUESTIONS = gql`
  query GetTestAndQuestions($institutionId: ID!, $testId: ID!) {
    institution(id: $institutionId) {
      test(id: $testId) {
        id
        name
        subject
        code
        year
        testFileLink
        questions {
          id
          label
        }
      }
    }
  }
`;

export const GET_TEST_AND_ATTEMPTS = gql`
  query GetTestAndAttempts(
    $institutionId: ID!
    $testId: ID!
    $authenticated: Boolean!
  ) {
    institution(id: $institutionId) {
      id
      test(id: $testId) {
        id
        name
        subject
        code
        year
        testFileLink
        attempts @include(if: $authenticated) {
          id
          name
          datetime
        }
      }
    }
  }
`;
