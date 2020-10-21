import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Institution } from './institutions.entity';
import { InstitutionsService } from './institutions.service';

@Resolver()
export class InstitutionsResolver {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Query(() => [Institution])
  async institutions() {
    return this.institutionsService.findAll();
  }

  @Query(() => Institution, { nullable: true })
  async institution(@Args('id', { type: () => ID }) id: string) {
    return this.institutionsService.findOne(id);
  }

  @Mutation(() => Institution)
  async createInstitution(@Args('input') input: CreateInstitutionDto) {
    return this.institutionsService.create(input);
  }
}
