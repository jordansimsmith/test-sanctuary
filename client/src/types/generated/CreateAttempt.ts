/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAttemptDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAttempt
// ====================================================

export interface CreateAttempt_createAttempt_answers {
  __typename: "Answer";
  id: string;
  answer: string;
}

export interface CreateAttempt_createAttempt {
  __typename: "Attempt";
  id: string;
  name: string;
  answers: CreateAttempt_createAttempt_answers[];
  datetime: any;
}

export interface CreateAttempt {
  createAttempt: CreateAttempt_createAttempt;
}

export interface CreateAttemptVariables {
  attempt: CreateAttemptDto;
}
