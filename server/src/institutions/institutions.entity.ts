import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Institution {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  displayName: string;
}
