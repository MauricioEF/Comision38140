import passport from 'passport';
import local from 'passport-local';
import { usersService } from '../dao/index.js';
import { validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oidc';

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Valores incompletos" })
        const user = await usersService.getBy({ email });
        if (!user) return done(null, false, { message: "Credenciales inválidas" })
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { message: "Contraseña inválida" })
        //SI LLEGASTE HASTA AQUÍ, ES PORQUE SI TE LOGUEASTE CORRECTAMENTE
        return done(null, user)
    }))

    passport.use('github', new GithubStrategy({
        clientID: "Iv1.4fdfcfcda33930c9",
        clientSecret: "1096ab0ab2e9f788b29e700bcf104bb34c4b8fe6",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            //¿Y cómo funciona?
            console.log(profile);
            const { name, email } = profile._json;
            const user = await usersService.getBy({ email });
            if (!user) {
                //A diferencia del login, si no existe el usuario, NO ME QUEJO, LO CREO
                const newUser = {
                    first_name: name,
                    email,
                    password: ''
                }
                const result = await usersService.save(newUser);
                return done(null, result);
            }
            done(null, user);

        } catch (error) {
            done(error);
        }
    }))

    passport.use('google',new GoogleStrategy({
        clientID:"802010235704-ee4n4ctk1kpmecooatvvrs54s29qk7r6.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8080/api/sessions/googlecallback"
    },async(issuer,profile,done)=>{
        console.log(issuer);
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;
        const user = await usersService.getBy({email});
        console.log(user);
        if(!user){ //Si no existía, lo registro.
            const newUser = {
                first_name : firstName,
                last_name : lastName,
                email,
                password: ''
            }
            let result = await usersService.save(newUser);
            return done(null,result);
        }
        else{
            return done(null,user);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const result = await usersService.getBy({ _id: id })
        done(null, result);
    })

}

export default initializeStrategies;