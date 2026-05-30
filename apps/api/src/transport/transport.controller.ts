import { Body, Controller, Post } from '@nestjs/common';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post('route')
  async createRoute(@Body() body: any) {
    return this.transportService.createRoute(body);
  }

  @Post('allocate')
  async allocateStudent(@Body() body: any) {
    return this.transportService.allocateStudent(body);
  }
}
