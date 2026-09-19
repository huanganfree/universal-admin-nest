// src/common/guards/jwt-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NO_JWT } from '../decorators/noJwt.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 检查 Controller 方法或类上是否有标记
    const isNoJwt = this.reflector.getAllAndOverride<boolean>(NO_JWT, [context.getHandler(), context.getClass()]);

    // 如果标记了 @NoJwtDeco()，直接跳过 JWT 校验放行
    if (isNoJwt) {
      return true;
    }

    // 否则执行 passport-jwt 的标准校验逻辑
    return super.canActivate(context);
  }
}
