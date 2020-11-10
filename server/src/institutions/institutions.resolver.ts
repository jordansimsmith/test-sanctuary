import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorator';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { AccessToken } from 'src/auth/interfaces/access-token.interface';
import { Test } from 'src/tests/tests.entity';
import { TestsService } from 'src/tests/tests.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Institution } from './institutions.entity';
import { InstitutionsService } from './institutions.service';

@Resolver(() => Institution)
export class InstitutionsResolver {
  constructor(
    private readonly institutionsService: InstitutionsService,
    private readonly testsService: TestsService,
  ) {}

  @Query(() => [Institution])
  async institutions() {
    return this.institutionsService.findAll();
  }

  @Query(() => Institution, { nullable: true })
  async institution(@Args('id', { type: () => ID }) id: string) {
    return this.institutionsService.findOne(id);
  }

  @ResolveField(() => Test, { nullable: true })
  async test(
    @Root() institution: Institution,
    @Args('id', { type: () => ID }) id: number,
  ) {
    return this.testsService.findOne(id, institution.id);
  }

  @Mutation(() => Institution)
  @UseGuards(GqlAuthGuard)
  async createInstitution(
    @Args('input') input: CreateInstitutionDto,
    @CurrentUser() user: AccessToken,
  ) {
    return this.institutionsService.create(input, user.sub);
  }
}
