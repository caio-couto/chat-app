const router = require('express').Router();
const User = require('../model/User');
const Server = require('../model/Server');
const Channel = require('../model/Channel');
const multer = require('multer');
const upload = multer({dest: 'public/images/server/'});
const path = require('path');
const fs = require('fs');

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

router.get('/:serverId', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const serverId = req.params.serverId;

    const server = await Server.findById(serverId)
    .catch((error) =>
    {
        console.log(error); 
        res.sendStatus(500);
    });

    return res.status(200).send(server);
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

router.put('/:serverId', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const userId = req.body.userId;
    const serverId = req.params.serverId;

    await Server.findByIdAndUpdate(serverId, {$addToSet: {users: userId}});

    res.sendStatus(200);
});

router.post('/:serverId/profilePic', upload.single('croppedImage'), async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    if(!req.file)
    {
        return res.sendStatus(400);
    }

    const serverId = req.params.serverId;

    const filePath = `/public/images/server/${req.file.filename}.png`;
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `../${filePath}`);

    const server = await Server.findById(serverId)
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    if(server.serverImage != 'none')
    {   
        const targetPath = path.join(__dirname, `../${server.serverImage}`);
        await fs.unlink( targetPath, (error) =>
        {
            if(error)
            {
                console.log(error);
                return res.sendStatus(500)
            }
        })
    }

    fs.rename(tempPath, targetPath, async (error) =>
    {
        if(error)
        {
            console.log(error);
            return res.sendStatus(500);
        }

        await Server.findByIdAndUpdate(serverId, {serverImage: filePath})
        .catch((error) =>
        {
            console.log(error);
            return res.sendStatus(500);
        });
    
        return res.sendStatus(200);
    });
});

module.exports = router;