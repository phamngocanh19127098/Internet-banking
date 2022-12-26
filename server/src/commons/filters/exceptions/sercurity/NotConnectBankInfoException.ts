import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { NOT_CONNECT_BANK } from './constants';

export class NotConnectBankInfoException extends BaseException {
  constructor() {
    super('Không tìm thấy thông tin của ngân hàng liên kết', HttpStatus.BAD_REQUEST, NOT_CONNECT_BANK);
  }
}