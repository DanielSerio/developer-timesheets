import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Mockable = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const url = new URL(request.url);

    return url.searchParams.get('mock') !== null;
  },
);