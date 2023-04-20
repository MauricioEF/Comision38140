import jwt from 'jsonwebtoken';
import { cartsService, usersService } from '../dao/index.js';
import { createHash } from "../services/auth.js";
import config from "../config/config.js";
import UserDTO from '../dao/DTO/UserDTO.js';

const register = async(req,res)=>{
    try {
        const file = req.file;
        if(!file) return res.status(500).send({status:"error",error:"Error al cargar el archivo"});
        const {first_name,last_name,email,password} = req.body;
        if(!first_name||!last_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
        const exists = await usersService.getUserBy({email});
        if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
        const hashedPassword = await createHash(password);
        const cart = await cartsService.createCart();
        const user = {
            first_name,
            last_name,
            email,
            password:hashedPassword,
            cart: cart._id,
            avatar:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
        }
        const result = await usersService.createUser(user);
        res.send({status:"success",message:"Registrado"});
    } catch (error) {
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
}

const login = async(req,res)=>{
    try{
        const userToken = UserDTO.getTokenDTO(req.user);
        const token = jwt.sign(userToken,config.jwt.SECRET,{expiresIn:"1d"});
        res.cookie(config.jwt.COOKIE,token).send({status:"success",message:"logged in"})
    }catch(error){
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
}

const loginFail = (req,res)=>{
    res.send("Algo salió mal")
}

export default {
    login,
    loginFail,
    register
}