import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /* 获取环境变量 */
    const config = app.get('ConfigService');

    const port = config.get('PORT');

    await app.listen(port);
}
bootstrap();
