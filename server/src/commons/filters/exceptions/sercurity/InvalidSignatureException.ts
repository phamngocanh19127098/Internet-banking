import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_SIGNATURE } from './constants';

export class InvalidSignatureException extends BaseException {
  constructor() {
    super('Chữ ký không hợp lệ', HttpStatus.BAD_REQUEST, INVALID_SIGNATURE);
  }
}