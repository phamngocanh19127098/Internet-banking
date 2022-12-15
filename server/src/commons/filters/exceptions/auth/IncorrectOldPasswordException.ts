import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { INCORRECT_OLD_PASSWORD } from './constants';

export class IncorrectOldPasswordException extends BaseException {
  constructor() {
    super(
      'Old password is incorrect',
      HttpStatus.UNAUTHORIZED,
      INCORRECT_OLD_PASSWORD,
    );
  }
}
