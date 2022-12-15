import { HttpStatus } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';

import { EXISTED_EMAIL } from './constants';

export class EmailExistedException extends BaseException {
  constructor() {
    super('Email has existed', HttpStatus.FORBIDDEN, EXISTED_EMAIL);
  }
}
