process.on('exit',code=>{
    console.log(code);
    console.log("Hola");
})

process.on('uncaughtException',error=>{
    console.log(error);
    console.log("error!")
})

console.log("Task1")
console.log("Task2")
console.log("Task3")
console.log("Task4")
process.exit(2929);
console.log("Task5")
console.log("Task6")
console.log("Task7")
console.log("Task8")
console.log("Task9")