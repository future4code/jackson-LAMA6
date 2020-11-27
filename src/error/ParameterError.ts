import { BaseError } from "./BaseError";

export class ParameterError extends BaseError {
    constructor(message: string, code: number){
        super(message, code)
    }
}