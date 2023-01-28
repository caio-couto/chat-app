const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
{
    token:
    {
        type: String,
    },
    expireAt:
    {
        type: Date, 
    }
});

tokenSchema.path('expireAt').index({ expires: 900 });

module.exports = mongoose.model('Token', tokenSchema);