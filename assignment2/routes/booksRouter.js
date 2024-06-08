const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Books = require('../models/book');
const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .get((req, res, next) => {
        if(req.query.price != null){
        const price = parseFloat(req.query.price); 
        Books.find({ price: { $lte: price } })
            .then((books) => {
                if (books.length > 0) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(books);
                } else {
                    const err = new Error(`No books found with price below ${price}`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
        }else{
            Books.find({})
                .then((Books) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(Books);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    })
    .post((req, res, next) => {
        Books.create(req.body)
            .then((book) => {
                console.log('Book Created', book);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /Books');
    })
    .delete((req, res, next) => {
        Books.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

bookRouter.route('/:bookId')
    .get((req, res, next) => {
        Books.findById(req.params.bookId)
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation not supported on /Books/' + req.params.bookId);
    })
    .put((req, res, next) => {
        Books.findByIdAndUpdate(req.params.bookId, {
            $set: req.body
        }, {new: true})
            .then((book) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Books.findByIdAndDelete(req.params.bookId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
/////////////////////////////
bookRouter.route('/:bookId/comments')
    .get((req, res, next) => {
        Books.findById(req.params.bookId)
        .then((book) => {
            if(book != null){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(book.comments);
            }
            else{
                err = new Error('book ' + req.params.bookId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Books.findById(req.params.bookId)
            .then((book) => {
                if(book != null){
                    book.comments.push(req.body);
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err));
                }
                else{
                    err = new Error('book ' + req.params.bookId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /Books/' + req.params.bookId + '/comments');
    })
    .delete((req, res, next) => {
        Books.findById(req.params.bookId)
            .then((book) => {
                if(book != null){
                    for (var i = (book.comments.length - 1); i >= 0; i--) {
                        if (book.comments[i] && book.comments[i]._id) {
                          book.comments.id(book.comments[i]._id).deleteOne();
                        }
                      }                      
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err));
                }else{
                    err = new Error('book ' + req.params.bookId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    /////
    bookRouter.route('/:bookId/comments/:commentsId')
    .get((req, res, next) => {
        Books.findById(req.params.bookId)
            .then((book) => {
                if(book != null && book.comments.id(req.params.commentsId) != null){
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(book.comments.id(req.params.commentsId));
                }
                else if(book == null){
                    err = new Error('book ' + req.params.bookId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else{
                    err = new Error('comments ' + req.params.commentsId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation not supported on /Books/' + req.params.bookId + '/comments/' + req.params.commentsId);
    })
    .put((req, res, next) => {
        Books.findById(req.params.bookId)
            .then((book) => {
                if(book != null && book.comments.id(req.params.commentsId) != null){
                    if(req.body.rating){
                        book.comments.id(req.params.commentsId).rating = req.body.rating;
                    }
                    if(req.body.comment){
                        book.comments.id(req.params.commentsId).comment = req.body.comment;
                    }
                    if(req.body.author){
                        book.comments.id(req.params.commentsId).author = req.body.author;
                    }
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
                else if(book == null){
                    err = new Error('book ' + req.params.bookId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else{
                    err = new Error('comments ' + req.params.commentsId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Books.findById(req.params.bookId)
            .then((book) => {
                if(book != null && book.comments.id(req.params.commentsId) != null){
                    book.comments.id(req.params.commentsId).deleteOne();
                    book.save()
                        .then((book) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(book);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
                else if(book == null){
                    err = new Error('book ' + req.params.bookId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else{
                    err = new Error('comments ' + req.params.commentsId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            })
    });

    // bookRouter.all('/?price=:price').get((req, res, next) => {
    //     const priceParams = req.params.price
    //     console.log(true);
    //     Books.find({price: {$lt: priceParams}})
    //         .then((book) => {
    //             if(book != null){
    //                 res.statusCode = 200;
    //                 res.setHeader('Content-Type', 'application/json');
    //                 res.json(book);
    //             }else{
    //                 err = new Error('Book have price below ' + priceParams + ' not found');
    //                 err.status = 404;
    //                 return next(err);
    //             }
    //         }, (err) => next(err))
    //         .catch((err) => next(err));
    // })

module.exports = bookRouter;