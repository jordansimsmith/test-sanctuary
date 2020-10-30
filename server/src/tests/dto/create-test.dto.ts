import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

@InputType()
export class CreateTestDto {
  @Field()
  name: string;

  @Field()
  subject: string;

  @Field(() => Int)
  code: number;

  @Field(() => Int)
  year: number;

  @Field()
  institutionId: string;

  @Field(() => [CreateQuestionDto])
  questions: CreateQuestionDto[];
}
