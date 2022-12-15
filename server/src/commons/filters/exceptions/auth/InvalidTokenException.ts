import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INVALID_TOKEN } from './constants';

export class InvalidTokenException extends BaseException {
  constructor() {
    super('Invalid Token.', HttpStatus.UNAUTHORIZED, INVALID_TOKEN);
  }
}
