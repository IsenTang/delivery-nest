import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './tools/validation.pipe';
import { HttpExceptionFilter } from './tools/httpExceptionFilter';

async function bootstrap () {
    const app = await NestFactory.create(AppModule);

    /* 获取环境变量 */
    const config = app.get('ConfigService');

    const port = config.get('PORT');

    /* 验证 */
    app.useGlobalPipes(new ValidationPipe());

    /* 错误处理 */
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(port);
}
bootstrap();
