const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
        return res.status(400).json({ Message: "Not authorized, no token" });
    }

    try {
        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(400).json({ Message: "Not authorized, token failed" });
    }
};

module.exports = { protect };


// const jwt = require('jsonwebtoken')
// const User = require('../Models/userModels')

// const protect = async (req, res) => {
//     let token

    

//     if (req.header.authorization &&
//         req.header.authorization.startsWith("Bearer")) {
//         try {
//             token = req.header.authorization.split(" ")[1];

//             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

//             req.user = await User.findById(decoded.id).select("-password")
//             next()
//         } catch (error) {
//             return res.status(400).json({ Message: "Not authorized,token failed" });
//         }
//     }


//     if (!token) {
//         return res.status(400).json({ Message: "Not authorized,no token" });
//     }

// }

// module.exports = { protect };