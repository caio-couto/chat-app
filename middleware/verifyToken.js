const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function verifyToken(req, res, next)
{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESSKEY, (error, user) =>
        {
            if(error)
            {
                console.log('paia');
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    }
    else
    {
        console.log('bosta');
        res.sendStatus(401);
    }
}

module.exports = verifyToken;