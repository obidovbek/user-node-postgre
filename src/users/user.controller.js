import {Router} from 'express';
import { UserService } from './user.service.js';
import jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '../service/config.js';
const {sign} = jsonwebtoken;
const u = {
    first_name: 'Obidov',
    second_name: 'Bekzod',
    email: '1234@',
    password: '123',
    gender: 'male'
}
export class UserController{
    constructor(){
        this.userService = UserService.getInstance();
        this.configService = ConfigService.getInstance();
        this.router = Router();
        this.router.post('/register', this.register.bind(this))
        this.router.get('/login', this.login.bind(this))
    }
    async register(req, res, next){
        const result = await this.userService.register(u);
        if(!result){
            return next(res.status(422).json({error: 'Such user with email exists'}))
        }
        res.status(200).json({email: result.email, })
    }

    async login(req, res, next){
        const result = await this.userService.validateUser(u);
        if(!result){
            return next(res.status(401).json({error: 'Authorization failed'}))
        }
        console.log(result)
        const jwt = await this.signJwt({...u, secret: this.configService.get('SECRET')});
        res.status(200).json({jwt})
    }
    async signJwt({email, secret}){
        return new Promise((resolve, reject)=>
            sign(
                {
                    email,
                    iat: Math.floor(new Date() / 1000) 
                },
                secret,
                {
                    algorithm: 'HS256'
                },
                (err, token)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(token);
                }
            )
        )
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new UserController();
        }
        return this.instance;
    }
}