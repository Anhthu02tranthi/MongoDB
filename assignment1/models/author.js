const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    birthYear: Number,

    country: {
        type: String,
        require: true
    },
})
  

var Author = mongoose.model('Author', authorSchema);
module.exports = Author;

