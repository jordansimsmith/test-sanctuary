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
