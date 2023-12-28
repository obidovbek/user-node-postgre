import {Router} from 'express';
import { UserService } from './user.service.js';
import jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '../service/config.js';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserUpdateDto } from './dto/user-update.dto.js';
import { JwtGuard } from '../auth/jwt.guard.js';
import { MulterService } from '../service/multer.js';
const {sign} = jsonwebtoken;

export class UserController{
    constructor(){
        const jwtGuard = new JwtGuard();
        const multerService = new MulterService();
        this.userService = UserService.getInstance();
        this.configService = ConfigService.getInstance();
        this.router = Router();
        this.router.post('/register', multerService.upload.single('photo'), this.register.bind(this))
        this.router.post('/login', this.login.bind(this))
        this.router.put('/profile/:id', jwtGuard.protect.bind(this), multerService.upload.single('photo'), this.update.bind(this))
        this.router.get('/profile/:id', jwtGuard.protect.bind(this), this.getUser.bind(this))
        this.router.get('/profiles', jwtGuard.protect.bind(this), this.getUsers.bind(this))
    }
    async getUsers(req, res){
        try{
            const users = await this.userService.getUsers(req.query);
            res.status(200).json({data: users});
        }catch(e){
            res.status(400).json({error: e});
        }

    }
    async validateFn(className, data){
        const dto = plainToClass(className, data);
        const dtoErrors = await validate(dto);
        if(dtoErrors){
            const validateErrors = {};
            dtoErrors.forEach((errors)=>{
                const {property, constraints}=errors;
                validateErrors[property]=Object.values(constraints);
            })
            return validateErrors;
        }
        return null;
    }
    async getUser(req, res){

        const validatorErrors =await this.validateFn(UserUpdateDto, req.params); 
        if(Object.keys(validatorErrors).length){
            res.status(400).json({erros: validatorErrors})
        }

        const result = await this.userService.getUser(req.params.id)
        if(result){
            return res.status(404).json({message: result});
        }
        res.status(200).json({data: result})
    }
    async update(req, res){
        let user = req.body;
        if(req.file){
            user = {...user, photo:`/uploads/${req.file.filename}`}
        }

        const validatorErrors =await this.validateFn(UserUpdateDto, req.params); 
        if(Object.keys(validatorErrors).length){
            res.status(400).json({erros: validatorErrors})
        }

        try{
            const newUser = await this.userService.updateUser(parseInt(req.params.id), user)
            if(!newUser){
                return res.status(404).json({message: 'User not found'});
            }
            res.status(200).json({message:'User successfully updated', data: newUser})
        }catch(e){
            res.status(400).json({error: e.errors})
        }

    }
    async register(req, res, next){
        const user = {...req.body, photo:req.file?`/uploads/${req.file.filename}`:''}
        
        const validatorErrors =await this.validateFn(UserRegisterDto, user); 

        if(Object.keys(validatorErrors).length){
            res.status(400).json({erros: validatorErrors})
        }
        const result = await this.userService.register(user);
        if(!result){
            return res.status(422).json({error: 'Such user with email exists'})
        }

        res.status(200).json({email: result.email, id:result.id})
    }

    async login(req, res, next){

        const validatorErrors =await this.validateFn(UserLoginDto, req.body); 
        if(Object.keys(validatorErrors).length){
            res.status(400).json({erros: validatorErrors})
        }

        const result = await this.userService.validateUser(req.body);
        if(!result){
            return next(res.status(401).json({error: 'Authorization failed'}))
        }
        const jwt = await this.signJwt({email: req.body, secret: this.configService.get('SECRET')});
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