import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from './attempts.entity';
import { AttemptsResolver } from './attempts.resolver';
import { AttemptsService } from './attempts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt])],
  providers: [AttemptsResolver, AttemptsService],
})
export class AttemptsModule {}
