import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class InstitutionsResolver {
  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
