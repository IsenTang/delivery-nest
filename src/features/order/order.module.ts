import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schema/order.schema';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: 'orders',
                useFactory: () => OrderSchema,
            },
        ]),
        RestaurantModule
    ],
    controllers: [ OrderController ],
    providers: [ OrderService ]
})
export class OrderModule {}
