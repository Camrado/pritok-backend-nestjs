import { createParamDecorator } from '@nestjs/common';

export const GetCustomer = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
})