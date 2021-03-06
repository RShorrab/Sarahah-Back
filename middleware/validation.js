const dataList = ['body', 'params', 'query'];


const validation = (schema)=>
{
    return (req, res, next)=>
    {

        const errorList = []
        dataList.forEach( key => 
        {
            if(schema[key])
            {
                const validationResault = schema[key].validate(req[key], {abortEarly: false})
                if(validationResault.error)
                {

                    errorList.push(validationResault.error.details)
                }
            }
        })

        {errorList.length? res.json({message: 'validation error', error: errorList}) : next()}

    }
}

module.exports = {validation}