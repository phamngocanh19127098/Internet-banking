import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { FAIL_LOGIN } from './constants';

export class FailLoginException extends BaseException {
  constructor() {
    super(
      'Username or password is incorrect',
      HttpStatus.UNAUTHORIZED,
      FAIL_LOGIN,
    );
  }
}
