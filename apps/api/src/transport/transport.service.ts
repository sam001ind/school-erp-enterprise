import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransportService {
  constructor(private prisma: PrismaService) {}

  async createRoute(data: { routeName: string; driverName: string; vehicleNumber: string; capacity: number }) {
    return this.prisma.transportRoute.create({ data });
  }

  async allocateStudent(data: { routeId: string; studentId: string; pickupPoint: string }) {
    return this.prisma.transportAllocation.create({ data });
  }
}
