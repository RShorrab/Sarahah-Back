const messageRouter = require('express').Router()
const message = require('./controller/message')
const {validation} = require('../../middleware/validation')
const {sendMessageValidation, deleteMessageValidation} = require('./message.validation')
const {auth} = require('../../middleware/auth')
const endPoint = require('./message.endPoint')


messageRouter.post('/message/sendMessage/:receiverId', validation(sendMessageValidation), message.sendMessage)
messageRouter.delete('/message/deleteMessage/:messageId', validation(deleteMessageValidation), auth(endPoint.deleteMessages), message.deleteMessage)





module.exports = messageRouter