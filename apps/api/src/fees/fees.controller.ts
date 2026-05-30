import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeesService } from './fees.service';

@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Post('structure')
  async createFeeStructure(@Body() body: { name: string; amount: number; dueDate: string; term: string }) {
    return this.feesService.createFeeStructure({
      ...body,
      dueDate: new Date(body.dueDate),
    });
  }

  @Post('payment')
  async recordPayment(@Body() body: { studentId: string; feeStructureId: string; amountPaid: number; receiptNo: string }) {
    return this.feesService.recordPayment(body);
  }

  @Get('student/:studentId')
  async getStudentFees(@Param('studentId') studentId: string) {
    return this.feesService.getStudentFees(studentId);
  }
}
