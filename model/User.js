const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    username:
    {
        type: String,
        required: true,
        trim: true
    },
    discriminator:
    {
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    about: 
    {
        type: String,
        max: 50,
        trim: true
    },
    profilePic:
    {
        type: String,
        default: '/images/profilePic.jpeg'
    },
    status:
    {
        type: Boolean
    },
    servers:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Server'
        }
    ],
    friends: 
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);