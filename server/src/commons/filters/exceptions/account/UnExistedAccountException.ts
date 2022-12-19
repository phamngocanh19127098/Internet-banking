import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { UNEXISTED_ACCOUNT } from './constants';

export class UnExistedAccountException extends BaseException {
    constructor() {
        super('Người dùng không có tài khoản thanh toán khả dụng', HttpStatus.BAD_REQUEST, UNEXISTED_ACCOUNT);
    }
}