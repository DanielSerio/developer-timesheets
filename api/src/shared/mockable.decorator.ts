import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Mockable = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    console.warn(request.url);
    const url = new URL(`http://localhost:3000${request.url}`);

    return url.searchParams.get('mock') !== null;
  },
);