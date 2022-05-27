const mongoose = require('mongoose')

const DBconnection = ()=>
{
   mongoose.connect(process.env.DBLink).then( ()=> console.log('DB connected') ).catch( (error)=> console.log(error) )
}

module.exports = DBconnection