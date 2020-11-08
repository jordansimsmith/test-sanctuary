import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessToken } from './interfaces/access-token.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AccessToken | null => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
