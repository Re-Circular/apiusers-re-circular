import GenericException from "./GenericException";

export default class DataBaseException extends GenericException {
    constructor(text: string) {
        super(`Error on database: ${text}`, 500);
    }
}