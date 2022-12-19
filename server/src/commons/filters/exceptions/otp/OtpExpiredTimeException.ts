import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { EXPIRED_TIME } from './constants';

export class OtpExpiredTimeException extends BaseException {
    constructor() {
        super('Mã OTP của bạn đã hết hạn', HttpStatus.BAD_REQUEST, EXPIRED_TIME);
    }
}