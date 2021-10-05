import pino from 'pino';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { isString } from '@nestjs/common/utils/shared.utils';
import { LOG_FORMATS, LOGGER_LEVEL } from './constants';
import { PinoLoggerConfig } from './logger.config';


@Injectable()
export class StructuredLoggerPino extends ConsoleLogger {

  private readonly pino: pino.Logger;
  protected readonly options: any;

  constructor(
    private readonly config?: PinoLoggerConfig,
  ) {
    super(config.get('context'), { timestamp: config.get('timestamp') });
    this.options = config.get();
    this.pino = pino(this.options);
    super.setLogLevels([this.options.level]);
  }

  debug(message, context?) {
    if (this.isPlainFormat()) {
      return super.debug(message, context);
    }
    if (context) {
      return this.pino.child({ context }).debug(message);
    }
    this.pino.debug(message);
  }

  log(message, context?) {
    if (this.isPlainFormat()) {
      return super.log(message, context);
    }
    if (context) {
      this.pino.child({ context }).info(message);
      return;
    }
    this.pino.info(message);
  };

  verbose(message, context?) {
    if (this.isPlainFormat()) {
      return super.verbose(message, context);
    }
    if (context) {
      return this.pino.child({ context }).debug(message);
    }
    this.pino.debug(message);
  };

  warn(message, context?) {
    if (this.isPlainFormat()) {
      return super.warn(message, context);
    }
    if (context) {
      return this.pino.child({ context }).warn(message);
    }
    this.pino.warn(message);
  };

  error(messageOrError: any, context?: string) {
    const message = isString(messageOrError) ? messageOrError : messageOrError.toString();
    if (this.isPlainFormat()) {
      return super.error(message, messageOrError.stack, context);
    }
    const error = {
      exception: {
        message,
        stack: messageOrError.stack,
      },
    };
    if (context) {
      return this.pino.child({ context }).error(error);
    }
    this.pino.error(error);
  };

  private isPlainFormat() {
    return this.options.format === LOG_FORMATS.Plain;
  }
}
