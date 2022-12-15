import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_CREDENTIALS } from './constants';

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super('Invalid Credentials.', HttpStatus.UNAUTHORIZED, INVALID_CREDENTIALS);
  }
}
