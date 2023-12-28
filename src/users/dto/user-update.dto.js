import { IsString } from "class-validator";
export class UserUpdateDto{
    constructor(id){
        this.id = id;
    }
}

IsString()(UserUpdateDto.prototype, 'id')