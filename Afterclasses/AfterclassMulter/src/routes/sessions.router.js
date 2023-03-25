import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

import userModel from "../dao/mongo/user.js";
import { createHash } from "../services/auth.js";
import uploader from "../services/upload.js";
import config from "../config/config.js";

const router = Router();

router.post('/register',uploader.single('avatar'),async(req,res)=>{
    try {
        const file = req.file;
        if(!file) return res.status(500).send({status:"error",error:"Error al cargar el archivo"});
        const {first_name,last_name,email,password} = req.body;
        if(!first_name||!last_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
        const exists = await userModel.findOne({email});
        if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password:hashedPassword,
            avatar:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
        }
        const result = await userModel.create(user);
        res.send({status:"success",message:"Registrado"});
    } catch (error) {
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',session:false}),async(req,res)=>{
    try{
        const userToken = {
            name:`${req.user.first_name} ${req.user.last_name}`,
            role:req.user.role,
            id:req.user._id,
            avatar:req.user.avatar
        }
        const token = jwt.sign(userToken,config.jwt.SECRET,{expiresIn:"1d"});
        res.cookie(config.jwt.COOKIE,token).send({status:"success",message:"logged in"})
    }catch(error){
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
})

router.get('/loginFail',(req,res)=>{
    res.send("Algo salió mal")
})

export default router;