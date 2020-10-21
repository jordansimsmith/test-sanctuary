import { Args, ID, Query } from '@nestjs/graphql';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';

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
}
