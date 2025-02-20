import GenericException from "./GenericException";

export default class AcessDaniedException extends GenericException {
    constructor() {
        super("You don't have a valid token to acess", 401);
    }
}