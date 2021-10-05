import dotenv from 'dotenv';
import convict from 'convict';
import formats from 'convict-format-with-validator';

convict.addFormats({
  ...formats,
});

dotenv.config();

const config = convict({
  app: {
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'staging'],
      default: 'development',
      env: 'NODE_ENV',
    },
    host: {
      doc: 'The application url',
      format: 'url',
      default: '127.0.0.1',
      env: 'HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
    },
    version: {
      doc: 'Release version',
      format: String,
      default: undefined,
      env: 'RELEASE',
    },
  },
  logging: {
    format: {
      doc: 'Defines a format, that is used for logging across app',
      format: String,
      default: 'plain',
      env: 'LOGGING_FORMAT',
    },
    level: {
      doc: 'Minimal log output level',
      format: String,
      default: 'debug',
      env: 'LOGGING_LEVEL'
    },
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: 'ipaddress',
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database post',
      format: Number,
      default: 'localhost',
      env: 'DB_PORT',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'postgres',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      env: 'DB_PASS',
    },
  },
  sentry: {
    dsn: {
      doc: 'Data source name - tells the SDK where to send the events',
      format: String,
      default: undefined,
      env: 'SENTRY_DSN'
    }
  },
});

export default config;
