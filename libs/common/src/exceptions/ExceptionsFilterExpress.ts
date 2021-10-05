import { Request, Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ExceptionsFilter } from './ExceptionsFilter';


/**
 * @example
 * app.useGlobalFilters(new HttpExceptionFilter());
 */
@Catch()
export class HttpExceptionFilterExpress extends ExceptionsFilter implements ExceptionFilter {
  readonly logger = new Logger('ExceptionsHandler', { timestamp: true });

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = this.handleException(exception, request);

    response
      .status(status)
      .json(responseBody);
  }
}
