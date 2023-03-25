import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/profile',executePolicies(["AUTHENTICATED"]),(req,res)=>{
    res.render('profile',{user:req.user})
})

export default router;