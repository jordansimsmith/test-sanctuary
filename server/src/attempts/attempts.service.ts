import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.entity';
import { Test } from 'src/tests/tests.entity';
import { Repository } from 'typeorm';
import { Attempt } from './attempts.entity';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt)
    private readonly attemptsRepository: Repository<Attempt>,
    @InjectRepository(Test)
    private readonly testsRepository: Repository<Test>,
  ) {}

  async create(
    createAttemptDto: CreateAttemptDto,
    userId: string,
  ): Promise<Attempt> {
    // validate answers
    const test = await this.testsRepository.findOneOrFail(
      createAttemptDto.testId,
    );
    const questions = await test.questions;
    const completeAnswers =
      questions.length === createAttemptDto.answers.length &&
      questions.every(q =>
        createAttemptDto.answers.some(a => a.label === q.label),
      );
    if (!completeAnswers) {
      throw new Error(
        'Please provide an answer for every question in the test.',
      );
    }

    const attempt = new Attempt();
    attempt.name = createAttemptDto.name;
    attempt.userId = userId;
    attempt['test' as any] = createAttemptDto.testId;

    attempt.answers = Promise.resolve(
      createAttemptDto.answers.map(a => {
        const answer = new Answer();
        answer.label = a.label;
        answer.answer = a.answer;

        return answer;
      }),
    );

    return this.attemptsRepository.save(attempt);
  }
}
