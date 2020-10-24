/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInstitutions
// ====================================================

export interface GetInstitutions_institutions {
  __typename: "Institution";
  id: string;
  displayName: string;
}

export interface GetInstitutions {
  institutions: GetInstitutions_institutions[];
}
