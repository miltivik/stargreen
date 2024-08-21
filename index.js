import express from "express";
import morgan from "morgan";
import conexion from "./database/mysql_conection.cjs";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import connectMongo from "./database/mongodb.cjs";
import  User  from "./models/User.cjs";
import UserOTPVerification from "./models/UserOTPVerification.cjs";
import nodemailer from 'nodemailer';
import {v1} from 'uuid';
import mongoose from "mongoose";
import JsonWebToken from "jsonwebtoken";


//Conexion de MongoDB
mongoose.connect('mongodb://localhost:27017/email_db');
connectMongo()
//fix para __dirname
import path from "path";
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import { time } from "console";


//Server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("servidor corriendo en el puerto",app.get("port"));

app.get('/productos',(req,res) => {
  res.send('mensaje recibido')
});

//Middlewares
app.use(morgan('dev'))

//motor de plantillas
app.set("view engine","ejs");

app.get("/", function(req,res){
  res.render("registro");
});

app.get("/login.ejs", function(req,res){
  res.render("login");
});

app.get("/profile-page.ejs", function(req,res){
    res.render("profile-page");
  });
//Escuchando MongoDB
app.listen(3001, () =>{
    console.log("mongoDB Running");
})
//dotenv config
dotenv.config({path:'/env/.env'});

//configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded ({extended: false}));

// Rutas
//app.get("/",(req,res)=> res.sendFile (__dirname + "/HTML/login.html"));
app.get("/email-recuperacion.html",(req,res)=> res.sendFile (__dirname + "/HTML/email-recuperacion.html"));
app.get("/register",(req,res)=> res.sendFile (__dirname + "/HTML/register.html"));
app.get("/producto.html",(req,res)=> res.sendFile (__dirname + "/HTML/producto.html"));
app.get("/index.html",(req,res)=> res.sendFile (__dirname + "/HTML/index.html"));
app.get("/sobre%20nosotros.html",(req,res)=> res.sendFile (__dirname + "/HTML/sobre nosotros.html"));
app.get("/contacto.html",(req,res)=> res.sendFile (__dirname + "/HTML/contacto.html"));
app.get("/menu-producto.html",(req,res)=> res.sendFile (__dirname + "/HTML/menu-producto.html"));
app.get("/pasarela.html",(req,res)=> res.sendFile (__dirname + "/HTML/pasarela.html"));
app.post("/api/register",authentication.register);
app.post("/api/login",authentication.login);
app.get("/OTP.html",(req,res)=> res.sendFile (__dirname + "/HTML/OTP.html"));

app.post('/valid', async(req,res)=>{
    const datos = req.body

    let user_username = datos.user
    let user_email = datos.user_email;
    let password = datos.password;

    let passwordHash = await bcryptjs.hash(password,8);

    conexion.query ('INSERT INTO usuarios SET ?',{user_username:user_username, user_email:user_email, password:passwordHash}, async(error,results)=>{
        if (error) {
            res.render("registro",{
                alert_1:true,
                alert_1Title:'Error',
                alert_1Message:'Algo a ocurrido mal, intentalo mas tarde',
                alert_1Icon:"error",
                showConfirmButtom_1:false,
                ruta_1:''
            })
        console.log (error)
        }else{
            res.render("registro",{
                alert:true,
                alertTitle:'Registro',
                alertMessage:' Registro Exitoso',
                alertIcon:"success",
                showConfirmButtom:false,
                ruta:''
            })
        }
    })

});


//obtener datos para mysql
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));

//autenticar register
app.post ('/auth', async (req,res) =>{
    const user = req.body.user;
    const pass = req.body.password;
    let passwordHash = await bcryptjs.hash(pass,8);
    if(user && pass){
        conexion.query('SELECT * from usuarios WHERE user_username = ?', [user], async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].password))){
                res.render("login.ejs",{
                    alert_login_error:true,
                    alert_login_errorTitle:'Error',
                    alert_login_errorMessage:'Algo a ocurrido mal, intentalo mas tarde',
                    alert_login_errorIcon:"error",
                    showConfirmButtom_login_error:false,
                    ruta_login_error:'login.ejs'
                })
            }else{
                const token = JsonWebToken.sign(
                    {user_username:user_username},
                    process.env.JWT_SECRET,
                    {expiresIn:process.env.JWT_EXPIRATION}
                )

                const coockieOption = {
                    expires: new Date(Date.now()+process.env.JWT_COOCKIE_EXPIRATION * 24 * 60 * 60 * 1000),
                    path: "/"
                }

                res.render("login.ejs",{
                    alert_login_success:true,
                    alert_login_successTitle:'Logueado con Exito',
                    alert_login_successMessage:'Login Exitoso',
                    alert_login_successIcon:"success",
                    showConfirmButtom_login_success:false,
                    timer:1500,
                    ruta_login_success:'index.html'
                })
                res.coockieOption("jwt",token,coockieOption);
                res.send({status:'ok', message:'Usuario con coockies correctamente', redirect:'/HTML/index.html'})
            }
        })
    }else{
        res.render("login.ejs",{
            alert_login_missing:true,
            alert_login_missingTitle:'Error',
            alert_login_missingMessage:'Ingresa un usuario y/o una contraseña',
            alert_login_missingIcon:"warning",
            showConfirmButtom_login_missing:false,
            timer:1500,
            ruta_login_missing:'login.ejs'
        })
    }
})

// NODEMAILER STUFF
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {

    }
});

const users = []
