import { Controller,Get, Post,Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserRegisteDto } from './dto/user.registe.dto';
import { bsDecode } from '../../services/login';

@Controller('user')
export class UserController {

    constructor (
        private readonly userService: UserService
    ) {}

    @Get('login')
    login (): string {

        return 'test';
    }

    @Post('register')
    async register (@Body() userRegisteDto:UserRegisteDto): Promise<User>{

        /* 解码 */
        const username = (userRegisteDto.username);
        const password = (userRegisteDto.password);

        const isDuplicate = await this.userService.checkDuplicate({ username });

        if (isDuplicate) {
            // throw new Woops('user duplicate', 'user duplicate');
        }

        const user = await this.userService.register({ username,password });

        return user;
    }
}
