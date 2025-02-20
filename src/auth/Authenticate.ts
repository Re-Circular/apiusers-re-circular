import { sign, verify } from "jsonwebtoken";
import InvalidPasswordException from "../model/exceptions/InvalidPasswordException";
import UserNotFoundException from "../model/exceptions/UserNotFoundException";
import IUser from "../model/interface/IUser";
import UserService from "../services/UserService";
import bcryptjs from "bcryptjs";
import IPayload from "../model/interface/IPayload";
import AcessDaniedException from "../model/exceptions/AcessDaniedExcpetion";

type ExecuteReturn = {
    token: string,
    user: Object
}

export default class Authenticate {
    private userService = new UserService();

    private verifyUser = (user: IUser): boolean => {
        return user != null;
    }

    //verifica se a senha está correta com base na senha do banco
    private verifyCredentials = async (passwordInput: string, {password}: IUser): Promise<boolean> => {
        const isOk = await bcryptjs.compare(passwordInput, password as string);

        return isOk;
    }

    private generateToken = ({email}:IUser)=> {
        const token = sign(
            //payload
            {
                userEmail: email
            } as IPayload,
            //signature
            process.env.PARCIAL_SECRET as string,
            //options
            {
                expiresIn: 30
            }
        );

        return token;
    } 

    public validateJWT = (authorization: string) => {
        const SECOND_ELEMENT = 1;

        if (!authorization) {
            throw new AcessDaniedException();
        }

        const token = authorization.split(" ")[SECOND_ELEMENT];

        try {
            const { userEmail } = verify(token, process.env.PARCIAL_SECRET as string) as IPayload;
            return userEmail;
        } catch(err) {
            throw new AcessDaniedException();
        }
    }

    public execute = async ({ email, password }:IUser): Promise<ExecuteReturn> => {
        const user = await this.userService.findByEmail(email as string);
        
        //checando se o usuário existe
        if (!this.verifyUser(user)) {
            throw new UserNotFoundException();
        }

        //verificando se as credenciais batem
        if (!await this.verifyCredentials(password as string, user)) {
            throw new InvalidPasswordException();
        }

        const tokenGenerated = this.generateToken(user);

        return {
            token: tokenGenerated,
            user: {...user}
        } as ExecuteReturn 
    }
}