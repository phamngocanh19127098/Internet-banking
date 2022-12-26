import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { MSG_EXPIRED_TIME } from './constants';

export class MessageExpiredTimeException extends BaseException {
  constructor() {
    super('Lời gọi này là thông tin cũ đã quá hạn', HttpStatus.BAD_REQUEST, MSG_EXPIRED_TIME);
  }
}