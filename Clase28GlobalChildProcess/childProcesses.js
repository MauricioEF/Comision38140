import { exec, spawn, execFile} from 'child_process';

console.log(`Soy el proceso padre: ${process.pid}`)
exec('node ./desafio1.js 4 5 1 2 ',(error,stdout)=>{
    if(error) return console.log(`Error al ejecutar: ${error}`);

    console.log(`Respuesta del otro programa: ${stdout}`);
})