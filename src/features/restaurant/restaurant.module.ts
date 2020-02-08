import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantSchema } from './schema/restaurant.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: 'restaurants',
                useFactory: () => RestaurantSchema,
            },
        ]),
    ],
    controllers: [ RestaurantController ],
    providers: [ RestaurantService ]
})
export class RestaurantModule {}
