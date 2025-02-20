import { Router } from "express";
import RedisController from "../controller/RedisController";

const redisRouter = Router();

const redisController = new RedisController();

//rotas do redis
//redisRouter.get('/user-data', redisController.getUserData);
//redisRouter.post('/user-data', redisController.setUserData);

export default redisRouter;