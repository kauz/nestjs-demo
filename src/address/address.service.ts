import { Injectable } from '@nestjs/common';
import { KnexProvider } from '@stockx/nest-knex';

@Injectable()
export class AddressService {
  private readonly tableName = 'addresses';

  constructor(
    private readonly knex: KnexProvider
  ) {}

  getAddresses(): any {
    return this.knex.connection.select('*').from(this.tableName);
  }
}
