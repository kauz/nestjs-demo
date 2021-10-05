import { Global, Module } from '@nestjs/common';
import { KnexProvider } from './knex.provider';

@Global()
@Module({
  providers: [KnexProvider],
  exports: [KnexProvider],
})
export class NestKnexModule {
  static forRoot(config?: any) {
    return {
      module: NestKnexModule,
      providers: [
        { provide: 'DB_CONFIG', useValue: config },
        KnexProvider
      ],
      exports: [KnexProvider],
    };
  }
}
