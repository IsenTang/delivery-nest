import { IsString, IsNotEmpty } from 'class-validator';

export class MenuListDto {

    @IsString()
    @IsNotEmpty()
    readonly restaurantId: string
}