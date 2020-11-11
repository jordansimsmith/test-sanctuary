import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Test } from 'src/tests/tests.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Institution {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  displayName: string;

  @OneToMany(
    () => Test,
    test => test.institution,
  )
  @Field(() => [Test])
  tests: Promise<Test[]>;

  @Column()
  creatorId: string;
}
