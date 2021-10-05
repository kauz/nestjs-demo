import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpExceptionFilterFastify } from '@stockx/common';
import { StructuredLoggerPino } from '@stockx/logging/logger.service';
import config from '@root/config';
import { AppModule } from '@root/app/app.module';
import { contentSecurityPolicy } from '@root/core/swagger';

async function bootstrap() {
  const env = config.get('app.env');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true }
  );
  const logger = app.get(StructuredLoggerPino);

  app.useLogger(logger);
  app.use(helmet({ contentSecurityPolicy }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalFilters(new HttpExceptionFilterFastify());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: env === 'production',
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (env !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      .setDescription(process.env.npm_package_description)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/doc', app, document);
  }

  await app.listen(config.get('app.port'), config.get('app.host'), () => {
    logger.verbose(
      `Server started on ${config.get('app.host')}:${config.get(
        'app.port',
      )}, env: ${env}`,
      'App',
    );
  });
}

process.nextTick(bootstrap);
