import { Field, InputType } from '@nestjs/graphql';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

@InputType()
export class CreateAttemptDto {
  @Field()
  name: string;

  @Field()
  answers: CreateAnswerDto[];
}
