import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import UserDTO from "../model/dto/UserDTO";
import Authenticate from "../auth/Authenticate";
import { error } from "console";
import UpdateUserDTO from "../model/dto/UpdateUserDTO";

export default class UserControll {

    private userService = new UserService();
    private auth = new Authenticate();

    //todas as exceções são redirecionadas para um middlewre de exeções
    public save = async (request:Request, response:Response, next: NextFunction) => {

        try {
            const { name, email, password } = request.body as {name: string, email: string, password: string};
            //pegando a imagem passada
            const imagePath = request.file;

            const userDTO = new UserDTO(name, email, password);
            
            const result = await this.userService.save(userDTO);
            response.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }

    public findByEmail = async (request:Request, response:Response, next: NextFunction) => {
        try {
            const { email } = request.params as {email: string};

            console.log(email);

            const result = await this.userService.findByEmail(email);
            //retorna um UserDTO com as informações principais: nome, email e senha
            response.status(200).send(result);
        } catch(error) {
            next(error);
        }
    }

    //realiza a autenticação do usuário, caso ocorra tudo bem, um token e retornado
    public authUser = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { name, email, password } = request.body as {name: string, email: string, password: string};
            const userDTO = new UserDTO(name, email, password);

            const responseContent = await this.auth.execute(userDTO);
            response.status(201).send(responseContent);
        } catch (error){
            next(error);
        } 
    } 

    //realiza a remoção do usuário com base no email passado
    public removeByEmail = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const {email} = request.params as {email: string};

            const deleteResult = await this.userService.removeByEmail(email);
            response.status(200).send(deleteResult);

        } catch (error) {
            next(error);
        }
    }

    //realiza a atualização de todos os atributos de um usuário (nesse caso, apenas o nome)
    public updateByEmail = async (request: Request, response:Response, next:NextFunction) => {
        try {
            const { name } = request.body as { name: string };
            const userToUpdate = new UpdateUserDTO(name);

            const { email } = request.params as { email: string };

            const userUpdated = await this.userService.updateByEmail(email, userToUpdate);
            response.status(200).send(userUpdated);
        } catch(error) {
            next(error)
        }
    }
}