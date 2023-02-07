import express from 'express';
import cookieParser, { signedCookies } from 'cookie-parser';

const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());
app.use(cookieParser("papaconquesitoSecreto"));

app.get('/login',(req,res)=>{
    res.cookie('galletaFelizConLeche',{nombre:"Enzo",role:"user"},{
        maxAge:100000
    }).send({status:"success",message:"Cookie seteada"})
})

app.get('/loginEspia',(req,res)=>{
    res.cookie('galletaFelizConLecheEspia',{nombre:"Enzo",role:"user"},{
        signed:true,
        maxAge:100000
    }).send({status:"success",message:"Cookie seteada"})
})

app.get('/visita',(req,res)=>{
    console.log(req.signedCookies)
    const cookie = req.signedCookies["galletaFelizConLecheEspia"];
    if(!cookie){
        //Significa que no está logueado
        return res.status(401).send({status:"error",error:"Favor de loguearte primero"})
    }
    console.log(cookie);
    res.send("Bienvenid@")
})


app.get('/logout',(req,res)=>{
    res.clearCookie("galletaFelizConLecheEspia").send({status:"success",message:"Adiós"})
})

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))