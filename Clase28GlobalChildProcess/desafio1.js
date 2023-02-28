import minimist from 'minimist';
console.log(`Ejecutando proceso con pid: ${process.pid}`)
process.on('uncaughtException',error=>{
    console.log("Ha ocurrido un error");
    console.log(error.message);
    console.log(error.stack);
    console.log(error.code);
})

const args = minimist(process.argv.slice(2))._;

if(args.length===0){
    const error = new Error('Entrada vacía');
    error.code = -4;
    throw error;
}

args.forEach(arg =>{
    if(typeof arg !== "number"){
        const error = new Error('Tipos inválidos');
        const types = args.map(arg=>typeof arg);
        error.code = -5;
        error.stack = {
            description: 'Tipos de argumentos erróneos',
            args,
            tipos:types
        }
        throw error;
    }
})

let sum = args.reduce((prev,current)=> prev + current);
const obj = {
    numeros: args,
    promedio: sum / args.length,
    max:Math.max(...args),
    min: Math.min(...args),
    ejecutable: process.title,
    pid: process.pid
}

console.log(obj);