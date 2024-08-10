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

app.post('/valid', function(req,res){
    const datos = req.body

    let user_username = datos.user
    let user_email = datos.user_email;
    let password = datos.password;

    /*let buscar = "SELECT * FROM usuarios WHERE user_username = "+user_username +" ";
    conexion.query(buscar, function(error,row){
        if (error){
            throw error
        }else{
            if(row.length>0){
                console.log("No se puede registrar, usuario ya existente");
            }
        }
    });
*/
    let registrar = "INSERT INTO `usuarios` (`user_id`, `user_username`, `user_email`, `password`) VALUES (NULL, '"+user_username+"', '"+user_email+"', '"+password+"')"
    conexion.query(registrar, function(error){
        if (error) {
            let mensaje;
            mensaje = "Los datos ya existen";
            res.render("registro", {mensaje});
        }else{
            let mensaje1;
            mensaje1 = "Registro exitoso!";
            res.render("registro", {mensaje1});
        }
    })
});

//obtener datos para mysql
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));

//autenticar register 
app.post