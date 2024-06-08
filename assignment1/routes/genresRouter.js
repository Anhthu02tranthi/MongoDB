const express = require('express');
const bodyParser = require('body-parser');

const genresRouter = express.Router();
const Genres = require('../models/genre')

genresRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    Genres.find({})
        .then((genres) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(genres);
        }, (err) => next (err))
        .catch((err) => next(err));
})

.post((req, res, next) => {
    Genres.create(req.body)
        .then((genre) => {
            console.log('Genre Created', genre);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(genre);
        }, (err) => next(err))
        .catch((err) => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /genres');
})

.delete((req, res, next) => {
    Genres.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
})

genresRouter.route('/:genreId')
    .get((req, res, next) => {
        Genres.findById(req.params.genreId)
            .then((genre) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(genre);
            }, (err) => next(err))
            .catch((err) => next(err));
            
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation not supported on /genres/' + req.params.genreId);
    })
    .put((req, res, next) => {
        Genres.findByIdAndUpdate(req.params.genreId, {
            $set: req.body
        }, {new: true})
            .then((genre) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(genre);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Genres.findByIdAndDelete(req.params.genreId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
})

module.exports = genresRouter;

