import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExaminationsService } from './examinations.service';

@Controller('examinations')
export class ExaminationsController {
  constructor(private readonly examinationsService: ExaminationsService) {}

  @Post()
  async createExamination(@Body() body: { name: string; term: string; startDate: string; endDate: string }) {
    return this.examinationsService.createExamination({
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    });
  }

  @Post('result')
  async recordResult(@Body() body: { examinationId: string; studentId: string; subject: string; marksObtained: number; totalMarks: number }) {
    return this.examinationsService.recordResult(body);
  }

  @Get('student/:studentId')
  async getStudentResults(@Param('studentId') studentId: string) {
    return this.examinationsService.getStudentResults(studentId);
  }
}
