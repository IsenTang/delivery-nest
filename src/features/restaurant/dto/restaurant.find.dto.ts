import { IsString, IsNotEmpty,Matches } from 'class-validator';

export class RestaurantFindDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/\d.+,\d.+/)
    readonly location: string
}