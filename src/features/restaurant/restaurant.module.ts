
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { UserModule } from './../user/user.module';
import { RestaurantSchema } from './schema/restaurant.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: 'restaurants',
                useFactory: () => RestaurantSchema,
            },
        ]),
        UserModule
    ],
    controllers: [ RestaurantController ],
    providers: [ RestaurantService ]
})
export class RestaurantModule {}
