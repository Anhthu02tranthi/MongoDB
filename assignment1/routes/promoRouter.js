const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the promo to you!');
})
.post((req, res, next) => {
    res.end('Will add the promo type: ' + req.body.type + ' with name: ' + req.body.name + ' with price: ' + req.body.price);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send details of the promotions: ' + req.params.promoId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /promotions/' + req.params.promoId);
})
.put((req, res, next) => {
    res.write('Updating the promotions: ' + req.params.promoId + '\n');
    res.end('Will update the promotions: ' + req.body.type + ' with name: ' + req.body.name + ' with price: ' + req.body.price);
})
.delete((req, res, next) => {
    res.end('Deleting promotions: ' + req.params.promoId);
});


module.exports = promoRouter;
