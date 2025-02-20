import GenericException from "./GenericException";

export default class UserNotFoundException extends GenericException {
    constructor() {
        super("User not found in database, check your credentials", 404);
    }
}  