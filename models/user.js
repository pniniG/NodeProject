const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true

    },
    weathers:
    [
        { type: mongoose.Types.ObjectId, ref: 'Weather' }
    ],
    admin:{ type: mongoose.Types.ObjectId, ref: 'Admin' },
    
       
    
})
module.exports = mongoose.model('User', userSchema)