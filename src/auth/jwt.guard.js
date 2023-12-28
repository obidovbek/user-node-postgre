import jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '../service/config.js';
const {verify} = jsonwebtoken;

export class JwtGuard{

    constructor(){
        this.configService = ConfigService.getInstance();
    }
    
    async protect(req, res, next){
        try{
            const authHeader = req.headers.authorization
            const bearer =  authHeader.split(' ')[0];
            const token =  authHeader.split(' ')[1];
            if(bearer !== 'Bearer' || !token){
                return res.status(401).json({message: 'Authorization failed!'});
            }
            const verifyUser = await verify(token, this.configService.get('SECRET'));
            req.user = verifyUser;
            next();
        }catch(e){
            res.status(401).json({message: "Authorization failed"});
        }
    }
}