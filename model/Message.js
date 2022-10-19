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
        type: String,
        required: true
    },
    chanel:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Chanel'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);