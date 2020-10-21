import { Field, InputType, Int } from '@nestjs/graphql';

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
}
