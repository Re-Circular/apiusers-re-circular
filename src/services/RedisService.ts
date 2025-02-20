import UserDTO from "../model/dto/UserDTO";
import ClientRedis from "../redis/ClientRedis"

export default class RedisService {

    private redisClient: any;

    private initClient = async () => {
        if(!this.redisClient) {
            const clientRedis = new ClientRedis();
            //this.redisClient = await clientRedis.getRedisClient();
        }
    }

    constructor() {
        this.initClient();
    }

    //salvando dados de login em memoria
    public saveDataSection = async (userData: UserDTO) => {
        console.log(userData.getData());
        const result = await this.redisClient.set(process.env.USER_KEY, JSON.stringify(userData.getData()));

        if (result) {
            return result;
        }

        throw new Error("Failed to save data section with redis"); 
    }

    public getDataSection = async () => {
        const userData = await this.redisClient.get(process.env.USER_KEY);
        return userData;
    }
}