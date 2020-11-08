import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.entity';
import { Repository } from 'typeorm';
import { Attempt } from './attempts.entity';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt)
    private readonly attemptsRepository: Repository<Attempt>,
  ) {}

  create(createAttemptDto: CreateAttemptDto, userId: string): Promise<Attempt> {
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
