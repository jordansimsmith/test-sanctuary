import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerDto {
  @Field()
  label: string;

  @Field()
  answer: string;
}
