import { Body, Controller, Put } from '@nestjs/common';
import { UpdateTrackingV2Dto } from '@root/tracking/dtos/update-tracking-v2.dto';
import { TrackingService } from './tracking.service';

@Controller({
  version: '2',
  path: 'shipments/tracking'
})
export class TrackingControllerV2 {
  constructor(private readonly trackingService: TrackingService) {}

  @Put('/webhook')
  async postTrackingUpdates(@Body() trackingUpdates: UpdateTrackingV2Dto) {
    await this.trackingService.handleTrackingUpdates(trackingUpdates);
    return { success: true };
  }
}
