const mongoose = require('mongoose');

const chanelSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
});

module.exports = mongoose.model('Chanel', chanelSchema);