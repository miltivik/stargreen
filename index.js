import express from "express";
import morgan from "morgan";
import conexion from "./database/mysql_conection.cjs";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

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
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("registro");
});

app.get("/login.ejs", function(req,res){
  res.render("login");
});

//dotenv config
dotenv.config({path:'/env/.env'});

//configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded ({extended: false}));

// Rutas
//app.get("/",(req,res)=> res.sendFile (__dirname + "/HTML/login.html"));
app.get("/register",(req,res)=> res.sendFile (__dirname + "/HTML/register.html"));
app.get("/producto.html",(req,res)=> res.sendFile (__dirname + "/HTML/producto.html"));
app.get("/index.html",(req,res)=> res.sendFile (__dirname + "/HTML/index.html"));
app.get("/sobre%20nosotros.html",(req,res)=> res.sendFile (__dirname + "/HTML/sobre nosotros.html"));
app.get("/contacto.html",(req,res)=> res.sendFile (__dirname + "/HTML/contacto.html"));
app.get("/menu-producto.html",(req,res)=> res.sendFile (__dirname + "/HTML/menu-producto.html"));
app.get("/pasarela.html",(req,res)=> res.sendFile (__dirname + "/HTML/pasarela.html"));
app.post("/api/register",authentication.register);
app.post("/api/login",authentication.login);

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
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass,8);
    if(user && pass){
        conexion.query('SELECT * from usuarios WHERE user_username = ?', [user], async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.send ('Usuario o Contrasenia incorrectas');
            }else{
                res.send ('LOGIN CORRECTO')
            }
        })
    }
})