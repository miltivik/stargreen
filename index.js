import express from "express";
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

app.post('/validar', function(req,res){
    const datos = req.body;

    let user = datos.user
    let user_email = datos.user_email
    let password = datos.password

    let registrar ="INSER INTO usuarios(user_id,user_username,_user_email,password)"
});

//conexion a la base de datos
//const mysql = import ("mysql");

//let connection = mysql.createConnection({
//    host: "localhost",
//    user: "root",
  //  password: "",
    //database: "Stargreen",
//})

//connection.connect ((err) => {
  //  if(err){
    //    console.error("Error database", err);
      //  return;
   // }
   // console.log ('Conexion Exitosa a la base de datos')
//});

//module.exports = connection;