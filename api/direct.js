const router = require('express').Router();
const Direct = require('../model/Direct');

router.get('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const directs = await Direct.find({users: {$elemMatch: { $eq: req.user._id }}}).populate('users')
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    return res.status(200).send(directs);
});

router.post('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const users = req.body.users;

    if(users.length == 0)
    {
        return res.sendStatus(400)
    }

    users.push(req.user._id);

    const chatData =
    {
        users: users,
        isGroupDirect: req.body.isGroupDirect
    };

    await Direct.create(chatData)
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    res.sendStatus(200);
});

router.post('/invite', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const selected = req.body.users;

    if(selected.length == 0)
    {
        return res.sendStatus(400)
    }

    let directs = [];

    try
    {   
        await Promise.all(
        selected.map( async (user) =>
        {
            const direct = await Direct.findOne({users: [user, req.user._id]});
            console.log(direct, user);
            directs.push(direct);
        }));

        return res.status(200).send(directs);
    }
    catch(error)
    {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;