import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* config module */
import { ConfigModule } from '@nestjs/config';
import configSetting from './config.setting';

@Module({
    // imports: [MongooseModule.forRoot('mongodb://localhost/delivery')],
    imports: [
        ConfigModule.forRoot(configSetting)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
