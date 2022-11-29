const Server = require('../model/Server');
const User = require('../model/User');

module.exports.getAllServers = (req, res) =>
{
    Server.find()
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json(error));
}
module.exports.getOneServer = (req, res) =>
{
    const id = req.params.id;

    Server.findById(id).populate('users')
    .then((data) =>
    {
        res.json(data)
    })
    .catch((error) => res.json(error));
}
module.exports.getUserServers = (req, res) =>
{
    const id = req.params.id;

    Server.find().where('users[id]').equals(id)
    .then((data) =>
    {   
        res.json(data)
    })
    .catch((error) => res.json(error));
}
module.exports.newUser = (req, res) =>
{
    const id = req.params.id;
    const { user } = req.body;

    Server.findByIdAndUpdate(id, { $push: { users: user } })
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json(error));
}
module.exports.newChannel = (req, res) =>
{
    const id = req.params.id;
    const { channel } = req.body;

    Server.findByIdAndUpdate(id, { $push: { channels: channel } })
    .then((data) =>
    {
        Server.findById(id).populate('users')
        .then((data) =>
        {
            res.json(data)
        })
    })
    .catch((error) => res.json(error));
}
module.exports.createServer = (req, res) =>
{
    const { name } = req.body;
    Server.create({name})
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json(error));
}