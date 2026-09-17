import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessException } from '../common/exceptions/businessException';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginAuthDto: LoginAuthDto) {
    const res = await this.prisma.user.findMany({
      where: {
        id: 1,
      },
    });
    return res;
  }
}
