import { AuthGuard } from './../../guards/auth.guard';
import { OrderListDto } from './dto/order.list.dto';
import { UserService } from './../user/user.service';
import { Woops } from './../../tools/woops';
import { Controller, Put, Body, Get, Param, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { OrderService } from './order.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { OrderPlaceOrderDto } from './dto/order.placeOrder.dto';
import { canon } from 'src/tools/utils';

@Controller('order')
export class OrderController {

    constructor (
        private readonly restaurantService: RestaurantService,
        private readonly userService: UserService,
        private readonly orderService: OrderService,
    ) {}

    /*
     * 下单
     */
    @Put()
    @UseGuards(AuthGuard)
    async placeOrder (@Body() orderPlaceOrderDto: OrderPlaceOrderDto): Promise<any>{

        const { restaurantId,userId,cart,payment } = orderPlaceOrderDto;

        const restaurant = await this.restaurantService.findRestaurant({ _id: canon(restaurantId) });

        const user = await this.userService.findUser({ id: canon(userId) });

        /* 如果不存在，下单失败 */
        if(_.isEmpty(user) || _.isEmpty(restaurant)){
            throw new Woops('Wrong-with-place-order', 'Something wrong with place order.');
        }

        /* 下单 */
        return await this.orderService.placeOrder({
            cart,
            payment,
            restaurant,
            user
        });
    }

    @Get('/:userId')
    @UseGuards(AuthGuard)
    async list (@Param() orderListDto: OrderListDto): Promise<any>{

        const { userId } = orderListDto;
        return await  this.orderService.getOrder(userId);
    }
}
