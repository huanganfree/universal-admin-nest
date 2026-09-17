import { HttpException } from '@nestjs/common';

export interface BusinessExceptionParams {
  msg: string;
  code?: number;
  httpStatus?: number;
}

export class BusinessException extends HttpException {
  constructor({ msg, code = 500, httpStatus = 200 }: BusinessExceptionParams) {
    // 关键点：把 { code, msg, data: null } 传给super
    super({ code, msg, data: null }, httpStatus);
  }
}
