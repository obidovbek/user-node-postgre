import {IsString, IsEmail} from 'class-validator'

export class UserLoginDto{
    constructor(email, password){
        this.email = email;
        this.password = password        
    }    
}

IsEmail()(UserLoginDto.prototype, 'email');
IsString()(UserLoginDto.prototype, 'password');
