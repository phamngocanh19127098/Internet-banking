import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_MSG } from './constants';

export class InvalidMessageException extends BaseException {
  constructor() {
    super('Gói tin không hợp lệ do ngân hàng chưa được liên kết hoặc đã bị chỉnh sửa.', HttpStatus.BAD_REQUEST, INVALID_MSG);
  }
}