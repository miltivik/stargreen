    const mongoose = require('mongoose');
    

    const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
            unique: true
        },

        password:{
            type: String,
            required: true,
        },

        emailToken:{
            type: String,
            required: true,
        },

        isVerified:{
            type: Boolean,
        },

        date:{
            type: Date,
            default: Date.now()

        }

    });

    module.exports = mongoose.model('MUser', userSchema)