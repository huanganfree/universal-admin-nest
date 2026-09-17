import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Result } from '../result';
import { Response } from 'express';

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
        return Result.success(200, data, undefined);
      }),
    );
  }
}
