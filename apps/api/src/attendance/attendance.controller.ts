import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async recordAttendance(@Body() body: { studentId: string; date: string; status: string; remarks?: string }) {
    return this.attendanceService.recordAttendance({
      ...body,
      date: new Date(body.date),
    });
  }

  @Get('student/:studentId')
  async getStudentAttendance(@Param('studentId') studentId: string) {
    return this.attendanceService.getAttendanceByStudent(studentId);
  }

  @Get('date')
  async getClassAttendance(@Query('date') date: string) {
    return this.attendanceService.getClassAttendance(new Date(date));
  }
}
