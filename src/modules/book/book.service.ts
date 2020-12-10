import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { AddBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    async findOne(id: string): Promise<Book> {
        return await this.bookRepository.findOne(id);
    }

    async addOne(addBookDto: AddBookDto): Promise<void> {
        const newBook = await this.bookRepository.create(addBookDto);
        await this.bookRepository.save(newBook);
    }

    async updateOne(bookId: string, updateBookDto: UpdateBookDto): Promise<void> {
        await this.bookRepository.update(bookId, updateBookDto);
    }

    async removeOne(bookId: string): Promise<void> {
        await this.bookRepository.delete(bookId);
    }
}
