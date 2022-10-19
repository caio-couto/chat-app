require('dotenv').config();
const { connect } = require('mongoose');

connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>
{
    console.log('Servidor conectado com sucesso');
})
.catch((error) => console.log(error));