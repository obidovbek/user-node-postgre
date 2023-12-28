import { IsString, IsEmail, IsIn } from 'class-validator';

export class UserRegisterDto{
    constructor(first_name, second_name, email, password, photo, gender){
        this.first_name = first_name;
        this.second_name = second_name;
        this.email = email;
        this.password = password;
        this.photo = photo;
        this.gender = gender;
    }
}

IsString()(UserRegisterDto.prototype, 'first_name');
IsString()(UserRegisterDto.prototype, 'second_name');
IsEmail()(UserRegisterDto.prototype, 'email');
IsString()(UserRegisterDto.prototype, 'password');
IsString()(UserRegisterDto.prototype, 'photo');
IsIn(['male', 'female'], {message: "Gender must be 'male' or 'female'"})(UserRegisterDto.prototype, 'gender');