import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { AddBookDto, UpdateBookDto } from './dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    async findBooks(): Promise<Book[]> {
        return await this.find();
    }

    async getBook(id: string): Promise<Book> {
        return await this.findOne(id);
    }

    async addBook(addBookDto: AddBookDto): Promise<Book> {
        const newBook = await this.create(addBookDto);
        await this.save(newBook);
        return newBook;
    }

    async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<Book> {
        const {title} = updateBookDto;
        
        const book = await this.findOne(bookId);

        if (!book) {
            return null;
        }

        book.title = title;
        await this.save(book);

        return book;
    }

    async removeBook(bookId: string): Promise<void> {
        await this.delete(bookId);
    }
}
