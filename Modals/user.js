const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
       unique: true,
       sparse:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse:true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task',    
        }
      ],
    date: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

module.exports = mongoose.model('user', userSchema)