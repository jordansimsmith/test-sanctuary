/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInstitutionAndTests
// ====================================================

export interface GetInstitutionAndTests_institution_tests {
  __typename: "Test";
  id: string;
  name: string;
  subject: string;
  code: number;
  year: number;
}

export interface GetInstitutionAndTests_institution {
  __typename: "Institution";
  id: string;
  displayName: string;
  tests: GetInstitutionAndTests_institution_tests[];
}

export interface GetInstitutionAndTests {
  institution: GetInstitutionAndTests_institution | null;
}

export interface GetInstitutionAndTestsVariables {
  institutionId: string;
}
