import { Module } from '@nestjs/common';
import { InstitutionsResolver } from './institutions.resolver';

@Module({
  providers: [InstitutionsResolver],
})
export class InstitutionsModule {}
