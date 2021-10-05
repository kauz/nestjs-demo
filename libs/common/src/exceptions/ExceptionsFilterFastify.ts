import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionsFilter } from './ExceptionsFilter';


/**
 * @example
 * app.useGlobalFilters(new HttpExceptionFilter());
 */
@Catch()
export class HttpExceptionFilterFastify extends ExceptionsFilter implements ExceptionFilter {
  readonly logger = new Logger('ExceptionsHandler');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<any>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = this.handleException(exception, request);

    response
      .status(status)
      .send(responseBody);
  }
}
