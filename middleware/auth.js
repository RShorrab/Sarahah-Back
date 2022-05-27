const jwt = require("jsonwebtoken")
const userModel = require("../DB/model/user.model")
const Roles =
{
    Admin: 'Admin',
    User: 'User'
}

const auth = (allowedRoles) =>
{
    try
    {
        return async (req, res, next)=>
        {
            const headerToken = req.headers['authorization']
            if(!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith(`${process.env.Bearer} `))
            {
                res.json({message: 'invalid header token'})
            }
            else
            {
                const token = headerToken.split(' ')[1]
                if(!token || token == null || token == undefined || token.length < 1 )
                {
                    res.json({message: 'invalid token'}) 
                }
                else
                {
                    const decodedToken = jwt.verify(token, process.env.TokenSignature) 
                    const user = await userModel.findById(decodedToken.id).select('name age phone email role loginStatus')
                    
                    if(user) 
                    {
                        if(allowedRoles.includes(user.role)) //Final check
                        {
                            req.user = user
                            req.user.loginStatus = decodedToken.loginStatus
                            next()
                        }
                        else
                        {
                            res.json({message: 'user is not authorized to access'})
                        }
                        
                    }
                    else
                    {
                        res.json({message: 'invalid login'}) 
                    }
                }
            }
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({message: 'authentication catch error', error})
    }
}

module.exports = 
{
    auth,
    Roles
}