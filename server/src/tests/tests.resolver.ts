import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { FilesService } from 'src/files/files.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';

@Resolver(() => Test)
export class TestsResolver {
  constructor(
    private readonly testsService: TestsService,
    private readonly filesService: FilesService,
  ) {}

  @ResolveField(() => String)
  async testFileLink(@Root() test: Test) {
    return this.filesService.getDownloadLink(test.testFileKey);
  }

  @Mutation(() => Test)
  async createTest(@Args('input') input: CreateTestDto) {
    return this.testsService.create(input);
  }
}
