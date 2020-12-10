import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reader } from './reader';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Reader, reader => reader.books)
    @JoinTable()
    reader: Reader;

    @Column({ type: 'varchar', length: '128' })
    title: string;
}