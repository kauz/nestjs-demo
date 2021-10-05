import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpLoggingMiddleware } from '@stockx/logging';
import { NestKnexModule } from '@stockx/nest-knex';
import { dbConfig } from '@root/core/database';


@Module({
  imports: [NestKnexModule.forRoot(dbConfig)],
  providers: [],
  exports: [],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HttpLoggingMiddleware)
      .exclude(
        { path: 'api/v1/health', method: RequestMethod.GET },
      )
      .forRoutes('*');

    // .apply(AuthMiddleware)
    // .exclude(
    //   { path: 'api/v1/health', method: RequestMethod.GET },
    // )
    // .forRoutes('*');
  }
}
