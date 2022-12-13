const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
        unique: true
    },
    about: 
    {
        type: String,
        max: 50
    },
    avatar:
    {
        data: Buffer,
        contenType: String
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
            direct:
            {
                type: mongoose.Types.ObjectId,
                ref: 'Channel',
                required: true
            },
            friend:
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);