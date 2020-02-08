import { IsString, IsNotEmpty } from 'class-validator';

export class UserRegisteDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}