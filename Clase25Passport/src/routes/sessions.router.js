import { Router } from "express";
import passport from "passport";
import { usersService } from "../dao/index.js";
import { createHash, validatePassword } from "../utils.js";

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

export default router;