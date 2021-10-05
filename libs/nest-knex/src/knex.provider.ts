import knex, { Knex } from 'knex';
import { Inject, Injectable } from '@nestjs/common';

interface KnexConfig {
  connection: {
    host: string;
    port: string;
    name: string;
    user: string;
    password: string;
  };
}

@Injectable()
export class KnexProvider {
  public readonly connection: any;
  constructor(
    @Inject('DB_CONFIG') config: KnexConfig
  ) {
    this.connection = knex(config);
  }
}
