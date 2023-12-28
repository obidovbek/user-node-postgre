import bcryptjs from 'bcryptjs';
const {hash, compare} = bcryptjs;
export class User{
    constructor(user){
        this.first_name = user.first_name;
        this.second_name = user.second_name;
        this.email = user.email;
        this.gender = user.gender;
        this.photo = user.photo;
        if(user.password){this._password=user.password}
    }

    get password() {
		return this._password;
	}
    async hashPassword(pass, salt){
        this._password =  await hash(pass, salt);
    }
    async comparePassword(pass){
        return compare(pass, this._password);
    }
}