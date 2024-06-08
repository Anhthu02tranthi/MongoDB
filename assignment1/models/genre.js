const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var genreSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

var Genres = mongoose.model('Genre', genreSchema);
module.exports = Genres;