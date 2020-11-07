/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInstitutionDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateInstitution
// ====================================================

export interface CreateInstitution_createInstitution {
  __typename: "Institution";
  id: string;
  displayName: string;
}

export interface CreateInstitution {
  createInstitution: CreateInstitution_createInstitution;
}

export interface CreateInstitutionVariables {
  institution: CreateInstitutionDto;
}
