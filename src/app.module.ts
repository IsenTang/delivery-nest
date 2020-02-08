import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* config module */
import { ConfigModule,ConfigService } from '@nestjs/config';
import configSetting from './config.setting';

/* user module */
import { UserModule } from './features/user/user.module';
import { RestaurantModule } from './features/restaurant/restaurant.module';

@Module({
    imports: [
        ConfigModule.forRoot(configSetting),
        MongooseModule.forRootAsync({
            imports: [ ConfigModule ],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGODB_URI'),
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            inject: [ ConfigService ],
        }),
        UserModule,
        RestaurantModule
    ]
})
export class AppModule {}
