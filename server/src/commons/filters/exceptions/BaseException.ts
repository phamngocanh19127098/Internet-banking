import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string | string[], status: number, code: number) {
    super(message, status);
    this.code = code;
  }

  code: number;
}
