import Sequelize from 'sequelize';
import { UserModel } from '../users/user.model.js';
import { ConfigService } from './config.js';

export class SequelizeService{
    sequelize;
    constructor(){
        this.configService = ConfigService.getInstance();
        this.sequelize = new Sequelize({
            host: this.configService.get('POSTGRE_HOST'),
            port: this.configService.get('POSTGRE_PORT'),
            database: this.configService.get('POSTGRE_DB'),
            username: this.configService.get('POSTGRE_USER'),
            password: this.configService.get('POSTGRE_PASSWORD'),
            dialect: this.configService.get('POSTGRE_DIALECT'),
        });
        UserModel.init(this.sequelize);  
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new SequelizeService();
        }
        return this.instance;
    }
    async connect(){
        try{
            this.sequelize.authenticate();
            this.sequelize.sync();
            console.log('[PostgreService] connected to db')
        }catch(e){
            console.log('[PostgreService] error while connecting to db',e)
        }
    }
}