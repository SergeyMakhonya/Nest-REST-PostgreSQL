import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { AddBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    // Получить все книги из библиотеки
    @Get()
    async findAll() {
        return await this.bookService.findBooks();
    }

    // Получить одну книгу из библиотеки по ID
    @Get(':id')
    async findOne(@Param('id') bookId: string) {
        return await this.bookService.getBook(bookId);
    }

    // Добавить новую книгу в библиотеку
    @Post()
    async addOne(@Body() addBookDto: AddBookDto) {
        return await this.bookService.addBook(addBookDto);
    }

    // Обновить название у книги по ID
    @Put(':id')
    async updateOne(
        @Param('id') bookId: string,
        @Body() updateBookDto: UpdateBookDto,
    ) {
        return await this.bookService.updateBook(bookId, updateBookDto);
    }

    // Удалить книгу из библиотеки по ID
    @Delete(':id')
    async removeOne(@Param('id') bookId: string) {
        await this.bookService.removeBook(bookId);
    }
}
