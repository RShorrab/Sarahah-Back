const userRouter = require('express').Router()
const {auth} = require('../../middleware/auth')
const user = require('./controller/user')
const endPoint = require('./user.endPoint')
const {validation} = require('../../middleware/validation') 
const { updateUserValidation } = require('./user.validation')

userRouter.get('/user/profile', auth(endPoint.profile), user.profile)
userRouter.get('/user/Messages', auth(endPoint.displayMessages), user.messages)
userRouter.delete('/user/deleteUser', auth(endPoint.deleteUser), user.deleteUser)
userRouter.patch('/user/updateUser', auth(endPoint.updateUser), validation(updateUserValidation), user.updateUser)


module.exports = userRouter