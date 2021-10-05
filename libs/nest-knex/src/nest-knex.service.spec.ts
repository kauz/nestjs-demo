import { Test, TestingModule } from '@nestjs/testing';
import { KnexProvider } from './knex.provider';

describe('NestKnexService', () => {
  let service: KnexProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnexProvider],
    }).compile();

    service = module.get<KnexProvider>(KnexProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
