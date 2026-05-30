import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async processPayroll(data: { employeeId: string; month: number; year: number; basicPay: number; allowances: number; deductions: number }) {
    const netPay = data.basicPay + data.allowances - data.deductions;
    return this.prisma.payroll.create({
      data: {
        ...data,
        netPay,
        status: 'PROCESSED',
      },
    });
  }

  async getEmployeePayroll(employeeId: string) {
    return this.prisma.payroll.findMany({
      where: { employeeId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }
}
