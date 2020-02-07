import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UserRegisteDto {
    @IsNotEmpty()
    readonly username: string;

    @IsEmpty()
    readonly password: string;
}