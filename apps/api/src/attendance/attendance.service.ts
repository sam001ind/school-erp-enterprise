import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async recordAttendance(data: { studentId: string; date: Date; status: string; remarks?: string }) {
    return this.prisma.attendance.create({
      data,
    });
  }

  async getAttendanceByStudent(studentId: string) {
    return this.prisma.attendance.findMany({
      where: { studentId },
      orderBy: { date: 'desc' },
    });
  }

  async getClassAttendance(date: Date) {
    // In a real scenario, this would filter by class/section.
    return this.prisma.attendance.findMany({
      where: { date },
      include: { student: true },
    });
  }
}
