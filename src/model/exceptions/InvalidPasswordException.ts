import GenericException from "./GenericException";

export default class InvalidPasswordException extends GenericException {
    constructor() {
        super("Incorrect password", 400);
    }
}