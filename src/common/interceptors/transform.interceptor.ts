import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Result } from '../result';
import { Response } from 'express';
import dayjs from 'dayjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        // 强制将 HTTP 状态码改回 200（避免 POST 接口返回 201）
        response.status(200);
        // 如果 Controller 已经手动包装过 Result，直接返回
        if (data && typeof data === 'object' && 'code' in data && 'msg' in data) {
          return data;
        }
        // 自动统一包装为 { code: 200, msg: 'success', data }
        return Result.success(200, this.formatDate(data), undefined);
      }),
    );
  }

  // 递归遍历响应对象中的 Date 字段
  private formatDate(data: any): any {
    if (data === null || data === undefined) return data;

    // 处理 Date 对象或符合 ISO 格式的时间字符串
    if (data instanceof Date) {
      return dayjs(data).format('YYYY-MM-DD HH:mm:ss');
    }

    // 处理数组
    if (Array.isArray(data)) {
      return data.map((item) => this.formatDate(item));
    }

    // 处理 Object
    if (typeof data === 'object') {
      for (const key of Object.keys(data)) {
        // 如果字段值是 Date 或者是时间列名（如 createdAt, updatedAt），进行格式化
        data[key] = this.formatDate(data[key]);
      }
    }

    return data;
  }
}
