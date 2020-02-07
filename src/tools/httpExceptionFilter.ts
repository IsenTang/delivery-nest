import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import {  Response } from 'express';
import { Woops } from './woops';

@Catch(Woops)
export class HttpExceptionFilter implements ExceptionFilter {
    catch (woops: Woops, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = woops.getErrorStatus();
        const details = woops.getDetails();
        const message = woops.getMessage();

        response
            .status(500)
            .json({
                status,
                message,
                details,
                timestamp: new Date().toISOString(),
            });
    }
}