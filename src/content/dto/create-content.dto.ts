import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ContentStatus } from '../../generated/prisma/enums';

export class PageQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 10; // 每页条数，默认 10

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status: string = 'draft,published,offline';
}

export class CreateContentDto {}
