import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExaminationsService {
  constructor(private prisma: PrismaService) {}

  async createExamination(data: { name: string; term: string; startDate: Date; endDate: Date }) {
    return this.prisma.examination.create({ data });
  }

  async recordResult(data: { examinationId: string; studentId: string; subject: string; marksObtained: number; totalMarks: number }) {
    const grade = this.calculateGrade(data.marksObtained, data.totalMarks);
    
    return this.prisma.examResult.create({
      data: {
        ...data,
        grade,
      },
    });
  }

  async getStudentResults(studentId: string) {
    return this.prisma.examResult.findMany({
      where: { studentId },
      include: { examination: true },
    });
  }

  private calculateGrade(marks: number, total: number): string {
    const percentage = (marks / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  }
}
