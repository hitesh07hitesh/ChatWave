const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
};

const register = async (req, res) => {
    try {
        const { name, username, email, password, gender, image } = req.body;

        if (!name || !username || !email || !password || !gender) {
            return res.status(400).json({ Message: "Please Enter all the Fields" });
        }

        const userExists = await User.findOne({ email });
        const userNameExists = await User.findOne({ username });


        if (userExists) {
            return res.status(400).json({ Message: "User already exists" });
        }

        if (userNameExists) {
            return res.status(400).json({ Message: "Username already exists" });
        }

        const user = await User.create({
            name, username, email, password, gender, image
        });

        return res.status(201).json({
            token: generateToken(user._id),
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            gender: user.gender,
            pic: user.pic
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Some internal error", error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ Message: "Please Enter all the Fields" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
            token: generateToken(user._id),
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            gender: user.gender,
            pic: user.pic
        });
    } else {
        return res.status(400).json({ Message: "Invalid user or password" });
    }
};



const allUsers = async (req, res) => {
    try {
        const keyword = req.query.search ?
            {
                $or: [
                    { name: { $regex: req.query.search, $options: "i" } },
                    { username: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } },
                ]
            }
            : {};
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
        res.send(users)
    } catch (error) {
        console.log(error)
    }

}

module.exports = { register, login, allUsers };