const args = process.argv.slice(2);

console.log(args);

//Agrego al usuario

console.log("Usuario agregado");

const sendMail = args.includes('-email')

console.log("Nuevos cambios");


if(sendMail) {
    const mailToSend = args[3];
    console.log(mailToSend);
    console.log("Enviar mail");
}