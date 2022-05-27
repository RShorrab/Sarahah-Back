const joi = require("joi");

const sendMessageValidation = 
{
    body: joi.object().required().keys({
        messageBody: joi.string().min(2).max(50000)
    }),
    params: joi.object().required().keys({
        receiverId: joi.string().min(24).max(24)
    })
}

const deleteMessageValidation = 
{
    params: joi.object().required().keys({
        messageId: joi.string().min(24).max(24)
    })
}

module.exports = 
{
    sendMessageValidation,
    deleteMessageValidation
}