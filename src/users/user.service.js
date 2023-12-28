import { ConfigService } from "../service/config.js";
import { User } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";

export class UserService{
    constructor(){
        this.configService = ConfigService.getInstance();
        this.userRepository = new UserRepository();
    }
    async register(user){
        const newUser = new User(user);
        const salt = this.configService.get('SALT');
        await newUser.hashPassword(u.password, parseInt(salt));
        const existedUser = await this.userRepository.find(u.email)
        console.log(newUser)
        if(existedUser){
            return null
        }
        return this.userRepository.create(newUser)
    }
    async validateUser({email, password}){
        const existedUser = await this.userRepository.find(email)
        if(!existedUser){
            return null;
        }
        const user = new User(existedUser.email, existedUser.first_name, existedUser.password)
        return user.comparePassword(password)
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new UserService()
        }
        return this.instance;
    }
}