import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);

  handleTrackingUpdates(data: any) {
    this.logger.log(JSON.stringify(data));
  }
}
