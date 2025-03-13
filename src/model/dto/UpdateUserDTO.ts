import IUser from "../interface/IUser";

export default class UpdateUserDTO {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getData = () => {
        return {
            name: this.name,
        }
    }

    public getName = (): string => {
        return this.name;
    }

    public setName = (name: string): void => {
        this.name = name;
    }
}