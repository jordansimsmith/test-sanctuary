import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/answers/answers.entity';
import { Test } from 'src/tests/tests.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Attempt {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(
    () => Answer,
    answer => answer.attempt,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @Field(() => [Answer])
  answers: Promise<Answer[]>;

  // no back relation as it is user specific
  @ManyToOne(() => Test)
  @Field(() => Test)
  test: Promise<Test>;
}
