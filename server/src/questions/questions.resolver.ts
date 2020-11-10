import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { AnswersService } from 'src/answers/answers.service';
import { CommunityAnswer } from 'src/answers/dto/community-answer.dto';
import { Question } from './questions.entity';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly answersService: AnswersService) {}

  @ResolveField(() => CommunityAnswer)
  async communityAnswer(@Root() question: Question) {
    return this.answersService.communityAnswer(question.id);
  }
}
