import { canon } from 'src/tools/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {

    constructor (
        @InjectModel('orders') private readonly orderModel
    ) {}

    /*
     * 下单
     */
    async placeOrder (data): Promise<any>{

        return await this.orderModel(data).save();
    }

    /*
     * 查找个人订单
     */
    async getOrder (userId): Promise<any>{

        return await this.orderModel.find({ 'user._id': canon(userId) }).lean();
    }

}
