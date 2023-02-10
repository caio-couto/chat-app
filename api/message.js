const router = require('express').Router();
const User = require('../model/User');
const Server = require('../model/Server');
const Channel = require('../model/Channel');
const Message = require('../model/Message');

router.get('/channel/:channelId', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const channelId = req.params.channelId;

    const messages = await Message.find({channel: channelId}).populate('sender')
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    res.status(200).send(messages);
});

router.post('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const { content, channel, isInvite } = req.body;

    const newMessage = await (await Message.create({content: content, channel: channel, sender: req.user._id, isInvite: isInvite ? isInvite : false})).populate('sender')
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    res.status(200).send(newMessage);
});

router.delete('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const { messageId } = req.body;

    await Message.findByIdAndDelete(messageId)
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    res.sendStatus(200);
});

module.exports = router;