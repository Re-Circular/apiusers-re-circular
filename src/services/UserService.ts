import UpdateUserDTO from "../model/dto/UpdateUserDTO";
import UserDTO from "../model/dto/UserDTO";
import DataBaseException from "../model/exceptions/DataBaseException";
import GenericException from "../model/exceptions/GenericException";
import UserRepository from "../repository/UserRepository"
import bcryptjs from "bcryptjs";

export default class UserService {
    private userRepository = new UserRepository();

    //encripta a string passada
    private encriptData = async (input: string) => {
        const ROUNDS = 10;
        
        const hash = await bcryptjs.hash(input, ROUNDS);

        return hash;
    }

    public save = async (user: UserDTO) => {
        try {
            //criptografando o email e a senha no salvamento dos dados
            const response = await this.userRepository.saveOne({
                ...user,
                password: await this.encriptData(user.getPassword())});

            return response;
        } catch (error) {
            const asError = error as Error;
            throw new DataBaseException(asError.message);
        }
    }

    public findByEmail = async (email: string) => {
        try {
            const response = await this.userRepository.findByEmail(email);
            
            const userDto = new UserDTO(response.name as string, response.email as string, response.password as string);

            return userDto.getData();
        } catch(error) {
            const asError = error as Error;

            throw new DataBaseException(asError.message);
        }
    }

    public removeByEmail = async (email: string) => {
        try {
            const response = await this.userRepository.removeByEmail(email);
            return response;
        } catch (error) {
            const asError = error as Error;

            throw new DataBaseException(asError.message);
        }
    } 

    public updateByEmail = async(email: string, userToUpdate: UpdateUserDTO) => {
        try {
            const userUpdated = await this.userRepository.updateByEmail(email, userToUpdate);
            return userToUpdate;
        } catch(error) {
            const asError = error as Error;

            throw new DataBaseException(asError.message);
        }
    }
}