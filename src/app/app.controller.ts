import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('app')
export class AppController {

  @Get('/')
  @ApiTags('App')
  test() {
    throw new Error('asdas');
    return 'ok';
  }
}
