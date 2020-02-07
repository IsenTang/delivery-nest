import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: 'users',
                useFactory: () => UserSchema,
            },
        ]),
    ],
    controllers: [ UserController ],
    providers: [ UserService ]
})
export class UserModule {}
