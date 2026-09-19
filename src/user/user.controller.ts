import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReqUser } from '../common/decorators/user.decorator';
import { type TokenPayloadInfo } from '../common/jwt/jwt.strategy';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  findByUserphone(@Body() { phone }: { phone: string }) {
    return this.userService.findByUserphone({ phone });
  }

  @Get('auth/userInfo')
  getUserInfo(@ReqUser('userId') userId: TokenPayloadInfo['userId']) {
    return this.userService.getUserInfo(userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
