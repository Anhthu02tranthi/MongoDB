const express = require('express');
const bodyParser = require('body-parser');

const booksRouter = express.Router();
const Books = require('../models/book')

booksRouter.use(bodyParser.json());

booksRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
// .get((req, res, next) => {
//     res.end('Will send all the bookses to you!');
// })
.get((req, res, next) => {
    Books.find({})
        .then((books) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(books);
        }, (err) => next(err))
        .catch((err) => next(err));
})
// .post((req, res, next) => {
//     res.end('Will add the books type: ' + req.body.type + ' with name: ' + req.body.name + ' with price: ' + req.body.price);
// })

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

// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('Put operation not supported on /bookses');
// })

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /books');
})

// .delete((req, res, next) => {
//     res.end('Deleting all bookss');
// });

.delete((req, res, next) => {
    Books.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

// booksRouter.route('/:bookssId').all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res, next) => {
//     res.end('Will send details of the books: ' + req.params.booksId + ' to you!');
// })
// .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end('Post operation not supported on /bookses/' + req.params.booksId);
// })
// .put((req, res, next) => {
//     res.write('Updating the books: ' + req.params.booksId + '\n');
//     res.end('Will update the books: ' + req.body.type + ' with name: ' + req.body.name + ' with price: ' + req.body.price);
// })
// .delete((req, res, next) => {
//     res.end('Deleting books: ' + req.params.booksId);
// });

booksRouter.route('/:bookId')
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
        res.end('Post operation not supported on /books/' + req.params.bookId);
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


module.exports = booksRouter;
