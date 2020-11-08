import { gql } from '@apollo/client';

export const CREATE_ATTEMPT = gql`
  mutation CreateAttempt($attempt: CreateAttemptDto!) {
    createAttempt(input: $attempt) {
      id
      name
      userId
      answers {
        id
        answer
      }
      datetime
    }
  }
`;

export const GET_ATTEMPT = gql`
  query GetAttempt($institutionId: ID!, $testId: ID!, $attemptId: ID!) {
    institution(id: $institutionId) {
      test(id: $testId) {
        attempt(id: $attemptId) {
          id
          name
          datetime
          test {
            id
            name
          }
          answers {
            id
            answer
            question {
              id
              label
              officialAnswer
            }
          }
        }
      }
    }
  }
`;
