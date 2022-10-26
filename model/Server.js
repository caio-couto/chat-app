const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
    },
    users:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    channels:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Channel',
        }
    ]
});

module.exports = mongoose.model('Server', serverSchema);