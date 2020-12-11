import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { AddBookDto, UpdateBookDto } from './dto';

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

            // Убедимся что функция findBooks из репозитория ранее не вызывалась
            expect(bookRepository.findBooks).not.toHaveBeenCalled();

            const result = await bookService.findBooks();
            expect(result).toEqual(mockBooks);

            // Убедимся что была вызвана функция findBooks из репозитория
            expect(bookRepository.findBooks).toHaveBeenCalled();
        });
    });

    describe('getBook', () => {
        // Должны получить книгу по id
        it('should get one books by id', async () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';
            const mockBook = { id: bookId, title: 'JS for beginners', };

            bookRepository.getBook.mockResolvedValue(mockBook);

            // Убедимся что функция getBook из репозитория ранее не вызывалась
            expect(bookRepository.getBook).not.toHaveBeenCalled();

            const result = await bookService.getBook(bookId);
            expect(result).toEqual(mockBook);

            // Убедимся что была вызвана функция getBook из репозитория
            expect(bookRepository.getBook).toHaveBeenCalledWith('1ef7db95-e856-49a7-97b6-6f874bc0107e');
        });

        // Должны получить ошибку, при попытке получить несуществующую книгу
        it('throws an error as a book is not found', () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';

            bookRepository.getBook.mockResolvedValue(null);
            expect(bookService.getBook(bookId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('createBook', () => {
        // Создаём книгу
        it('should add book', async () => {
            const addBookDto: AddBookDto = { title: 'JS for beginners' };

            // Убедимся что функция addBook из репозитория ранее не вызывалась
            expect(bookRepository.addBook).not.toHaveBeenCalled();

            await bookService.addBook(addBookDto);

            // Убедимся что была вызвана функция addBook из репозитория
            expect(bookRepository.addBook).toHaveBeenCalledWith(addBookDto);
        });

        // Должны получить ошибку при попытке получить несуществующую книгу
        it('throws an error as a book is not found', () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';

            bookRepository.getBook.mockResolvedValue(null);
            expect(bookService.getBook(bookId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateBook', () => {
        // Обновляем информацию о книге
        it('should update book', async () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';
            const mockBook = { id: bookId, title: 'JS for beginners', };
            bookRepository.getBook.mockResolvedValue(mockBook);

            const updateBookDto: UpdateBookDto = { title: 'TypeScript for beginners' };

            // Убедимся что функция updateBook из репозитория ранее не вызывалась
            expect(bookRepository.updateBook).not.toHaveBeenCalled();

            await bookService.updateBook(bookId, updateBookDto);

            // Убедимся что была вызвана функция updateBook из репозитория
            expect(bookRepository.updateBook).toHaveBeenCalledWith(bookId, updateBookDto);
        });
    });

    describe('deleteBook', () => {
        // Пробуем удалить книгу
        it('should remove book', async () => {
            const bookId = '1ef7db95-e856-49a7-97b6-6f874bc0107e';

            // Убедимся что функция removeBook из репозитория ранее не вызывалась
            expect(bookRepository.removeBook).not.toHaveBeenCalled();

            await bookService.removeBook(bookId);

            // Убедимся что была вызвана функция removeBook из репозитория
            expect(bookRepository.removeBook).toHaveBeenCalledWith(bookId);
        });
    });
});