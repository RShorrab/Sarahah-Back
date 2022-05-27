const authRouter = require('express').Router()
const {validation} = require('../../middleware/validation')
const { signupValidation, signinValidation } = require('./auth.validation')
const signup = require('./controller/signup')
const signin = require('./controller/signin')


authRouter.post('/signup', validation(signupValidation), signup)
authRouter.post('/signin', validation(signinValidation), signin)


module.exports = authRouter