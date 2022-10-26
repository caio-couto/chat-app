const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
{
    content:
    {
        type: String,
        required: true
    },
    sender:
    {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    channel:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Channel',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);