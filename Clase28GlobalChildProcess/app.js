import express from 'express';
import {fork} from 'child_process';

const app = express();

let contador = 0;
const calculoPesado = () =>{
    let sum = 0;
    for(let i=0;i<6e9;i++){
        sum+=i
    }
    return sum;
}
app.get('/',(req,res)=>{
    res.send(`Has visitado esta página ${++contador} veces`)
})

app.get('/calcular',async (req,res)=>{
    const result = await  calculoPesado();
    res.send(`La suma pesada es ${result}`)
})

app.get('/calcularperoforkeado',(req,res)=>{
    const childProcess = fork('./calculoPesado.js');
    childProcess.send('Ejecútate por favor, que pases felices fiestas :)')
    childProcess.on('message',val=>{
        res.send(`El valor de la suma pesada es ${val}`)
    })
})

app.listen(8080,()=>console.log("Listening on 8080"))