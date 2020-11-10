/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTestAndAttempts
// ====================================================

export interface GetTestAndAttempts_institution_test_attempts {
  __typename: "Attempt";
  id: string;
  name: string;
  datetime: any;
}

export interface GetTestAndAttempts_institution_test {
  __typename: "Test";
  id: string;
  name: string;
  subject: string;
  code: number;
  year: number;
  testFileLink: string;
  attempts: GetTestAndAttempts_institution_test_attempts[];
}

export interface GetTestAndAttempts_institution {
  __typename: "Institution";
  id: string;
  test: GetTestAndAttempts_institution_test | null;
}

export interface GetTestAndAttempts {
  institution: GetTestAndAttempts_institution | null;
}

export interface GetTestAndAttemptsVariables {
  institutionId: string;
  testId: string;
  authenticated: boolean;
}
