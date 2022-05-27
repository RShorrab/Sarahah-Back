const userModel = require('../../../DB/model/user.model')
const messageModel = require('../../../DB/model/message.model')


const profile = async (req, res)=>
{
    try
    {
        const user = await userModel.findById(req.user._id).select('name age phone email role loginStatus -_id')
        user.loginStatus = req.user.loginStatus
        res.json({message: 'Profile displayed successfully', user })
    }
    catch(error)
    {
        console.log(error)
        res.json({message: 'Profile displaying error', error})
    }
}

const messages = async (req, res)=>
{
    try
    {
        const messagesList = await messageModel.find({receiverId: req.user._id})
        res.json({message: 'Messages displayed successfully', messagesList })
    }
    catch(error)
    {
        console.log(error)
        res.json({message: 'Messages displaying error', error})
    }
}

const deleteUser = async (req, res)=> 
{
    try
    {
        const userId = req.headers['userId'] //in case it's the admin who is deleting the user.
        const user = await userModel.deleteOne({$or: [{_id: req.user._id}, {_id: userId}]})  
        {user.deletedCount==0? res.json({message: 'user already deleted'}): res.json({message: 'user deleted successfully!', user})}
    }
    catch(error)
    {
        console.log(error)
        res.json({message: 'deleting user failed!', error})
    }

}

const updateUser = async (req, res)=>
{
    try
    {
        const {name, age, phone, email, password} = req.body
        const user = await userModel.updateOne({_id: req.user._id}, {name, age, phone, email, password})  
        res.json({message: 'user updated successfully!', user})
    }
    catch(error)
    {
        console.log(error)
        res.json({message: 'updating user failed!', error})
    }
}


module.exports = 
{
    profile,
    messages,
    deleteUser,
    updateUser
}