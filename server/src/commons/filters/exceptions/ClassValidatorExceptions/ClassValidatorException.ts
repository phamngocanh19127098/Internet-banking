import { HttpStatus, ValidationError } from '@nestjs/common';

import { BaseException } from 'src/commons/filters/exceptions/BaseException';
import { CLASS_VALIDATOR_ERROR } from './constants';

export class ClassValidatorException extends BaseException {
  constructor(errors: ValidationError[]) {
    const message = errors.reduce<string[]>((result, error) => {
      result.push(...Object.values(error.constraints));

      return result;
    }, []);

    super(message, HttpStatus.BAD_REQUEST, CLASS_VALIDATOR_ERROR);
  }
}
