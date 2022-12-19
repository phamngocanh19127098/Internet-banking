import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { UNEXISTED_TRANSACTION } from './constants';

export class UnExistedTransactionException extends BaseException {
    constructor() {
        super('Không tồn tại giao dịch này.', HttpStatus.BAD_REQUEST, UNEXISTED_TRANSACTION);
    }
}