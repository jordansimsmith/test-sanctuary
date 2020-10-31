import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { Test } from './tests.entity';
import { TestsResolver } from './tests.resolver';
import { TestsService } from './tests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test]), FilesModule],
  providers: [TestsResolver, TestsService],
  exports: [TestsService],
})
export class TestsModule {}
