const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
{
    chatName:
    {
        type: String,
        required: true,
        min: 3,
        max: 15,
    },
    isDirect:
    {
        type: Boolean,
        default: false
    },
    description:
    {
        type: String,
        max: 20,
    },
    belongsTo:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Server'
    }
});

module.exports = mongoose.model('Channel', channelSchema);