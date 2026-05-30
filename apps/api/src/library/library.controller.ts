import { Body, Controller, Post } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('books')
  async addBook(@Body() body: any) {
    return this.libraryService.addBook(body);
  }

  @Post('issue')
  async issueBook(@Body() body: { bookId: string; userId: string; dueDate: string }) {
    return this.libraryService.issueBook(body.bookId, body.userId, new Date(body.dueDate));
  }
}
