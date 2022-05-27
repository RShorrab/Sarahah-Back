const joi = require("joi");

const updateUserValidation = 
{
    body: joi.object().required().keys(
        {
            name: joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)).messages(
                {
                    'string.empty': 'pls fill in ur name',
                    'any.required': 'pls fill in ur name',
                    'string.base': 'pls enter a valid name char',
                    'string.pattern.base': 'pls enter a valid name'
                }),
            age: joi.number().min(12).max(60),
            phone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)), //Egyptian 
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
            cpassword: joi.string().valid(joi.ref('password')).required()
        })
}


module.exports = 
{
    updateUserValidation
}