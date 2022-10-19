const Message = require('../model/Message');

module.exports.getAllMessages = (req, res) =>
{
    Message.find().populate('chanel')
    .then((data) =>
    {
        res.json({msg: 'Mensagens encontrados com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Mensagens não enconrados', error}));
}
module.exports.createMessage = (req, res) =>
{
    const { content, sender, chanel } = req.body;

    Message.create({content, sender, chanel})
    .then((data) =>
    {
        res.json({msg: 'Mensagens criado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Mensagens não criado', error}));
}
module.exports.editMessage = (req, res) =>
{
    const id = req.params.id;
    const { content, sender, chanel } = req.body;

    Message.findByIdAndUpdate(id, {content, sender, chanel})
    .then((data) =>
    {
        res.json({msg: 'Mensagens editado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Mensagens não editado', error}));
}
module.exports.deleteMessage = (req, res) =>
{
    const id = req.params.id;
    Message.findByIdAndDelete(id)
    .then((data) =>
    {
        res.json({msg: 'Mensagens deletado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Mensagens não deletado', error}));
}