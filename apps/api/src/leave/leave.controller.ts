import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { LeaveService } from './leave.service';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('apply')
  async applyForLeave(@Body() body: any) {
    return this.leaveService.applyForLeave({
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    });
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.leaveService.updateLeaveStatus(id, status);
  }
}
