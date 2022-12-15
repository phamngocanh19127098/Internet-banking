/* eslint-disable no-console */
import { Catch, HttpStatus, HttpException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';

import { INTERNAL_SERVER_ERROR, TYPE_ORM_ERROR } from './constants';
import { BaseException } from './exceptions/BaseException';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal Server Error';
    let code = INTERNAL_SERVER_ERROR;

    const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof BaseException) {
      const responseException = JSON.parse(
        JSON.stringify(exception.getResponse()),
      );

      statusCode = exception.getStatus();
      code = exception.code;
      message = responseException;
    } else if (exception instanceof HttpException) {
      const responseException = JSON.parse(
        JSON.stringify(exception.getResponse()),
      );

      statusCode = responseException.statusCode;

      if (typeof responseException.message === 'object') {
        message = responseException.message[0];
      } else {
        message = responseException.message;
      }
    } else if (exception instanceof QueryFailedError) {
      code = TYPE_ORM_ERROR;
      message = exception.message;
      console.log(exception);
    } else {
      console.log(exception);
    }

    const responseBody = {
      error: {
        statusCode,
        code,
        message,
      },
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
