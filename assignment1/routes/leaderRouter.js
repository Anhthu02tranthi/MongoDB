const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leaders type: ' + req.body.type + ' with name: ' + req.body.name + ' with price: ' + req.body.price);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

leaderRouter.route('/:leaderId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send details of the leaders: ' + req.params.leaderId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /leaders/' + req.params.leaderId);
})
.put((req, res, next) => {
    res.write('Updating the leaders: ' + req.params.leaderId + '\n');
    res.end('Will update the leaders: ' + req.body.type + ' with name: ' + req.body.name + ' with price: ' + req.body.price);
})
.delete((req, res, next) => {
    res.end('Deleting leaders: ' + req.params.leaderId);
});


module.exports = leaderRouter;
