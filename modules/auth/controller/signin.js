const userModel = require('../../../DB/model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signin = async (req, res)=>
{
    try
    {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(user)
        {
            const match = await bcrypt.compare(password, user.password)
            if(match)
            {
                const token = jwt.sign({id: user._id, loginStatus: true}, process.env.TokenSignature, {expiresIn: '1h'})
                res.json({message: 'signin Done', token})
            }
            else
            { 
                res.json({message: `wrong password! pls try again`})
            }
        }
        else
        {
            res.json({message: 'invalid email'})
        }
        
    }
    catch(error)
    {
        console.log(error);
        res.json({message: 'signin catch error', error})
    }
}

module.exports = signin