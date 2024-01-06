const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name: { type: "String", require: true },
        username: { type: "String", require: true },
        email: { type: "String", require: true },
        password: { type: "String", require: true },
        gender: { type: "String", require: true },
        pic: { type: "String", 
        // default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" 
    },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
    if (this.modified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)

// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         require: true,
//         minlength: 3,
//     },
//     username: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true,
//         minlength: 8
//     },
//     gender: {
//         type: String,
//         require: true,
//         enum: ['Male', 'Female', 'Other']
//     },
//     image: {
//         type: String,
//     }
// });

// module.exports = mongoose.model('User', userSchema);







// const mongoose = require('mongoose')

// const userScema = mongoose.Schema({
//     name: {
//         type: String,
//         require: true,
//         minlength: 3,
//     },
//     username: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true,
//         minlength: 8
//     },
//     gender: {
//         type: String,
//         require: true,
//         enum: ['Male', 'Female', 'Other']
//     },
//     image: {
//         type: String,
//     }
// })

// module.exports = mongoose.model('User', userScema)