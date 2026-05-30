import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HostelService {
  constructor(private prisma: PrismaService) {}

  async createRoom(data: { roomNumber: string; capacity: number }) {
    return this.prisma.hostelRoom.create({ data });
  }

  async allocateRoom(data: { roomId: string; studentId: string }) {
    const room = await this.prisma.hostelRoom.findUnique({ where: { id: data.roomId } });
    if (!room || room.occupancy >= room.capacity) throw new Error('Room is full');

    await this.prisma.hostelRoom.update({
      where: { id: data.roomId },
      data: { occupancy: room.occupancy + 1 },
    });

    return this.prisma.hostelAllocation.create({ data });
  }
}
