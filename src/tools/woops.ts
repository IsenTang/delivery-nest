import { HttpException } from '@nestjs/common';

export class Woops extends HttpException {

    private details: object;
    private errorMessage: string;
    private code: string;

    constructor (code, message, details = {}) {
        super(message,500);

        this.code = code;
        this.errorMessage = message;
        this.details = details;
    }

    getCode (){
        return this.code;
    }

    getMessage (){
        return this.errorMessage;
    }

    getDetails () {
        return this.details;
    }
}