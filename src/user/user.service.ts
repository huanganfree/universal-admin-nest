import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserphone({ phone }: { phone: string }) {
    return this.prisma.user.findFirst({
      where: {
        phone: phone,
      },
    });
  }

  async getUserInfo(userId: string | number) {
    const user = await this.prisma.user.findFirst({
      include: {
        role: { select: { roleName: true } },
      },
      where: {
        id: Number(userId),
      },
    });

    return user ? new UserResponseDto(user) : null;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
