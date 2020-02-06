import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
