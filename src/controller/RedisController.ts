import { Request, Response } from "express";
import RedisService from "../services/RedisService";
import UserDTO from "../model/dto/UserDTO";

export default class RedisController {
/*
    private redisService;

    constructor() {
        this.redisService = new RedisService();
    }

    //salva na memoria
    public setUserData = async (request: Request, response: Response) => {
        try {
            const { name, email, password } = request.body as {name: string, email: string, password: string};
            const dataSave = new UserDTO(name, email, password);

            const result = await this.redisService.saveDataSection(dataSave);

            response.status(201).send(result);
        } catch (error) {
            const asError = error as Error;

            response.status(500).send({
                message: asError.message
            })
        }
    }

    //consulta a memoria
    public getUserData = async (request: Request, response: Response) => {
        try {
            const result = await this.redisService.getDataSection();
            response.status(200).send(result);
        } catch (error) {
            const asError = error as Error;

            response.status(500).send({
                message: asError.message
            })
        }
    }  
*/
}