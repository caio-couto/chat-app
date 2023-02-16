const router = require('express').Router();
const path = require('path');

router.get('/images/server/:path', async (req, res) =>
{
    return res.sendFile(path.join(__dirname, '../public/images/server/' + req.params.path));
});
router.get('/images/user/:path', async (req, res) =>
{
    return res.sendFile(path.join(__dirname, '../public/images/user/' + req.params.path));
});

module.exports = router;