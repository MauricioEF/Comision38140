import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export const executePolicies = (policies) =>{
    return (req,res,next) =>{
        if(policies[0]==="PUBLIC") return next();
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) return res.redirect('/login');
        try{
            const user = jwt.verify(token,config.jwt.SECRET);
            if(policies[0]==="AUTHENTICATED"||policies.includes(user.role.toUpperCase())){
                req.user = user;
                return next();
            }
            else res.redirect('/login');//O a una página que diga que no tengo permisos
        }catch(error){
            res.clearCookie(config.jwt.COOKIE).status(401).send({status:"error", error:"Not authenticated"})
        }
    }
}