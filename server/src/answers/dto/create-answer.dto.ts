import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerDto {
  @Field()
  answer: string;

  @Field(() => Int)
  questionId: number;
}
