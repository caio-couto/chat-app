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
            ref: 'User'
        }
    ],
    chanels:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Chanel'
        }
    ]
});

module.exports = mongoose.model('Server', serverSchema);