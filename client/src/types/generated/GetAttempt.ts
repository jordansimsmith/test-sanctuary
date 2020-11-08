/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAttempt
// ====================================================

export interface GetAttempt_institution_test_attempt_test {
  __typename: "Test";
  id: string;
  name: string;
}

export interface GetAttempt_institution_test_attempt_answers_question {
  __typename: "Question";
  id: string;
  label: string;
  officialAnswer: string;
}

export interface GetAttempt_institution_test_attempt_answers {
  __typename: "Answer";
  id: string;
  answer: string;
  question: GetAttempt_institution_test_attempt_answers_question;
}

export interface GetAttempt_institution_test_attempt {
  __typename: "Attempt";
  id: string;
  name: string;
  datetime: any;
  test: GetAttempt_institution_test_attempt_test;
  answers: GetAttempt_institution_test_attempt_answers[];
}

export interface GetAttempt_institution_test {
  __typename: "Test";
  attempt: GetAttempt_institution_test_attempt | null;
}

export interface GetAttempt_institution {
  __typename: "Institution";
  test: GetAttempt_institution_test | null;
}

export interface GetAttempt {
  institution: GetAttempt_institution | null;
}

export interface GetAttemptVariables {
  institutionId: string;
  testId: string;
  attemptId: string;
}
