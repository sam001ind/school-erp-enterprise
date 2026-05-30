import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('process')
  async processPayroll(@Body() body: any) {
    return this.payrollService.processPayroll(body);
  }

  @Get('employee/:id')
  async getEmployeePayroll(@Param('id') employeeId: string) {
    return this.payrollService.getEmployeePayroll(employeeId);
  }
}
