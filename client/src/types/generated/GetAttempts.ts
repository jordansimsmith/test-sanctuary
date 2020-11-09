/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAttempts
// ====================================================

export interface GetAttempts_attempts_test_institution {
  __typename: "Institution";
  id: string;
}

export interface GetAttempts_attempts_test {
  __typename: "Test";
  id: string;
  name: string;
  institution: GetAttempts_attempts_test_institution;
}

export interface GetAttempts_attempts {
  __typename: "Attempt";
  id: string;
  name: string;
  datetime: any;
  test: GetAttempts_attempts_test;
}

export interface GetAttempts {
  attempts: GetAttempts_attempts[];
}
