import express from 'express';
import cluster from 'cluster';
import os from 'os';

const app = express();
const CPUs = os.cpus().length;

if(cluster.isPrimary){
    console.log(`Proceso primario (o padre) en PID: ${process.pid}. Generando procesos Hijos`)
    for(let i = 0; i < CPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit',(worker)=>{
        console.log(`Proceso hijo con pid ${worker.process.pid} Murió :(, creando reemplazo`)
        cluster.fork();
    })
}else{
    console.log(`Proceso worker (o hijo) en PID: ${process.pid}`)
    app.listen(8080,()=>console.log("Listening on 8080"))
}

app.get('/',(req,res)=>{
    res.send(`Petición atendida por ${process.pid}`)
})

app.get('/operacion',(req,res)=>{
    let result = 0;
    for(let i=0;i<5e9;i++){
        result+=i;
    }
    res.send(`Petición atendida por ${process.pid}, el resultado es ${result}`)
})