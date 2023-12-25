import express from "express";
import { ConfigService } from "./config/config.js";
import { PostgreConfig } from "./config/postgre.js";
import routes from "./routes.js";

export class App{
    app;
    constructor(){
        this.app = express();
        this.configService = ConfigService.getInstance();
        this.postgreConfig = PostgreConfig.getInstance();
    }
    async init(){
        this.app.use(express.json());
        this.app.use('/', routes)
        await this.postgreConfig.connect();
        this.app.listen(this.configService.get('PORT'), ()=>console.log(`Server runs at port ${this.configService.get('PORT')}`))
    }   
}