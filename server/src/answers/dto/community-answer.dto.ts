import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class CommunityAnswer {
  @Field()
  answer: string;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  total: number;
}
