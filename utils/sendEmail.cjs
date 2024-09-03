const nodemailer = require('nodemailer');

async function sendMail(params) {
const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ismamed4@gmail.com",
            pass:"Coockie888!!!"
        }
    })

    const mailOptions ={
        from:"ismamed4@gmail.com",
        to:"littleby08@gmail.com",
        subject:"Este es una prueba para que puedas hacer una verificacion de email",
        text:"Esta es una prueba",
    }
    
    try{
    const result = await transport.sendMail(mailOptions);
    console.log("Correo enviado");
    
    }catch(error){
        console.log("Email Wrong", error);
        
    }

}
sendMail();

module.exports = sendMail;