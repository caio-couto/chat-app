const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../model/Token');
const dotenv = require('dotenv').config();

router.post('/login', async (req, res) =>
{
    const { email, password } = req.body;
    const user = await User.findOne({email})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    if(!user)
    {
        return res.sendStatus(400);
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match)
    {
        return res.sendStatus(400);
    }

    const accessToken = genToken(user, process.env.ACCESSKEY);
    const refreshToken = genToken(user, process.env.REFRESHKEY);

    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 15)

    await Token.create({token: refreshToken, expireAt: expireAt})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    const payload = genPayload(user);

    payload.accessToken = accessToken;
    payload.refreshToken = refreshToken;

    res.status(200).send(payload);
});

router.post('/refresh', async (req, res) =>
{
    let tokenRefresh = req.body.token;

    if(!tokenRefresh)
    {
        return res.sendStatus(401);
    }

    const tokenExist = await Token.findOne({token: tokenRefresh})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    if(!tokenExist)
    {
        console.log(tokenExist + 'exist');
        return res.sendStatus(403);
    }

    const verifyToken = jwt.verify(tokenRefresh, process.env.REFRESHKEY);

    await Token.deleteOne({token: tokenRefresh})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    if(!verifyToken._id)
    {
        console.log(verifyToken);
        return res.sendStatus(403);
    }  

    const newAccessToken = genToken(verifyToken, process.env.ACCESSKEY);
    const newRefreshToken = genToken(verifyToken, process.env.REFRESHKEY);

    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 15)

    const newToken = await Token.create({token: newRefreshToken,  expireAt: expireAt})
    .catch((error) =>
    {
        console.log(error);
        return res.sendStatus(500);
    });

    res.status(200).send({accessToken: newAccessToken, refreshToken: newRefreshToken});
});

function genPayload(user)
{
    const payload = 
    {
        username: user.username,
        discriminator: user.discriminator
    }
    return payload;
}

function genToken(user, secret)
{
    const token = jwt.sign({_id: user._id}, secret, {expiresIn: '15m'});
    return token;
}

async function discriminatorValidate(username, discriminator)
{
    const results = await User.findOne({ $and: [{username: username}, {discriminator: discriminator}]})
    .catch((error) =>
    {
        console.log(error);
    });

    if(results !== null)
    {
        return await discriminatorValidate(username, genDiscriminator());
    }
}

function genDiscriminator()
{
    function genRandomNumber()
    {
        return Math.floor(Math.random() * 9);
    }

    return `${genRandomNumber()}${genRandomNumber()}${genRandomNumber()}`;
}

module.exports = router;