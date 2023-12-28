import { ConfigService } from "../service/config.js";
import { User } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";

export class UserService{
    constructor(){
        this.configService = ConfigService.getInstance();
        this.userRepository = new UserRepository();
    }
    async getUsers(query){
        const page = !query || !query.page || parseInt(query.page) < 1 ? 1 : parseInt(query.page);
        const users = await this.userRepository.getUsers(page);
        return users;
    }
    async getUser(id){
        const user =await this.userRepository.findById(id);
        return user;
    }
    async updateUser(id, user){
        const {password, ...userOtherData} = user
        const updatedUser = new User(userOtherData);
        if(password){
            const salt = this.configService.get('SALT')
            await updatedUser.hashPassword(password, parseInt(salt));
        }
        const result = await this.userRepository.updateUser(id, updatedUser);
        return result;
    }

    async register(user){
        const {password, ...userOtherData} = user;
        const newUser = new User(userOtherData);
        const salt = this.configService.get('SALT');
        await newUser.hashPassword(user.password, parseInt(salt));
        const existedUser = await this.userRepository.find(user.email)
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
        const user = new User(existedUser)
        return user.comparePassword(password)
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new UserService()
        }
        return this.instance;
    }
}