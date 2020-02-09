import { IsString, IsNotEmpty } from 'class-validator';

export class OrderPlaceOrderDto {

    @IsString()
    @IsNotEmpty()
    readonly payment: string

    @IsNotEmpty()
    readonly cart: object[]

    @IsString()
    @IsNotEmpty()
    readonly userId: string

    @IsString()
    @IsNotEmpty()
    readonly restaurantId: string
}