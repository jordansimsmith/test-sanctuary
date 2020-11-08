import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttemptsModule } from 'src/attempts/attempts.module';
import { FilesModule } from 'src/files/files.module';
import { Test } from './tests.entity';
import { TestsResolver } from './tests.resolver';
import { TestsService } from './tests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test]), FilesModule, AttemptsModule],
  providers: [TestsResolver, TestsService],
  exports: [TestsService],
})
export class TestsModule {}
