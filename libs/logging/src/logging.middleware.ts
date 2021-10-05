import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { bytesToSize } from './utils';


@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private logger = new Logger(
    'HTTP',
  );

  use(request, response, next): void {
    const isCloudLoggingEnabled = process.env.STACKDRIVER_LOGGING === 'true';
    const { ip, method: requestMethod, protocol, originalUrl } = request;
    const start = process.hrtime();

    response.on('close', () => {
      const [seconds, nanoseconds] = process.hrtime(start);
      const diff = (seconds * 1e9 + nanoseconds) / 1e9;
      const { statusCode } = response;
      const userAgent = request.headers['user-agent'];
      const referer = request.headers['referer'];
      const host = request.headers['host'];
      const serverIp = request.connection.localAddress;
      const reqSize = request.connection.bytesRead - (request.connection[Symbol.for('_prevBytesRead')] || 0);
      const resSize = request.connection.bytesWritten - (request.connection[Symbol.for('_prevBytesWritten')] || 0);

      request.connection[Symbol.for('_prevBytesRead')] = request.connection.bytesRead;
      request.connection[Symbol.for('_prevBytesWritten')] = request.connection.bytesWritten;
      // https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#HttpRequest
      const message = isCloudLoggingEnabled
        ? {
          httpRequest: {
            userAgent,
            protocol,
            referer,
            serverIp,
            requestMethod,
            requestUrl: `${protocol}://${host}${originalUrl}`,
            status: statusCode,
            remoteIp: ip,
            requestSize: reqSize,
            responseSize: resSize,
            latency: `${diff}s`,
          },
        }
        : `${requestMethod} ${originalUrl} ${statusCode} - ${bytesToSize(resSize)}`;

      this.logger.debug(message);
    });

    next();
  }
}
