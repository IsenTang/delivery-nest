import { Controller,Post,Body } from '@nestjs/common';
import * as _ from 'lodash';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { bsDecode } from '../../services/login';
import { Woops } from './../../tools/woops';

@Controller('user')
export class UserController {

    constructor (
        private readonly userService: UserService
    ) {}

    /* 登录 */
    @Post('login')
    async login (@Body() userLoginDto: UserLoginDto): Promise<object> {

        const username = await bsDecode(userLoginDto.username);
        const password = await bsDecode(userLoginDto.password);

        const user = (await this.userService.login({ username, password })).toObject();

        /* 生成token */
        const token = await this.userService.createToken(user);

        /* 加入token */
        _.set(user, 'token', token);

        return user;
    }

    /* 注册 */
    @Post('register')
    async register (@Body() userRegisterDto:UserRegisterDto): Promise<object>{

        /* 解码 */
        const username = await bsDecode(userRegisterDto.username);
        const password = await bsDecode(userRegisterDto.password);

        const isDuplicate = await this.userService.checkDuplicate({ username });

        if (isDuplicate) {

            throw new Woops('user-duplicate', 'user duplicate');
        }

        const user = await this.userService.register({ username,password });

        return user;
    }
}
