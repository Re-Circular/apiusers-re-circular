import { User } from "@prisma/client";
import IUser from "../model/interface/IUser";
import client from "../prisma/client";
import UserDTO from "../model/dto/UserDTO";
import DataBaseException from "../model/exceptions/DataBaseException";
import UserNotFoundException from "../model/exceptions/UserNotFoundException";

export default class UserRepository {

    private userClient;

    //instanciando o user
    constructor() {
        this.userClient = client;
    }

    //retorna o usuário criado
    public saveOne = async (user: UserDTO) => {
        const userToAdd = await client.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });

        return userToAdd;
    }

    public findByEmail = async (email: string) => {
        const response = await this.userClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!response) {
            throw new UserNotFoundException();
        }

        return response;
    }
}