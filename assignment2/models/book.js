const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:{
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

var bookSchema = new Schema({
    isbn:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    subTitle:{
        type: String,
        required: true
    },
    publish_date:{
        type: Date,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    pages:{
        type: Date,
        required: true
    },
    price:{
        type: Currency,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    comments:[commentSchema],
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    }],
}, 
{
    timestamps: true
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;