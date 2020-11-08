import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from './attempts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt])],
})
export class AttemptsModule {}
