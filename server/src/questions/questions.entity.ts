import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Test } from 'src/tests/tests.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('IDX_QUESTION_LABEL', ['id', 'label'])
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(
    () => Test,
    test => test.questions,
  )
  @Field(() => Test)
  test: Promise<Test>;

  @Column()
  @Field()
  label: string;

  @Column()
  @Field()
  answer?: string;
}
