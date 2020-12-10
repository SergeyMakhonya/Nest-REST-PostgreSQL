import { IsString } from 'class-validator';

export class AddBookDto {
    @IsString()
    title: string;
}