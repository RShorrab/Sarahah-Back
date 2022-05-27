const userModel = require('../../../DB/model/user.model')

const signup = async (req, res)=>
{
    try
    {
        const {name, email, password} = req.body;
        const user = new userModel({name, email, password});
        const savedUser = await user.save()
        res.json({message: 'signup Done', savedUser})
    }
    catch(error)
    {
        if(error.keyValue?.email)
        {
            res.json({message: 'email exists', error})
        }
        else
        {
            res.json({message: 'signup catch error', error})
        }
    }
}

module.exports =  signup