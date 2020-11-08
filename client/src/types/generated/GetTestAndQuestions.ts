/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTestAndQuestions
// ====================================================

export interface GetTestAndQuestions_institution_test_questions {
  __typename: "Question";
  id: string;
  label: string;
}

export interface GetTestAndQuestions_institution_test {
  __typename: "Test";
  id: string;
  name: string;
  subject: string;
  code: number;
  year: number;
  testFileLink: string;
  questions: GetTestAndQuestions_institution_test_questions[];
}

export interface GetTestAndQuestions_institution {
  __typename: "Institution";
  test: GetTestAndQuestions_institution_test | null;
}

export interface GetTestAndQuestions {
  institution: GetTestAndQuestions_institution | null;
}

export interface GetTestAndQuestionsVariables {
  institutionId: string;
  testId: string;
}
