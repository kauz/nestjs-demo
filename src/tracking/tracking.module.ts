import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingControllerV2 } from './tracking.controller.v2';

@Module({
  controllers: [TrackingControllerV2],
  providers: [TrackingService]
})
export class TrackingModule {}
