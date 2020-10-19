import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInstitutionDto {
  @Field()
  id: string;

  @Field()
  displayName: string;
}
