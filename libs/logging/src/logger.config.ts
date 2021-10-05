import { randomUUID } from 'crypto';
import { LoggerOptions as PinoLoggerOptions } from 'pino';
import { Injectable } from '@nestjs/common';

export interface LoggerOptions extends PinoLoggerOptions {
  context?: string;
  timestamp?: boolean;
  env?: string;
  format?: string;
  app?: string;
  gitSha?: string;
}

const defaultOptions: LoggerOptions = {
  timestamp: false,
  level: process.env.STACKDRIVER_LOGGING === 'true' ? 'info' : 'debug',
  format: 'json',
  messageKey: 'message',
  prettyPrint: false,
  formatters: {
    log: (record) => {
      return {
        id: randomUUID(),
        created: new Date(),
        ...record,
      };
    },
    bindings: (binding) => {
      return binding;
    },
    level: (label ) => {
      return { level: label };
    },
  },
};

@Injectable()
export class PinoLoggerConfig {
  constructor(private readonly config: LoggerOptions = {}) {
    this.config = {
      ...defaultOptions,
      ...config,
    };
    this.setBase();
  }

  setBase() {
    this.config.base = {
      env: this.config.env,
      app: this.config.app || process.env.npm_package_name,
      ...(this.config.gitSha ? { 'git.sha': this.config.gitSha } : {})
    };
  }

  get(path?: string) {
    if (!path) return this.config;
    return this.config['path'];
  }

}
