import express, {Router} from "express";
import { ConfigService } from "./service/config.js";
import { SequelizeService } from "./service/sequelize.js";
import { UserController } from "./users/user.controller.js";

export class App{
    app;
    constructor(){
        this.app = express();
        this.configService = ConfigService.getInstance();
        this.postgreConfig = SequelizeService.getInstance();
    }
    async init(){
        this.app.use(express.json());
        this.router = Router();
        this.app.use('/user', UserController.getInstance().router)
        await this.postgreConfig.connect();
        this.app.listen(this.configService.get('PORT'), ()=>console.log(`Server runs at port ${this.configService.get('PORT')}`))
    }   
}