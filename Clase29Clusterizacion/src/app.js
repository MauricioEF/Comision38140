import express from 'express';

const app = express();
const PORT = process.env.PORT||8080;

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.get('/',(req,res)=>{
    res.send(`Petición atendida por ${process.pid}`)
})

app.get('/calculo',(req,res)=>{
    let sum = 0;
    for(let i=0;i<5e9;i++){
        sum+=i;
    }
    res.send(`Cálculo atendido por ${process.pid}, el resultado es ${sum}`)
})