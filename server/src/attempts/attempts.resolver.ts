import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorator';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { AccessToken } from 'src/auth/interfaces/access-token.interface';
import { Attempt } from './attempts.entity';
import { AttemptsService } from './attempts.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Resolver()
export class AttemptsResolver {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Mutation(() => Attempt)
  @UseGuards(GqlAuthGuard)
  async createAttempt(
    @Args('input') input: CreateAttemptDto,
    @CurrentUser() user: AccessToken,
  ) {
    return this.attemptsService.create(input, user.sub);
  }
}
