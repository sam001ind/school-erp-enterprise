import { Body, Controller, Post } from '@nestjs/common';
import { HostelService } from './hostel.service';

@Controller('hostel')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  @Post('room')
  async createRoom(@Body() body: any) {
    return this.hostelService.createRoom(body);
  }

  @Post('allocate')
  async allocateRoom(@Body() body: any) {
    return this.hostelService.allocateRoom(body);
  }
}
