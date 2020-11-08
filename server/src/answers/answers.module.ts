import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswersModule {}
