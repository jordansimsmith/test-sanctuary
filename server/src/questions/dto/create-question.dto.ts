import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionDto {
  @Field()
  label: string;

  @Field()
  officialAnswer?: string;
}
