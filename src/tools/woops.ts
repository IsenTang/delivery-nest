import { HttpException } from '@nestjs/common';

export class Woops extends HttpException {

    private details: object;
    private errorMessage: string;
    private errorStatus: string;

    constructor (status, message, details = {}) {
        super(message,500);

        this.errorStatus = status;
        this.errorMessage = message;
        this.details = details;
    }

    getErrorStatus (){
        return this.errorStatus;
    }

    getMessage (){
        return this.errorMessage;
    }

    getDetails () {
        return this.details;
    }
}