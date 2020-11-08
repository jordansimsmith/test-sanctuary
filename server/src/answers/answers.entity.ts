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
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  answer: string;

  @ManyToOne(
    () => Attempt,
    attempt => attempt.answers,
  )
  attempt: Promise<Attempt>;
}
