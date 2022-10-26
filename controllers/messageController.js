const Message = require('../model/Message');

module.exports.getAllMessages = (req, res) =>
{
    Message.find().populate('sender')
    .then((data) =>
    {
        res.json({msg: 'Mensagens encontrados com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Mensagens não enconrados', error}));
}
module.exports.getChannelMessages = (req, res) =>
{
    const channelId = req.params.id;

    Message.find().where({channel: channelId}).populate('sender')
    .then((data) =>
    {
        res.json(data);
    })
    .catch((error) => res.json({msg: 'Mensagens não enconrados', error}));
}
module.exports.createMessage = (req, res) =>
{
    const { content, sender, channel } = req.body;

    Message.create({content, sender, channel})
    .then((data) =>
    {
        res.json({msg: 'Mensagens criado com sucesso', data});
    })
    .catch((error) => res.json({msg: 'Mensagens não criado', error}));
}
module.exports.editMessage = (req, res) =>
{
    const id = req.params.id;
    const { content, sender, channel } = req.body;

    Message.findByIdAndUpdate(id, {content, sender, channel})
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
    .catch((error) => res.json({msg: 'Mensagens não deletado', error}))
}