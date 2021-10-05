import 'reflect-metadata';
import { StructuredLoggerPino as Logger } from './logger.service';
import { HttpLoggingMiddleware } from './logging.middleware';
import { LoggerModule } from './logger.module';
import { bytesToSize } from './utils';

export {
  bytesToSize,
  Logger,
  LoggerModule,
  HttpLoggingMiddleware,
};
