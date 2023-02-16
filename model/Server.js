const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
    },
    serverImage:
    {
        type: String,
        default: 'none'
    },
    users:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = mongoose.model('Server', serverSchema);