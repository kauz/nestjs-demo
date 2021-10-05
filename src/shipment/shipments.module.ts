import { Module } from '@nestjs/common';
import { LabelModule } from '@root/label/label.module';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';

@Module({
  imports: [LabelModule],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  exports: [ShipmentsService]
})
export class ShipmentsModule {}
