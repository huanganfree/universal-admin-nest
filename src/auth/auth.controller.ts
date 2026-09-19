import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { NoJwtDeco } from '../common/decorators/noJwt.decorator';

@Controller('auth')
export class AuthController {
  // controller要用service，依赖注入

  constructor(private readonly authService: AuthService) {}

  @NoJwtDeco()
  @Post('login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
