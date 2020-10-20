import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInstitutionDto {
  @Field(() => ID)
  id: string;

  @Field()
  displayName: string;
}
