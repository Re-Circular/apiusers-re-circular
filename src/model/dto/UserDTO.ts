import IUser from "../interface/IUser";

export default class UserDTO implements IUser {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public getData = () => {
        return {
            name: this.name,
            email: this.email,
            password: this.password
        }
    }

    public getName = (): string => {
        return this.name;
    }

    public getEmail = (): string => {
        return this.email;
    }

    public getPassword = (): string => {
        return this.password;
    }
}