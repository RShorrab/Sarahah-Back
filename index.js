require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const {authRouter, userRouter, messageRouter } = require('./modules/index.router')
const DBconnection = require('./DB/connection')

app.use(express.json())
app.use(authRouter, userRouter, messageRouter)


DBconnection()
app.get('/', (req,res)=> res.json({message: 'welcome!'}) )
app.listen(port, ()=> console.log(`Running.....`))