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

//dotenv config
dotenv.config({path:'/env/.env'});

//configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// Rutas
app.get("/",(req,res)=> res.sendFile (__dirname + "/HTML/login.html"));
app.get("/register",(req,res)=> res.sendFile (__dirname + "/HTML/register.html"));
app.get("/producto.html",(req,res)=> res.sendFile (__dirname + "/HTML/producto.html"));
app.get("/index.html",(req,res)=> res.sendFile (__dirname + "/HTML/index.html"));
app.get("/sobre%20nosotros.html",(req,res)=> res.sendFile (__dirname + "/HTML/sobre nosotros.html"));
app.get("/contacto.html",(req,res)=> res.sendFile (__dirname + "/HTML/contacto.html"));
app.get("/menu-producto.html",(req,res)=> res.sendFile (__dirname + "/HTML/menu-producto.html"));
app.get("/pasarela.html",(req,res)=> res.sendFile (__dirname + "/HTML/pasarela.html"));
app.post("/api/register",authentication.register);
app.post("/api/login",authentication.login);

app.post('./valid', async(req,res) => {
    const datos = req.body;
    const user = req.body.user;
    const user_email = req.body.user_email;
    const password = req.body.password;

    let passwordHaash = await bcryptjs.hash(password, 8);
    conexion.query('INSERT INTO usuarios SET ?', {user:user, user_email:user_email, password:passwordHaash}, async(error, results) =>{
      if(error){
        console.log(error);
      }else{
        res.send('los datos se enviaron con exito')
      }
    })
});

//obtener datos para mysql
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));
