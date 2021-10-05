import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export abstract class ExceptionsFilter {
  abstract logger: Logger;

  handleException(exception: any, request: any) {
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception?.response?.rpcStack) {
      exception.stack += exception.response.rpcStack.split('\n').join('\n    ');
    }
    const defaultResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.response?.message || exception.message,
      code: exception?.response?.code || exception.code,
      attachments: exception?.response?.attachments || exception.attachments
    };

    const responseBody = process.env.NODE_ENV === 'production'
      ? defaultResponse
      : {
        ...exception,
        stack: exception.stack,
        ...defaultResponse
      };

    if (exception instanceof HttpException) {
      responseBody['response'] = undefined;
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    return responseBody;
  }
}
