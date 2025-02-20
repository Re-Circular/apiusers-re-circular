import { NextFunction, Request, Response } from "express";
import GenericException from "../model/exceptions/GenericException";

export default class ExceptionMiddleware {

    public handleError = (error: Error, request: Request, response: Response, next: NextFunction) => {
        //verificando se o erro é um GenericException
        if (error instanceof GenericException) {
            response.status(error.getStatusCode()).send(error.getMessage());
        } else {            
            response.status(500).send({
                message: `Internal error server (unknown): ${error.message}`
            })
        }
    }
}