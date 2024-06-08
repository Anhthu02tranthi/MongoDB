const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Genres = require('../models/genre');
const genreRouter = express.Router();

genreRouter.use(bodyParser.json());

genreRouter.route('/')

    .get((req, res, next) => {
        Genres.find({})
            .then((Genres) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Genres);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Genres.create(req.body)
            .then((genre) => {
                console.log('genre Created', genre);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(genre);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /Genres');
    })
    .delete((req, res, next) => {
        Genres.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

genreRouter.route('/:genreId')
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
        res.end('Post operation not supported on /Genres/' + req.params.genreId);
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

module.exports = genreRouter;