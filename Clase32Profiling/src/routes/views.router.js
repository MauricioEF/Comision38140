import { Router } from "express";

const router = Router();

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/login',(req,res)=>{
    req.logger.debug('Prueba')
    res.render('login');
})

export default router;