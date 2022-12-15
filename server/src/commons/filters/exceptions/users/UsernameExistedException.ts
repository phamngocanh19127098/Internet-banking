import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { EXISTED_USERNAME } from './constants';

export class UsernameExistedException extends BaseException {
  constructor() {
    super('User has existed', HttpStatus.FORBIDDEN, EXISTED_USERNAME);
  }
}
