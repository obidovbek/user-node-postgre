import pg from 'pg';
import { ConfigService } from './config.js';
const {Pool} = pg;
export class PostgreConfig{
    pool;
    constructor(){
        this.configService = ConfigService.getInstance();
        this.pool = new Pool({
            host: this.configService.get('POSTGRE_HOST'),
            port: this.configService.get('POSTGRE_PORT'),
            database: this.configService.get('POSTGRE_DB'),
            user: this.configService.get('POSTGRE_USER'),
            password: this.configService.get('POSTGRE_PASSWORD'),
            dialect: this.configService.get('POSTGRE_DIALECT'),
        })        
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new PostgreConfig();
        }
        return this.instance;
    }
    connect(){
        try{
            this.pool.connect();
            console.log('[PostgreService] connected to db')
        }catch(e){
            console.log('[PostgreService] error while connecting to db',e)
        }
    }
}