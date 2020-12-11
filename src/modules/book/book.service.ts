import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { AddBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookRepository)
        private bookRepository: BookRepository,
    ) { }

    async findBooks(): Promise<Book[]> {
        return await this.bookRepository.findBooks();
    }

    async getBook(bookId: string): Promise<Book> {
        const book = await this.bookRepository.getBook(bookId);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    async addBook(addBookDto: AddBookDto): Promise<void> {
        await this.bookRepository.addBook(addBookDto);
    }

    async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<void> {
        const book = await this.bookRepository.getBook(bookId);

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        await this.bookRepository.updateBook(bookId, updateBookDto);
    }

    async removeBook(bookId: string): Promise<void> {
        await this.bookRepository.removeBook(bookId);
    }
}
