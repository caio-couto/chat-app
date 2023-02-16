const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const multer = require('multer');
const upload = multer({dest: 'public/images/user/'});
const path = require('path');
const fs = require('fs');


router.get('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const userId = req.user._id;
    const user = await User.findOne({_id: userId}).populate('friends')
    .catch((error) =>
    {
        console.log(error)
        return res.sendStatus(500);
    });

    const { password, ...rest} = user._doc;

    const payload = rest;

    res.status(200).send(rest)
});

router.put('/addFriend', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const friendUsername = req.body.friendUsername;

    if(!friendUsername.trim())
    {
        return res.sendStatus(400);
    }

    const username = friendUsername.split('#')[0];
    const discriminator = friendUsername.split('#')[1];

    const friend = await User.findOne({ $and: [{username: username}, {discriminator: discriminator}]})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    if(!friend)
    {
        return res.sendStatus(400);
    }

    await User.findByIdAndUpdate(req.user._id, {$addToSet: {friends: friend._id}})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    await User.findByIdAndUpdate(friend._id, {$addToSet: {friends: req.user._id}})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    res.status(200).send(friend);

});

router.post('/profilePic', upload.single('croppedImage'), async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    if(!req.file)
    {
        return res.sendStatus(400);
    }

    const userId = req.user._id;

    const filePath = `/public/images/user/${req.file.filename}.png`;
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `../${filePath}`);

    const user = await User.findById(userId)
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    if(user.profilePic != 'none')
    {   
        const targetPath = path.join(__dirname, `../${user.profilePic}`);
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

        await User.findByIdAndUpdate(userId, {profilePic: filePath})
        .catch((error) =>
        {
            console.log(error);
            return res.sendStatus(500);
        });
    
        return res.sendStatus(200);
    });
});

module.exports = router;