/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTest
// ====================================================

export interface GetTest_institution_test {
  __typename: "Test";
  id: string;
  name: string;
  subject: string;
  code: number;
  year: number;
  testFileLink: string;
}

export interface GetTest_institution {
  __typename: "Institution";
  test: GetTest_institution_test | null;
}

export interface GetTest {
  institution: GetTest_institution | null;
}

export interface GetTestVariables {
  institutionId: string;
  testId: string;
}
