import client from "../prisma/client";
import UserDTO from "../model/dto/UserDTO";
import UserNotFoundException from "../model/exceptions/UserNotFoundException";
import UpdateUserDTO from "../model/dto/UpdateUserDTO";

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

    public removeByEmail = async (email: string) => {
        const response = await this.userClient.user.delete({
            where: {
                email: email
            }
        });

        if(!response) {
            throw new UserNotFoundException();
        }

        return response;
    }

    public updateByEmail = async (email: string, updateData: UpdateUserDTO) => {
        const userUpdated = await this.userClient.user.update({
            where: {
                email: email
            },
            data: {
                name: updateData.getName()
            }
        })

        if (!userUpdated) {
            throw new UserNotFoundException();
        }

        return userUpdated;
    }
}