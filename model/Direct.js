const mongoose = require('mongoose');

const directSchema = new mongoose.Schema(
{
    chatName:
    {
        type: String,
        trim: true
    },
    isGroupDirect:
    {
        type: Boolean,
        default: false
    },
    users:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('Direct', directSchema);