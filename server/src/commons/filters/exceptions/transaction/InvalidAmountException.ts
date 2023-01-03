import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_AMOUNT } from './constants';

export class InvalidAmountException extends BaseException {
  constructor() {
    super('Số tiền trong tài khoản không đủ thực hiện giao dịch này', HttpStatus.BAD_REQUEST, INVALID_AMOUNT);
  }
}