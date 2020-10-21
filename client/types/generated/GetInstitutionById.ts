/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInstitutionById
// ====================================================

export interface GetInstitutionById_institution {
  __typename: "Institution";
  id: string;
  displayName: string;
}

export interface GetInstitutionById {
  institution: GetInstitutionById_institution | null;
}

export interface GetInstitutionByIdVariables {
  institutionId: string;
}
