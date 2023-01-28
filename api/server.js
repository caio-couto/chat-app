const router = require('express').Router();
const User = require('../model/User');
const Server = require('../model/Server');
const Channel = require('../model/Channel');

router.get('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const userId = req.user._id;

    const servers = await Server.find({ users: { $elemMatch: { $eq: userId } }}).populate('users')
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    res.status(200).send(servers);
});

router.post('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const name = req.body.name.trim();
    const userId = req.user._id;

    const newServer = await Server.create({name: name, users: userId})
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    const channel = await Channel.create({chatName: 'Canal geral', belongsTo: newServer._id, description: 'Canal principal', isDirect: false})
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    res.status(200).send(newServer);
});

module.exports = router;