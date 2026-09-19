import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayloadInfo } from '../jwt/jwt.strategy';

export const ReqUser = createParamDecorator((data: keyof TokenPayloadInfo, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user;

  return data ? user?.[data] : user;
});
