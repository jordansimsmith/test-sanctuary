import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/tests/tests.entity';
import { TestsModule } from 'src/tests/tests.module';
import { Institution } from './institutions.entity';
import { InstitutionsResolver } from './institutions.resolver';
import { InstitutionsService } from './institutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, Test]), TestsModule],
  providers: [InstitutionsResolver, InstitutionsService],
})
export class InstitutionsModule {}
