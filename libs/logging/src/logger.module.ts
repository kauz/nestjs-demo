import { Global, Module } from '@nestjs/common';
import { StructuredLoggerPino } from './logger.service';
import { PinoLoggerConfig, LoggerOptions } from './logger.config';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(config?: LoggerOptions) {
    const configProvider = {
      provide: PinoLoggerConfig,
      useValue: new PinoLoggerConfig(config),
    };
    return {
      module: LoggerModule,
      providers: [
        configProvider,
        StructuredLoggerPino
      ],
      exports: [StructuredLoggerPino],
    };
  }
}
