import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

describe('BookService', () => {
    let bookService;
    let bookRepository;

    const mockBookRepository = () => ({
        findBooks: jest.fn(),
        getBook: jest.fn(),
        addBook: jest.fn(),
        updateBook: jest.fn(),
        removeBook: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: BookRepository,
                    useFactory: mockBookRepository,
                },
            ],
        }).compile();

        bookService = await module.get<BookService>(BookService);
        bookRepository = await module.get<BookRepository>(BookRepository);
    });

    describe('findBooks', () => {
        it('should get all books', async () => {
            const mockBooks = [
                { title: 'JS for beginners', },
            ];

            bookRepository.findBooks.mockResolvedValue(mockBooks);

            const result = await bookService.findBooks();
            expect(result).toEqual(mockBooks);
            
            // Убедимся что была вызвана функция findBooks из репозитория
            expect(bookRepository.findBooks).toHaveBeenCalled();
        });
    });

    describe('getBook', () => {
        it('should get one books by id', async () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';
            const mockBook = { id: bookId, title: 'JS for beginners', };

            bookRepository.getBook.mockResolvedValue(mockBook);

            const result = await bookService.getBook(bookId);
            expect(result).toEqual(mockBook);

            // Убедимся что была вызвана функция getBook из репозитория
            expect(bookRepository.getBook).toHaveBeenCalledWith('1ef7db95-e856-49a7-97b6-6f874bc0107e');
        });

        it('throws an error as a book is not found', () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';

            bookRepository.getBook.mockResolvedValue(null);
            expect(bookService.getBook(bookId)).rejects.toThrow(NotFoundException);
        });
    });
});