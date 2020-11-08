import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/tests/tests.entity';
import { Attempt } from './attempts.entity';
import { AttemptsResolver } from './attempts.resolver';
import { AttemptsService } from './attempts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt, Test])],
  providers: [AttemptsResolver, AttemptsService],
})
export class AttemptsModule {}
