const Channel = require('../model/Channel');
const User = require('../model/User');

module.exports.getAllUser = (req, res) =>
{
    User.find()
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json({msg: 'Usuários não enconrados', error}));
}
module.exports.getUser = (req, res) =>
{
    const id = req.params.id;
    User.findById(id).populate('servers').populate('friends.friend')
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json({msg: 'Usuários não enconrados', error}));
}
module.exports.createUser = (req, res) =>
{
    const { name, about, status } = req.body;

    User.create({name, about, status})
    .then((data) =>
    {
        res.json({msg: 'Usuário criado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Usuário não criado', error}));
}
module.exports.editUser = (req, res) =>
{
    const id = req.params.id;
    const { name, about, status } = req.body;

    User.findByIdAndUpdate(id, {name, about, status})
    .then((data) =>
    {
        res.json({msg: 'Usuário editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Usuário não editado', error}));
}
module.exports.newServerUser = (req, res) =>
{
    const id = req.params.id;
    const { servers } = req.body;

    User.findByIdAndUpdate(id, { $push: { servers } })
    .then((data) =>
    {
        res.json({msg: 'Usuário editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Usuário não editado', error}));
}
module.exports.newFriend = (req, res) =>
{
    const id = req.params.id;
    const { friend } = req.body;

    Channel.create({name: 'direct', isDirect: true})
    .then((channel) =>
    {
        User.findByIdAndUpdate(id, { $push: {friends:{direct: channel._id, friend}}})
        .then((user1) =>
        {
            User.findByIdAndUpdate({_id: friend}, { $push: {friends:{direct: channel._id, friend: id}}})
            .then((user2) =>
            {
                res.json({user1, user2});
            })
            .catch((error) => res.json({error, user:'user2'}));
        })
        .catch((error) => res.json({error, user:'user1'}));
    })
    .catch((error) => res.json({msg: 'Canal não criado', error}))
}
module.exports.deleteServerUser = async (req, res) =>
{
    const id = req.params.id;
    const { servers } = req.body;
    
    User.updateOne({_id: id}, { $pullAll: [{ servers }] })
    .then((data) =>
    {
        res.json({msg: 'Usuário editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Usuário não editado', error}));
}
module.exports.deleteUser = (req, res) =>
{
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then((data) =>
    {
        res.json({msg: 'Usuário deletado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Usuário não deletado', error}));
}