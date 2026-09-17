import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Result } from '../common/result';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginAuthDto: LoginAuthDto) {
    // throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    const res = await this.prisma.user.findMany({
      where: {
        id: 1,
      },
    });
    return res;
  }
}
