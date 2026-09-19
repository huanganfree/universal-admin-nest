import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 全局修复 BigInt 无法序列化为 JSON 的问题
(BigInt.prototype as any).toJSON = function () {
  return this.toString(); // 转成字符串，防止前端大数精度丢失
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置统一前缀，/api
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 核心配置：开启自动类型转换（把 string 自动转成 DTO 声明的类型）
      whitelist: true, // 建议顺便开启：自动过滤掉 DTO 中未声明的非安全属性
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log('process.env.NODE_ENV==', process.env.NODE_ENV);
}

bootstrap();
