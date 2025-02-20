import { NextFunction, Request, Response } from "express";
import AcessDaniedException from "../model/exceptions/AcessDaniedExcpetion";
import Authenticate from "../auth/Authenticate";
import GenericException from "../model/exceptions/GenericException";

export default class AuthMiddleware {

    private auth = new Authenticate();

    public validateJWT = (request: Request, response: Response, next: NextFunction) => {
        const { authorization } = request.headers;

        try {
            const result = this.auth.validateJWT(authorization as string);            
            next();
        } catch (error) {
            next(error);
        }
    }
}