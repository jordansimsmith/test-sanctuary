/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateQuestionDto {
  answer: string;
  label: string;
}

export interface CreateTestDto {
  code: number;
  institutionId: string;
  name: string;
  questions: CreateQuestionDto[];
  subject: string;
  testFile: any;
  year: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
