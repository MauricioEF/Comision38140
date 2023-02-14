import passport from 'passport';
import local from 'passport-local';
import { usersService } from '../dao/index.js';
import { validatePassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializeStrategies = () =>{
    passport.use('login',new LocalStrategy({usernameField:'email'},async (email,password,done)=>{
        if(!email||!password) return done(null,false,{message:"Valores incompletos"})
        const user = await usersService.getBy({email});
        if(!user) return done(null,false,{message:"Credenciales inválidas"})
        const isValidPassword = await validatePassword(password,user.password);
        if(!isValidPassword) return done(null,false,{message:"Contraseña inválida"})
        //SI LLEGASTE HASTA AQUÍ, ES PORQUE SI TE LOGUEASTE CORRECTAMENTE
        return done(null,user)
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        const result = await usersService.getBy({_id:id})
        done(null,result);
    })

}

export default initializeStrategies;