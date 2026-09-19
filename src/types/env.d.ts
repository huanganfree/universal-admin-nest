declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // 在这里定义你项目中所有的环境变量及其类型
      NODE_ENV: 'development' | 'production' | 'test';
      DB_PORT?: number;
      DATABASE_URL: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_ACCESS_SECRET: string;

      // JWT 或其他业务配置（可根据需要自行扩展）
      JWT_SECRET?: string;
      JWT_EXPIRES_IN?: string;
    }
  }
}

// 必须包含此导出语句，将该文件标识为一个模块
export {};
