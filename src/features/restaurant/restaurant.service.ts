import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { intersects } from '../../services/restaurant';

@Injectable()
export class RestaurantService {

    constructor (@InjectModel('restaurants') private readonly restaurantModel ) {}

    async getNearByRestaurant ({ location }) {
        const intersectsLocation = await intersects(location);

        const query = {
            'delivery.zone.features.geometry': intersectsLocation,
            hours: { $exists: true },
            items: { $exists: true },
        };

        return await this.listRestaurant(query);

    }

    /* list */
    async listRestaurant (query): Promise<any>{

        return await this.restaurantModel.find(query).lean().exec();
    }

    /* one */
    async findRestaurant (query): Promise<any>{

        return await this.restaurantModel.findOne(query).lean().exec();
    }
}
