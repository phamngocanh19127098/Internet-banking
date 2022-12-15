import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { UNEXISTING_USER } from './constants';

export class UserUnexistingException extends BaseException {
  constructor() {
    super('User does not exist', HttpStatus.NOT_FOUND, UNEXISTING_USER);
  }
}
