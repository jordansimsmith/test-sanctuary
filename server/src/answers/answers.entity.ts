import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Attempt } from 'src/attempts/attempts.entity';
import { Question } from 'src/questions/questions.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('IDX_ANSWER_ATTEMPT', ['id', 'attempt'])
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  answer: string;

  @ManyToOne(
    () => Attempt,
    attempt => attempt.answers,
  )
  @Field(() => Attempt)
  attempt: Promise<Attempt>;

  @ManyToOne(
    () => Question,
    question => question.answers,
  )
  @Field(() => Question)
  question: Promise<Question>;
}
