import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, MockType } from '@stockx/common';
import { trackingUpdateV2Fixture } from '@test/fixtures';
import { TrackingControllerV2 } from '../tracking.controller.v2';
import { TrackingService } from '../tracking.service';

describe('TrackingController', () => {
  let controller: TrackingControllerV2;
  let trackingService: MockType<TrackingService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingControllerV2],
      providers: [
        { provide: TrackingService, useFactory: MockProxy }
      ],
    }).compile();

    controller = module.get<TrackingControllerV2>(TrackingControllerV2);
    trackingService = module.get(TrackingService);
  });

  describe('postTrackingUpdates', () => {
    it('should handle tracking updates', async () => {
      const res = await controller.postTrackingUpdates(trackingUpdateV2Fixture);
      expect(trackingService.handleTrackingUpdates).toBeCalledWith(trackingUpdateV2Fixture);
      expect(res).toEqual({ success: true });
    });
  });
});
