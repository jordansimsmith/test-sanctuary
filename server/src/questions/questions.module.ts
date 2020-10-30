import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
})
export class QuestionsModule {}
