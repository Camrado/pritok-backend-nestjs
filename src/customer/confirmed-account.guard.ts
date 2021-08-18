import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmedAccountGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const customer = ctx.switchToHttp().getRequest().user;
    return customer.is_verified;
  }
}