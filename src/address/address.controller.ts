import { Controller, Get } from '@nestjs/common';
import { AddressService } from '@root/address/address.service';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {
  }

  @Get('')
  getAddresses() {
    return this.addressService.getAddresses();
  }
}
