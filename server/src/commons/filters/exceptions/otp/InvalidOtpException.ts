import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_OTP } from './constants';

export class InvalidOtpException extends BaseException {
    constructor() {
        super('Mã OTP của bạn không chính xác', HttpStatus.BAD_REQUEST, INVALID_OTP);
    }
}