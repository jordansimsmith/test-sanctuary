import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';

@Resolver()
export class TestsResolver {
  constructor(private readonly testsService: TestsService) {}

  @Query(() => [Test])
  async tests() {
    return this.testsService.findAll();
  }

  @Query(() => Test, { nullable: true })
  async test(@Args('id', { type: () => ID }) id: number) {
    return this.testsService.findOne(id);
  }

  @Mutation(() => Test)
  async createTest(@Args('input') input: CreateTestDto) {
    return this.testsService.create(input);
  }
}
