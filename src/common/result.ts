export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

export class Result {
  static success<T>(code = 200, data: T, msg = '成功'): ApiResponse<T> {
    return { code, msg, data };
  }

  static fail(code = 500, data: any = null, msg = '失败'): ApiResponse {
    return { code, msg, data };
  }
}
