const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({

    name: {type: String, required: true},
    age: Number,
    phone: String,
    profilePic: String,    
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    confirmEmail: {type: String, default: false},
    role: {type: String, default: 'User'},
    loginStatus: {type: Boolean, default: false},
    lastLogin: String
}, {timestamps: true})

userSchema.pre('save', async function (next)
{
    this.password = await bcrypt.hash(this.password, parseInt(process.env.ROUNDS)) //parseInt() is necessary as ROUNDS here comes as a String from .env 
    next()
})

userSchema.pre('updateOne', async function (next)
{
    this._update.password = await bcrypt.hash(this._update.password, parseInt(process.env.ROUNDS))    
    next() 
})



const userModel = mongoose.model('User', userSchema)
module.exports = userModel