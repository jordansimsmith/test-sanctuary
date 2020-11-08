import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Attempt } from 'src/attempts/attempts.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('IDX_ANSWER_ATTEMPT_LABEL', ['id', 'label', 'attempt'])
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  label: string;

  @Column()
  @Field()
  answer: string;

  @ManyToOne(
    () => Attempt,
    attempt => attempt.answers,
  )
  @Field(() => Attempt)
  attempt: Promise<Attempt>;
}
