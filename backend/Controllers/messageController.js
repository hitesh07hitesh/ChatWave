const Message = require('../Models/messageModel')
const User = require('../Models/userModel')
const Chat = require('../Models/chatModel')


const allMessage = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name username pic email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

}

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({ Message: "Invalid data passed into the request" });
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


module.exports = { allMessage, sendMessage }