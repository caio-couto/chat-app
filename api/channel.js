const router = require('express').Router();
const User = require('../model/User');
const Server = require('../model/Server');
const Channel = require('../model/Channel');

router.get('/server/:serverId', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const serverId = req.params.serverId;

    const channels = await Channel.find({ belongsTo: serverId})
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    res.status(200).send(channels);
});

router.post('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const { chatName, description, belongsTo, isDirect } = req.body;

    const newChannel = await Channel.create({chatName, description, belongsTo, isDirect})
    .catch((error) =>
    {
        console.log(error); 
        return res.sendStatus(500);
    });

    res.status(200).send(newChannel);
});


module.exports = router;