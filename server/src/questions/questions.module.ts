import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from 'src/answers/answers.module';
import { Question } from './questions.entity';
import { QuestionsResolver } from './questions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), AnswersModule],
  providers: [QuestionsResolver],
})
export class QuestionsModule {}
