import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const app = express();
const GMAIL_PWD = 'ktgbgsqhticpvqms';
const GMAIL_USER = "ing.mauricioespinosa.tutorias@gmail.com";
const TWILIO_NUMBER = '+15075790970';
const TWILIO_ACCOUNT_SID = 'AC59ef03af1cb2d2a9eb3430da88642d79';
const TWILIO_PWD = "6b4bc0c98cab6e33f3ad172ce9d563c9";

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PWD
    }
});

const twilioClient = twilio(TWILIO_ACCOUNT_SID,TWILIO_PWD);


app.get('/mail',async(req,res)=>{
    const email = req.body||'ing_mauricioespinosa@hotmail.com';
    const result = await transporter.sendMail({
        from:'Papa <ing.mauricioespinosa.tutorias@gmail.com>',
        to:email,
        subject:'Correo de prueba :)',
        html:`<div><h1 style="color:red;">Este es un correo de prueba :)</h1></div>`,
        attachments:[
            {
                filename:'MiradaSeria.jpg',
                path:'./src/img/perritoDeprimido.jpg'
            },
        ]
    })
    console.log(result);
    res.send({status:"success",message:"Correo enviado exitosamente"})
})

app.get('/sms',async(req,res)=>{
    const number = req.body||'+525567444717';
    const result = await twilioClient.messages.create({
        body:'Mensaje de prueba Twilio',
        from:TWILIO_NUMBER,
        to:number
    })
    console.log(result);
    res.send({status:"success",message:"SMS enviado exitosamente"})
})

app.listen(8080,()=>console.log("Listening"));

