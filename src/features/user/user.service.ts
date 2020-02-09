import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Woops } from './../../tools/woops';

/* tools */
import {  encrypte, sign, compare } from '../../services/login';

@Injectable()
export class UserService {

    constructor (@InjectModel('users') private readonly userModel ) {}

    /*
     * 登录
     */
    async login ({ password, username }) {

        const result = await this.userModel.findOne({ username });

        if (_.isEmpty(result)) {
            throw new Woops('No-user', 'No user');
        }

        const isMatch = await compare(password, result.password);

        if (isMatch) {
            return result;
        }
        throw new Woops('Password-uncorrected', 'Password uncorrected');
    }

    /*
     * 注册
     */
    async register ({ password, username }): Promise<object> {
        /* hash 密码 */
        const hash = await encrypte(password);

        const data = {
            username,
            password: hash,
            nickname: ''
        };

        const user = await this.userModel(data).save();

        return user;
    }

    /*
     * 用户是否重复
     */
    async checkDuplicate (query): Promise<boolean> {
        const result = await this.userModel.findOne(query);

        if (result) {
            return true;
        }
        return false;
    }

    /**
     * 生成token
     */
    async createToken (data): Promise<string> {
        const result = await sign(data);

        return result;
    }

}
