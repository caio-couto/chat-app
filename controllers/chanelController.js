const Chanel = require('../model/Chanel');

module.exports.getAllChanels = (req, res) =>
{
    Chanel.find()
    .then((data) =>
    {
        res.json({msg: 'Canais encontrados com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canais não enconrados', error}));
}
module.exports.createChanel = (req, res) =>
{
    const { name, messages } = req.body;

    Chanel.create({name})
    .then((data) =>
    {
        res.json({msg: 'Canal criado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canal não criado', error}));
}
module.exports.editChanel = (req, res) =>
{
    const id = req.params.id;
    const { name } = req.body;

    Chanel.findByIdAndUpdate(id, {name, messages})
    .then((data) =>
    {
        res.json({msg: 'Canal editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canal não editado', error}));
}
module.exports.deleteChanel = (req, res) =>
{
    const id = req.params.id;
    Chanel.findByIdAndDelete(id)
    .then((data) =>
    {
        res.json({msg: 'Canal deletado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Canal não deletado', error}));
}