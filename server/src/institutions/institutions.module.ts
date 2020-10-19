import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institutions.entity';
import { InstitutionsResolver } from './institutions.resolver';
import { InstitutionsService } from './institutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  providers: [InstitutionsResolver, InstitutionsService],
})
export class InstitutionsModule {}
