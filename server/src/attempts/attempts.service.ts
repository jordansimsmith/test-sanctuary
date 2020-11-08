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
        createAttemptDto.answers.some(a => a.questionId === q.id),
      );
    if (!completeAnswers) {
      throw new Error(
        'Please provide an answer for every question in the test.',
      );
    }

    const attempt = new Attempt();
    attempt.name = createAttemptDto.name;
    attempt.userId = userId;
    attempt.datetime = new Date();
    attempt['test' as any] = createAttemptDto.testId;

    attempt.answers = Promise.resolve(
      createAttemptDto.answers.map(a => {
        const answer = new Answer();
        answer.answer = a.answer;
        answer['question' as any] = a.questionId;

        return answer;
      }),
    );

    return this.attemptsRepository.save(attempt);
  }

  findOne(id: number, testId: number, userId: string) {
    return this.attemptsRepository.findOne({
      where: { id, userId, test: { id: testId } },
    });
  }

  findAll(userId: string) {
    return this.attemptsRepository.find({ where: { userId } });
  }

  findAllForTest(testId: number, userId: string) {
    return this.attemptsRepository.find({
      where: { userId, test: { id: testId } },
    });
  }
}
