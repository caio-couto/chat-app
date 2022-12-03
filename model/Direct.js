const mongoose = require('mongoose');

const directScheema = new mongoose.Schema(
{
    name:
    {
        type: String,
        default: 'Direct'
    },
});

module.exports = mongoose.model('Direct', directScheema);