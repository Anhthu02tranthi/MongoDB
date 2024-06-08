const mongoose = require('mongoose');
const { subscribe } = require('../routes');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    subscribe: String,
    publish_date: Date,
    publisher: String,
    pages: Number,
    description: String,
    website: String,
})

var Books = mongoose.model('Book', bookSchema);
module.exports = Books;