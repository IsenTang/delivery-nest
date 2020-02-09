
import { Controller,Get,Param,UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantFindDto } from './dto/restaurant.find.dto';
import { UserService } from './../user/user.service';

/* guards */
import { AuthGuard } from './../../guards/auth.guard';

@Controller('restaurant')
export class RestaurantController {

    constructor (
        private readonly restaurantService: RestaurantService
    ) {}

    /* 获取附近地址 */
    @Get('location/:location')
    @UseGuards(AuthGuard)
    async find (@Param() restaurantFindDto: RestaurantFindDto): Promise<object> {

        const { location } = restaurantFindDto;

        const result = await this.restaurantService.getNearByRestaurant({ location });

        return result;
    }
}
