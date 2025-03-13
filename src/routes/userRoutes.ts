import { Router } from "express";
import UserControll from "../controller/UserController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import ExceptionMiddleware from "../middleware/ExceptionMiddleware";
import storage from "../config/uploadConfig";
import multer from "multer";

const routes = Router();

//instanciando o controller
const controller = new UserControll();
const auth = new AuthMiddleware();
const error = new ExceptionMiddleware();  

const upload = multer({storage});

//VERIFICAR QUAIS ROTAS DEVEM SER PROGIDAS POR AUTENTICAÇÃO

//espera receber o email
routes.post('/save', upload.single('image'), controller.save, error.handleError);
//endpoint com autenticacao e tratamento de errros (ambos middlewares)
routes.get('/find/:email', auth.validateJWT, controller.findByEmail, error.handleError);
routes.post('/auth', controller.authUser, error.handleError);
routes.delete('/remove/:email', auth.validateJWT, controller.removeByEmail, error.handleError);
routes.patch('/update/:email', auth.validateJWT, controller.updateByEmail, error.handleError);

export default routes;