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
        testFileLink
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
