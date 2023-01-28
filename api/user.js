const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.get('/', async (req, res) =>
{
    if(!req.user)
    {
        return res.sendStatus(403);
    }

    const userId = req.user._id;
    const user = await User.findOne({_id: userId})
    .catch((error) =>
    {
        console.log(error)
        return res.sendStatus(500);
    });

    const { password, ...rest} = user._doc;

    const payload = rest;

    res.status(200).send(rest)
});

module.exports = router;