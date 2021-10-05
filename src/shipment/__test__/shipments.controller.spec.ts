import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy } from '@stockx/common';
import { ShipmentsController } from '../shipments.controller';
import { ShipmentsService } from '../shipments.service';

describe('ShipmentsController', () => {
  let controller: ShipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentsController],
      providers: [
        { provide: ShipmentsService, useFactory: MockProxy }
      ],
    }).compile();

    controller = module.get<ShipmentsController>(ShipmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
