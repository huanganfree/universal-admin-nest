import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let code = HttpStatus.INTERNAL_SERVER_ERROR; // 默认 500
    let msg = '服务器内部错误';
    let data = null;
    let statusCode = 500;

    // 1. 所有主动 throw 的 HttpException（内置 400/404 或自定义 2002 业务错误）
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, any>;
        // 如果传了自定义 code 就用自定义的（如 2002），没有就用 HTTP 状态码（如 400, 404）
        code = resObj['code'] || resObj['statusCode'] || code;

        // 兼容 class-validator 的数组报错和普通 msg
        const rawMsg = resObj['msg'] ?? resObj['message'];
        msg = Array.isArray(rawMsg) ? rawMsg[0] : (rawMsg ?? msg);
        data = resObj['data'] ?? null;
      } else if (typeof res === 'string') {
        msg = res;
      }
    }
    // 2. 其他所有未知异常（如 JS 语法报错、Prisma 报错、数据库连接中断等）
    else if (exception instanceof Error) {
      this.logger.error(`[UncaughtException] ${exception.message}`, exception.stack);
      // 生产环境隐藏敏感报错，开发环境打印真实错误
      msg = process.env.NODE_ENV === 'production' ? '服务器开小差了，请稍后再试' : exception.message;
    }

    response.status(statusCode).json({
      code,
      msg,
      data,
    });
  }
}
