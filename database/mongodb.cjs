const mongoose = require('mongoose');

const DB_URI = `mongodb://localhost:27017/email_db`

module.exports = () => {

    const connectMongo = () => {

        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                userNewUrlParser: true,
                useUnifiedTopology:true
            },
            (err) => {
                if (err) {
                    console.log("DB: ERROR");
                }else{
                    console.log('Conexion correcta');
                }
            }
        )
        connectMongo ();
    }

}
