var express = require("express");

module.exports = function() {
    var router = express.Router();

    router.use(function(req, res, next) {
        // do logging
        console.log({
            "method": req.method,
            "url": req.url
        });
        next(); // make sure we go to the next routes and don't stop here
    });

    router.get('/', function(req, res) {
        res.json({ ok: true, res: 'API Online' });
    });

    router.get('/getparam/:var', function(req, res) {
        var getRequestParam = req.params.var.toUpperCase();
        res.json({ ok: true, res: 'Variable: ' + getRequestParam });
    });

    router.post('/postdata', function(req, res) {
        var postBody = req.body;
        res.json({ ok: true, res: 'Post Body: ' + postBody });
    });


    return router;
}