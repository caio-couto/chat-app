const Server = require('../model/Server');

module.exports.getAllServers = (req, res) =>
{
    Server.find().populate('users').populate('chanels')
    .then((data) =>
    {
        res.json({msg: 'Servidores encontrados com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidores não enconrados', error}));
}
module.exports.createServer = (req, res) =>
{
    const { name, users, chanels } = req.body;

    Server.create({name, users, chanels})
    .then((data) =>
    {
        res.json({msg: 'Servidor criado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não criado', error}));
}
module.exports.editServer = (req, res) =>
{
    const id = req.params.id;
    const { name } = req.body;

    Server.findByIdAndUpdate(id, {name}, { $push: { chanels: chanels } })
    .then((data) =>
    {
        res.json({msg: 'Servidor editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não editado', error}));
}
module.exports.newChanelServer = (req, res) =>
{
    const id = req.params.id;
    const { chanels } = req.body;

    Server.findByIdAndUpdate(id, { $push: { chanels } })
    .then((data) =>
    {
        res.json({msg: 'Servidor editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não editado', error}));
}
module.exports.newUserServer = (req, res) =>
{
    const id = req.params.id;
    const { users } = req.body;

    Server.findByIdAndUpdate(id, { $push: { users } })
    .then((data) =>
    {
        res.json({msg: 'Servidor editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não editado', error}));
}
module.exports.deleteChanelServer = async (req, res) =>
{
    const id = req.params.id;
    const { chanels } = req.body;
    
    Server.updateOne({_id: id}, { $pullAll: [{ chanels }] })
    .then((data) =>
    {
        res.json({msg: 'Servidor editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não editado', error}));
}
module.exports.deleteUserServer = async (req, res) =>
{
    const id = req.params.id;
    const { users } = req.body;
    
    Server.updateOne({_id: id}, { $pullAll: [{ users }] })
    .then((data) =>
    {
        res.json({msg: 'Servidor editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não editado', error}));
}
module.exports.deleteServer = (req, res) =>
{
    const id = req.params.id;
    Server.findByIdAndDelete(id)
    .then((data) =>
    {
        res.json({msg: 'Servidor deletado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Servidor não deletado', error}));
}