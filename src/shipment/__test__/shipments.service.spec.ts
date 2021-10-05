import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy } from '@stockx/common';
import { LabelService } from '@root/label/label.service';
import { ShipmentsService } from '../shipments.service';

describe('ShipmentsService', () => {
  let service: ShipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentsService,
        { provide: LabelService, useFactory: MockProxy }
      ],
    }).compile();

    service = module.get<ShipmentsService>(ShipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
