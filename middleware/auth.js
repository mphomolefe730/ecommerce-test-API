import jwt from 'jsonwebtoken';
import { environment } from "../environments.js";

export async function Auth(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        // if (!token) return res.status(404).json('not authorized')
        const user = await jwt.verify(token,environment.JWTSecretkey);
        if (!user.userId) return res.status(404).json(`Not Authorized`);
        next()
    } catch (error) {
        return res.status(404).json(`Authentication Failed`)
    }
}