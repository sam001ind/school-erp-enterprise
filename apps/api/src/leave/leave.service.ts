import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async applyForLeave(data: { employeeId: string; leaveType: string; startDate: Date; endDate: Date; reason: string }) {
    return this.prisma.leaveRequest.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });
  }

  async updateLeaveStatus(id: string, status: string) {
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { status },
    });
  }
}
