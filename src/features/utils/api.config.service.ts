import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) {}

    get mongodbUri(): string {
        return String(this.configService.get('MONGODB_URI'));
    }
}