import { UserModel } from "./user.model.js";

export class UserRepository{
    constructor(){}
    find(email){
        return UserModel.findOne({where:{email}})
    }

    create({first_name, second_name, email,password,gender, photo}){
        return UserModel.create({first_name, second_name, email, password, gender, photo});
    }
    findById(id){
        return UserModel.findByPk(id);
    }
    async updateUser(id, updatedUser){
        const user = await UserModel.findByPk(id);
        if(!user)return null;
        await user.update({...updatedUser, password: updatedUser.password});
        return user;
    }
    async getUsers(page){
        const users = await UserModel.findAll({
            limit: 10,
            offset: (page-1) * 10
        })
        return users;
    }
}