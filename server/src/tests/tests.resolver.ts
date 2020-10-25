import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';

@Resolver()
export class TestsResolver {
  constructor(private readonly testsService: TestsService) {}

  @Mutation(() => Test)
  async createTest(@Args('input') input: CreateTestDto) {
    return this.testsService.create(input);
  }
}
