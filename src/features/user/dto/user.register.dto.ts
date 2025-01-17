import { IsString, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}