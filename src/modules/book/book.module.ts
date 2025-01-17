import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookRepository]),
    ],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule { }
