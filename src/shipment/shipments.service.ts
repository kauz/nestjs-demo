import { Injectable } from '@nestjs/common';
import { LabelService } from '@root/label/label.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly labelService: LabelService
  ) {}

  create(createShipmentDto: CreateShipmentDto) {
    this.labelService.uploadToS3();
    return 'This action adds a new shipment';
  }

  findAll() {
    return 'This action returns all shipment';
  }

  findOne(id: number) {
    return 'This action returns a #${id} shipment';
  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}
