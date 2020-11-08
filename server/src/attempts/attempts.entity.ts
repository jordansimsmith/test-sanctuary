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
export class Attempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @OneToMany(
    () => Answer,
    answer => answer.attempt,
    { onDelete: 'CASCADE' },
  )
  answers: Promise<Answer[]>;

  // no back relation as it is user specific
  @ManyToOne(() => Test)
  test: Promise<Test>;
}
