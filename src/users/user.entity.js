import bcryptjs from 'bcryptjs';
const {hash, compare} = bcryptjs;
export class User{
    constructor(email, name, password){
        this.email = email;
        this.name = name;
        if(password){this._password=password};  
    }

    get password() {
		return this._password;
	}
    async hashPassword(pass, salt){
        this._password =  await hash(pass, salt);
    }
    async comparePassword(pass){
        return await compare(this._password, pass);
    }
}