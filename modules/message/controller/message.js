const userModel = require('../../../DB/model/user.model');
const messageModel = require('../../../DB/model/message.model')


const sendMessage = async (req, res)=>
{
    const {receiverId} = req.params;
    const {messageBody} = req.body;
    const user = await userModel.findById(receiverId).select('name email')
    if(user)
    {
        const messageDetails = await messageModel.insertMany({messageBody, receiverId: user._id})
        res.json({message: 'message sent successfully', messageDetails})
    }
    else
    {
        res.json({message: 'invalid user account!'})
    }
}

const deleteMessage = async (req, res)=>
{
    try
    {
        const {messageId} = req.params;
        const messageDetails = await messageModel.deleteOne({_id: messageId, receiverId: req.user._id})
        {messageDetails.deletedCount==0? res.json({message: 'message already deleted'}): res.json({message: 'message deleted successfully!', messageDetails}) }
    }
    catch(error)
    {
        res.json({message: 'deleting message failed!'})
    }
}

module.exports =
{
    sendMessage,
    deleteMessage
}