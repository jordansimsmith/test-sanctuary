import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Attempt } from 'src/attempts/attempts.entity';
import { AttemptsService } from 'src/attempts/attempts.service';
import { CurrentUser } from 'src/auth/auth.decorator';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { AccessToken } from 'src/auth/interfaces/access-token.interface';
import { FilesService } from 'src/files/files.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';

@Resolver(() => Test)
export class TestsResolver {
  constructor(
    private readonly testsService: TestsService,
    private readonly filesService: FilesService,
    private readonly attemptsService: AttemptsService,
  ) {}

  @ResolveField(() => String)
  async testFileLink(@Root() test: Test) {
    return this.filesService.getDownloadLink(test.testFileKey);
  }

  @ResolveField(() => [Attempt])
  @UseGuards(GqlAuthGuard)
  async attempts(@Root() test: Test, @CurrentUser() user: AccessToken) {
    return this.attemptsService.findAllForTest(test.id, user.sub);
  }

  @ResolveField(() => Attempt, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async attempt(
    @Root() test: Test,
    @Args('id', { type: () => ID }) id: number,
    @CurrentUser() user: AccessToken,
  ) {
    return this.attemptsService.findOne(id, test.id, user.sub);
  }

  @Mutation(() => Test)
  @UseGuards(GqlAuthGuard)
  async createTest(
    @Args('input') input: CreateTestDto,
    @CurrentUser() user: AccessToken,
  ) {
    return this.testsService.create(input, user.sub);
  }
}
