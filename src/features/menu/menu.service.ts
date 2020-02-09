import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { canon, isOpen } from '../../tools/utils';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class MenuService {

    constructor (
        @InjectModel('foods') private readonly menuModel,
        @InjectModel('categories') private readonly categoryModel,
        private readonly restaurantService: RestaurantService
    ) {}

    async getMenu ({ restaurantId }): Promise<any>{

        const query = {
            'restaurant._id': canon(restaurantId),
        };

        /* 菜单，类别，餐馆信息 */
        const [
            food,
            categories,
            rest,
        ] = await Promise.all([
            this.menuModel.find(query).lean().exec(),
            this.categoryModel.find(query).lean().exec(),
            this.restaurantService.findRestaurant({ _id: canon(restaurantId) }),
        ]);

        /* 整合 */
        /* 食物是否在时间内可用 */
        // eslint-disable-next-line no-restricted-syntax
        for (const f of food) {
            /* Availability */
            // eslint-disable-next-line no-await-in-loop
            const isAvailable = await isOpen({ ent: f, tz: rest.timezone });

            /* Assign availability to food object */
            if (f.hours && !isAvailable) {
                f.available = false;
            }
        }

        /* 重新根据属性排列食物 */
        const sortedFood = _.orderBy(
            food,
            [ 'available', 'zscore', 'index' ],
            [ 'desc', 'desc', 'asc' ]
        );

        return { categories, foods: sortedFood };
    }
}
