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

  await app.listen(process.env.PORT ?? 3000);

  console.log('process.env.NODE_ENV==', process.env.NODE_ENV);
}

bootstrap();
