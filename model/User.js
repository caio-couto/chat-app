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
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);