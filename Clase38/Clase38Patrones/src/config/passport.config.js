import passport from "passport";
import local from 'passport-local';
import userModel from "../dao/mongo/user.js";
import { validatePassword } from "../services/auth.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        if(email===config.app.ADMIN_USER&&password===config.app.ADMIN_PWD){
            //Significa que entró con las credenciales de superadmin
            return done(null,{_id:0,first_name:"Admin",role:"admin"})
        }
        const user = await userModel.findOne({email});
        if(!user) return done(null,false,{message:'El usuario no existe'});
        const isValidPassword = await validatePassword(password,user.password);
        if(!isValidPassword) return done(null,false,{message:"Contraseña incorrecta"});
        return done(null,user);
    }))
}

export default initializePassport;