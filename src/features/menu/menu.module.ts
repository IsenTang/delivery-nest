import { CategorySchema } from './schema/category.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuSchema } from './schema/menu.schema';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: 'foods',
                useFactory: () => MenuSchema,
            },
            {
                name: 'categories',
                useFactory: () => CategorySchema,
            },
        ]),
        RestaurantModule
    ],
    controllers: [ MenuController ],
    providers: [ MenuService ]
})
export class MenuModule {}
