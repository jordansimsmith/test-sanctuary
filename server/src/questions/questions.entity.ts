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
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Test,
    test => test.questions,
  )
  test: Promise<Test>;

  @Column()
  label: string;

  @Column()
  answer?: string;
}
