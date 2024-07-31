import { pool } from "./database/mysql_conection.js";

const getusuarios= async ()=>{
    try{
        const [result] = await pool.query("SELECT user_id, user_username, user_email, password FROM usuarios;");
        console.table(result);
    }catch(error){
        console.error(error);
    }
};

getusuarios();