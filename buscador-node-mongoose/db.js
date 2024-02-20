const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/searchengine');

const customerSchema = new mongoose.Schema({
    nome: String,
    profissao: String,
    tags: [String]
}, { collection: 'customers' }
);

module.exports = { Mongoose: mongoose, CustomerSchema: customerSchema }