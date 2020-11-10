import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.entity';
import { Repository } from 'typeorm';
import { CommunityAnswer } from './dto/community-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>,
  ) {}

  async communityAnswer(questionId: number): Promise<CommunityAnswer> {
    const communityAnswer = await this.answersRepository
      .createQueryBuilder()
      .select('answer')
      .addSelect('COUNT(*)', 'count')
      .where('questionId = :questionId', { questionId })
      .groupBy('answer')
      .orderBy('COUNT(*)', 'DESC')
      .limit(1)
      .getRawOne();

    const totalAnswers = await this.answersRepository.count({
      where: { question: { id: questionId } },
    });

    return {
      total: totalAnswers,
      answer: communityAnswer.answer,
      count: communityAnswer.count,
    };
  }
}
