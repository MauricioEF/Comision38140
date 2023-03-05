import express from 'express';

const app = express();

const PORT = process.env.PORT ||8080;

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

app.get('/api/info',(req,res)=>{
    res.send(`Petición atendida por ${process.pid} en ${PORT}`)
})