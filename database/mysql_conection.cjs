var mysql = require('mysql2');
const { Connection } = require('promise-mysql');

var conexion = mysql.createConnection({
        host:"localhost",
        database:"stargreen",
        user:"root",
        password:""
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("CONEXION EXITOSA")
    }
});

conexion.query("SELECT * from usuarios", function(error,results,fields){
    if(error)
        throw error;

    results.forEach(result => {
        console.table(result);
    });
})

conexion.end();

module.exports = conexion;