import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface TokenPayloadInfo {
  userId: string | number;
  username: string;
  roleId: bigint;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // 从请求头 Authorization: Bearer <token> 提取 Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false, // 拒绝已过期的 Token
      // secretOrKey: process.env.JWT_ACCESS_SECRET, // 与生成时的密钥一致
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
    });
  }

  // Token 解密并校验成功后自动触发，payload 即为解密后的数据
  async validate(payload: TokenPayloadInfo) {
    // 返回值会被 NestJS 自动挂载到 req.user 上
    return {
      userId: payload.userId,
      username: payload.username,
      roleId: payload.roleId,
    };
  }
}
