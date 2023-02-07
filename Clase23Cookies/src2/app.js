import express from 'express';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());
app.use(session({
    secret:"CoderSecretFeliz3StoS0loLoDeb0VerYO",
    //id que le generó la sesión  => información del usuario
    resave:true,
    saveUninitialized:true
}));

app.get('/login',(req,res)=>{
    //ESTAS DOS VARIABLES SON LAS QUE NOS ENVIÓ  EL CLIENTE
    const email = "correojeremias@correo.com";
    const password = "123";

    //Validando al cliente
    if(email=="correojeremias@correo.com"&&password==="123"){
        //Lo logró! ahora vamos a generarle una sesión.
        //Supongamos que obtuve al usuario de la base de datos
        const usuarioEnDB = {
            name: "Jeremías",
            email: "correojeremias@correo.com",
            password: "123",
            role: "teacher",
        }

        //NUNCA AGREGAMOS DATOS SENSIBLES
        req.session.user = {
            username:usuarioEnDB.name,
            email:usuarioEnDB.email,
            role:usuarioEnDB.role
        };
        res.send({status:"success",message:"Logueado"})
    }
    else{
        return res.status(400).send({status:"error",messages:"Credenciales incorrectas"})
    }
})

app.get('/current',(req,res)=>{
    console.log(req.session);
    res.send(req.session.user);
})

const validateStudent = (req,res,next) =>{
    //¿Ya existe un user?
    if(!req.session.user) return res.status(401).send({status:"error",error:"No está logueado"})
    //Oye, pero sí es un estudiante?
    if(req.session.user.role!=="student") return res.status(403).send({status:"error",error:"No cumple con los permisos"})
    next();
}

app.get('/panelEstudiante',validateStudent,(req,res)=>{
    res.send({status:"success",message:`Bienvenid@, ${req.session.user.username}`})
})

app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send({status:"error",error:"Algo salió mal :("})
    })
    res.send({status:"success",message:"Deslogueado :( Vuelve pronto"})
})

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))