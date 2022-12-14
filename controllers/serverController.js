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

    Server.findById(id).populate('users').populate('channels')
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
    .then(() =>
    {
        User.findByIdAndUpdate({_id: user}, { $push: { servers: id } })
        .then((user) =>
        {
            Server.findById(id)
            .then((server) =>
            {
                res.json(server);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => res.json({msg: 'Usuário não editado', error}));
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
    const { name, isDirect } = req.body;
    Server.create({name, isDirect})
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json(error));
}