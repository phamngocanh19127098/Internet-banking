import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH } from './constants';

export class PasswordAndConfirmPasswordNotMatchException extends BaseException {
  constructor() {
    super(
      'New password not match old one.',
      HttpStatus.UNAUTHORIZED,
      PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH,
    );
  }
}
