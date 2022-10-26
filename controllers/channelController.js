const Channel = require('../model/Channel');

module.exports.getAllChannels = (req, res) =>
{
    Channel.find()
    .then((data) =>
    {
        res.json({msg: 'Canais encontrados com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canais não enconrados', error}));
}
module.exports.getOneChannel = (req, res) =>
{
    const id = req.params.id;
    Channel.findById(id)
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json({msg: 'Canais não enconrados', error}));
}
module.exports.getServerChannels = (req, res) =>
{   
    const id = req.params.id;
    Channel.find().where({belongsTo: id})
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json({msg: 'Canais não enconrados', error}));
}
module.exports.createChannel = (req, res) =>
{
    const { name, belongsTo } = req.body;

    Channel.create({name, belongsTo})
    .then((data) =>
    {
        res.json({msg: 'Canal criado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canal não criado', error}));
}
module.exports.editChannel = (req, res) =>
{
    const id = req.params.id;
    const { name } = req.body;

    Channel.findByIdAndUpdate(id, {name, messages})
    .then((data) =>
    {
        res.json({msg: 'Canal editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canal não editado', error}));
}
module.exports.deleteChannel = (req, res) =>
{
    const id = req.params.id;
    Channel.findByIdAndDelete(id)
    .then((data) =>
    {
        res.json({msg: 'Canal deletado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canal não deletado', error}));
}