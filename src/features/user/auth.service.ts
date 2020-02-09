import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { canon } from '../../tools/utils';

@Injectable()
export class AuthService {

    constructor (@InjectModel('users') private readonly userModel ) {}

    /*
     * 验证用户登录
     */
    async validateUser ({ id }): Promise<boolean> {

        const result = await this.userModel.findOne({ _id: canon(id) });

        if(_.isEmpty(result)){
            return false;
        }
        return true;
    }
}