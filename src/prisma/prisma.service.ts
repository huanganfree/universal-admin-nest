import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    //  创建数据库连接池
    const adapter = new PrismaMariaDb({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionLimit: 20,
      connectTimeout: 10000,
    });
    // 将 adapter 传给 PrismaClient 构造函数
    super({ adapter });
  }
  async onModuleInit() {
    // 模块初始化时建立数据库连接
    await this.$connect();
  }

  async onModuleDestroy() {
    // 模块销毁/应用关闭时断开连接
    await this.$disconnect();
  }
}
