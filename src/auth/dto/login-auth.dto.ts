import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAuthDto {
  @IsString({ message: '账号必须为字符串' })
  @IsNotEmpty({ message: '账号不能为空' })
  // 自动去除前后空格并转为小写（防止用户误输入空格或大小写不匹配）
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  phone: string;

  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
