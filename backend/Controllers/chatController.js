const Chat = require('../Models/chatModel')
const User = require('../Models/userModel')

const accessChat = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ Message: "userId parameter not sent with the request" });
        }

        let isChat = await Chat.find({
            isGroupChat: false,
            users: { $all: [req.user._id, userId] }
        })
            .populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email"
        });

        if (isChat.length > 0) {
            return res.json(isChat[0]);
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            };

            const createdChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password")
                .populate("latestMessage");

            return res.status(200).json(fullChat);
        }
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error", error });
    }
};


const fetchAllChats = async (req, res) => {
    try {
        const results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .exec(); // Add exec() to convert the query to a promise

        const populatedResults = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
        });

        res.status(200).send(populatedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: "Internal Server Error", error });
    }
};

const createGroupChat = async (req, res) => {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).send({ message: "Please fill all the fields" });
        }

        let users;

        try {
            users = JSON.parse(req.body.users);
        } catch (parseError) {
            return res.status(400).json({ Message: "Error parsing users JSON", error: parseError });
        }

        if (users.length < 2) {
            return res.status(400).send("More than 2 users are required to form a group chat");
        }

        users.push(req.user);

        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);

    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: "Internal Server Error", error });
    }
};


const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName: chatName },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json({ message: "Chat renamed successfully", chat: updatedChat, });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};





const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId },
            },
            {
                new: true,
            }
        );

        if (!updatedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Re-query the chat to get the updated document
        const populatedChat = await Chat.findById(updatedChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .exec();

        res.status(200).json({ message: "User added to the group", chat: populatedChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId },
            },
            {
                new: true,
            }
        );

        if (!updatedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const populatedChat = await Chat.findById(updatedChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .exec();

        res.status(200).json({ message: "User removed from the group", chat: populatedChat, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { accessChat, fetchAllChats, createGroupChat, renameGroup, removeFromGroup, addToGroup }