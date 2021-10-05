import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@stockx/validation/joi-validation.pipe';
import { createSchemaV2 } from '@root/shipment/schema/create-shipment.schema';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Controller('shipments')
@ApiTags('Shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createSchemaV2))
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentsService.update(+id, updateShipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentsService.remove(+id);
  }
}
