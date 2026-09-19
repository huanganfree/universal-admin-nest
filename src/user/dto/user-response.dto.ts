import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  nickname: string;
  @Expose()
  avatar: string;

  // 映射并拉平嵌套的 role.roleName
  @Expose()
  @Transform(({ obj }) => obj.role?.roleName ?? null)
  roleName: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
