import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Result } from '../common/result';
import { BusinessException } from '../common/exceptions/businessException';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInfo } from '../common/jwt/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByUserphone({ phone: loginAuthDto.phone });
    if (!user || user.password !== loginAuthDto.password) {
      throw new BusinessException({ msg: '账号或密码错误', code: 500, httpStatus: 500 });
    }

    const payload: TokenPayloadInfo = {
      userId: user.id.toString(),
      username: user.username,
      roleId: user.roleId,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
