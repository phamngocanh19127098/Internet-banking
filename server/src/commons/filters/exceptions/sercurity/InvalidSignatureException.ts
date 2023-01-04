import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_SIGNATURE } from './constants';

export class InvalidSignatureException extends BaseException {
  constructor(msg: string = 'Chữ ký không hợp lệ') {
    super(msg, HttpStatus.BAD_REQUEST, INVALID_SIGNATURE);
  }
}