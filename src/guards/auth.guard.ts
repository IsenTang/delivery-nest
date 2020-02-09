import { Injectable, CanActivate, ExecutionContext,Inject } from '@nestjs/common';
import * as _ from 'lodash';
import { Woops } from './../tools/woops';
import { decode } from '../services/login';
import { AuthService } from '../features/user/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private readonly authService: AuthService
    ) {}

    async canActivate (
        context: ExecutionContext,
    ): Promise<boolean> {

        const req = context.switchToHttp().getRequest();

        const authorization = req.get('authorization');

        if (!authorization) {
            throw new Woops('auth-failed', 'You need login first.');
        }

        try {

            const decoded = decode(authorization);

            const id = _.get(decoded, 'data._id');

            /* validate user */
            return await this.authService.validateUser({ id });

        } catch (error) {
            throw new Woops('auth-failed', 'You need login first.');
        }

        return true;
    }
}