import { Router } from "express";
import UserControll from "../controller/UserController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import ExceptionMiddleware from "../middleware/ExceptionMiddleware";

const routes = Router();

//instanciando o controller
const controller = new UserControll();
const auth = new AuthMiddleware();
const error = new ExceptionMiddleware();  

//VERIFICAR QUAIS ROTAS DEVEM SER PROGIDAS POR AUTENTICAÇÃO

//espera receber o email
routes.post('/', controller.save, error.handleError);
//endpoint com autenticacao e tratamento de errros (ambos middlewares)
routes.get('/:email', auth.validateJWT, controller.findByEmail, error.handleError);
routes.post('/auth', controller.authUser, error.handleError);

export default routes;