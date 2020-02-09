import { Module,Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserSchema } from './schema/user.schema';
@Global()
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
    providers: [ UserService,AuthService ],
    exports: [ AuthService ],
})
export class UserModule {}
