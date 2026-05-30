import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeesService {
  constructor(private prisma: PrismaService) {}

  async createFeeStructure(data: { name: string; amount: number; dueDate: Date; term: string }) {
    return this.prisma.feeStructure.create({ data });
  }

  async recordPayment(data: { studentId: string; feeStructureId: string; amountPaid: number; receiptNo: string }) {
    // Basic logic: Determine status based on amountPaid vs total fee amount
    const fee = await this.prisma.feeStructure.findUnique({ where: { id: data.feeStructureId } });
    if (!fee) throw new Error('Fee Structure not found');

    const status = data.amountPaid >= fee.amount ? 'PAID' : 'PARTIAL';

    return this.prisma.feePayment.create({
      data: {
        ...data,
        status,
        paymentDate: new Date(),
      },
    });
  }

  async getStudentFees(studentId: string) {
    return this.prisma.feePayment.findMany({
      where: { studentId },
      include: { feeStructure: true },
    });
  }
}
