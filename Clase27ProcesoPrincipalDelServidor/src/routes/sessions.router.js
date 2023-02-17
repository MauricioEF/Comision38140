import { Router } from "express";
import passport from "passport";
import { usersService } from "../dao/index.js";
import { createHash, validatePassword } from "../utils.js";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const router = Router();

router.post('/register',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body;
    if(!first_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
    const exists  = await usersService.getBy({email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
    const hashedPassword = await createHash(password);
    const result = await usersService.save({
        first_name,
        last_name,
        email,
        password:hashedPassword
    })
    res.send({status:"success",payload:result})
})


router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}) ,async(req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user._id,
        email:user.email,
        role:user.role
    }
    res.send({status:"success",message:"Logueado :)"})
})
router.get('/loginFail',(req,res)=>{
    console.log(req.session.messages);
    if(req.session.messages.length>4) return res.status(400).send({message:"BLOQUEA LOS INTENTOS AHORA!!!!!"})
    res.status(400).send({status:"error",error:"Error de autenticación"})
})

router.get('/github',passport.authenticate('github'),(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user._id,
        email:user.email,
        role:user.role
    }
    res.send({status:"success",message:"Logueado Pero con github:)"})
})

router.post('/logintoken',async(req,res)=>{
    const {email, password} = req.body;
    const user = await usersService.getBy({ email });
    if(!user) return res.status(400).send({status:"error",error:"Credenciales inválidas"});
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) return res.status(400).send({status:"error",error:"Contraseña incorrecta"})
    const tokenizedUser = {
        name: `${user.first_name} ${user.last_name}`,
        role: user.role,
        id: user._id
    }
    const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:"1d"})
    //AQUÍ ES DONDE YOOOOOO DECIDO Cómo se lo voy a enviar.
    res.send({status:"success",message:"Logueado",token})
})

router.get('/current',(req,res)=>{
    const {token} = req.query;
    const user = jwt.verify(token,config.jwt.SECRET);
    console.log(user);
    res.send({status:"success",payload:user});
})


export default router;