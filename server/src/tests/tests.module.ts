import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './tests.entity';
import { TestsResolver } from './tests.resolver';
import { TestsService } from './tests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [TestsResolver, TestsService],
})
export class TestsModule {}
