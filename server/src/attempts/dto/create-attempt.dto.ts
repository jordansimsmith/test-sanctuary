import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

@InputType()
export class CreateAttemptDto {
  @Field()
  name: string;

  @Field(() => [CreateAnswerDto])
  answers: CreateAnswerDto[];

  @Field(() => Int)
  testId: number;
}
