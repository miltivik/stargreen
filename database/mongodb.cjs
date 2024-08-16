const mongoose = require('mongoose');

const connectDB = async () => {
    try{
    const cn = await mongoose.connect('mongodb://127.0.0.1/email_db')
    cn.STATES.connected
    ? console.log('MongoDB connect')
    : console.log('Error in MongoDB')
    } catch(error){
        console.error()
    }
}

module.exports = connectDB;