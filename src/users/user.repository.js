import { UserModel } from "./user.model.js";

export class UserRepository{
    constructor(){}
    find(email){
        return UserModel.findOne({where:{email}})
    }

    create({first_name, second_name, email,password,gender}){
        return UserModel.create({first_name, second_name, email,password,gender});
    }
}