import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity()
export class Reader extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Book, book => book.reader)
    @JoinTable()
    books: Book[];

    @Column({ type: 'varchar', length: '128' })
    title: string;
}