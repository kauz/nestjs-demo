import { Module } from '@nestjs/common';
// import { RouterModule } from '@nestjs/core';
import { LoggerModule } from '@stockx/logging';
import { CoreModule } from '@root/core/core.module';
import config from '@root/config';
import { ShipmentsModule } from '@root/shipment/shipments.module';
import { LabelModule } from '@root/label/label.module';
import { TrackingModule } from '@root/tracking/tracking.module';
import { AddressModule } from '@root/address/address.module';
import { AppController } from './app.controller';

const modules = [
  LabelModule,
  AddressModule,
  ShipmentsModule,
  TrackingModule,
];

@Module({
  imports: [
    // RouterModule.register([
    //   {
    //     path: 'shipments/tracking',
    //     module: TrackingModule
    //   },
    //   {
    //     path: 'shipments',
    //     module: ShipmentsModule
    //   },
    //   {
    //     path: 'labels',
    //     module: LabelModule
    //   }
    // ]),
    LoggerModule.forRoot({
      env: config.get('app.env'),
      ...config.get('logging'),
    }),
    CoreModule,
    ...modules,
  ],
  controllers: [AppController],
})
export class AppModule {}
