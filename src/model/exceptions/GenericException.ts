export default abstract class GenericException extends Error{
    private statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    public getStatusCode = (): number => {
        return this.statusCode;
    }

    public getMessage = (): string => {
        return this.message
    }
}