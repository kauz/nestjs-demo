import { Test, TestingModule } from '@nestjs/testing';
import { KnexProvider } from '@stockx/nest-knex';
import { MockProxy } from '@stockx/common';
import { AddressService } from '../address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: KnexProvider, useFactory: MockProxy },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
