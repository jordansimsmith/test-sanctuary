/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTestDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTest
// ====================================================

export interface CreateTest_createTest {
  __typename: "Test";
  id: string;
  name: string;
  code: number;
  subject: string;
  year: number;
}

export interface CreateTest {
  createTest: CreateTest_createTest;
}

export interface CreateTestVariables {
  test: CreateTestDto;
}
