import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  async addBook(data: { isbn: string; title: string; author: string; totalCopies: number }) {
    return this.prisma.book.create({
      data: {
        ...data,
        availableCopies: data.totalCopies,
      },
    });
  }

  async issueBook(bookId: string, userId: string, dueDate: Date) {
    // Basic logic without transaction for simplicity
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book || book.availableCopies <= 0) throw new Error('Book not available');

    await this.prisma.book.update({
      where: { id: bookId },
      data: { availableCopies: book.availableCopies - 1 },
    });

    return this.prisma.circulation.create({
      data: {
        bookId,
        userId,
        dueDate,
        status: 'ISSUED',
      },
    });
  }
}
