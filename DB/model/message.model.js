const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    messageBody: {type: String, required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

}, {timestamps: true})

const messageModel = mongoose.model('Message', messageSchema)
module.exports = messageModel