import { Controller,Get,Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantFindDto } from './dto/restaurant.find.dto';

@Controller('restaurant')
export class RestaurantController {

    constructor (
        private readonly restaurantService: RestaurantService
    ) {}

    /* 获取附近地址 */
    @Get('location/:location')
    async find (@Param() restaurantFindDto: RestaurantFindDto): Promise<object> {

        const { location } = restaurantFindDto;

        const result = await this.restaurantService.getNearByRestaurant({ location });

        return result;
    }
}
