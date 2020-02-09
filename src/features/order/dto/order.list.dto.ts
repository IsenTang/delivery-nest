import { IsString, IsNotEmpty } from 'class-validator';

export class OrderListDto {
    @IsNotEmpty()
    @IsString()
    readonly userId: string;
}