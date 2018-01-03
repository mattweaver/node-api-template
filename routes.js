var express = require("express");
var fs = require('fs');

module.exports = function() {
    var router = express.Router();

    router.use(function(req, res, next) {
        // do logging
        console.log({
            "method":req.method,
            "url":req.url
        });
        next(); // make sure we go to the next routes and don't stop here
    });

    router.get('/', function(req, res) {
        res.json({ok: true, res: 'API Online'});
    });

    router.get('/setsystem/issue/:system', function(req, res) {
        var systems = ['HPC', 'IPC', 'IPT', 'LPC', 'LPT'];
        var system = req.params.system.toUpperCase();
        if(systems.indexOf(system) == -1)
            res.json({ok: false, res: "Invalid System"});
        fs.readFile('data/json/issue/'+system+'.json', 'utf8', function (err,data) {
            if (err) 
                res.json({ok: false, res: err});
            var jsonOut = data.replace(/\s/g, '').replace(/\r?\n|\r/g, " ");
            fs.writeFile("data/json/selected.json", jsonOut,function(err) {
                if(err) 
                    res.json({ok: false, res: err});
                else
                    res.json({ok: true, res: 'System Set Success'});
            }); 
        });
    });

    router.get('/setsystem/highlight/:system', function(req, res) {
        var systems = ['HPC', 'IPC', 'IPT', 'LPC', 'LPT'];
        var system = req.params.system.toUpperCase();
        if(systems.indexOf(system) == -1)
            res.json({ok: false, res: "Invalid System"});
        fs.readFile('data/json/highlight/'+system+'.json', 'utf8', function (err,data) {
            if (err) 
                res.json({ok: false, res: err});
            var jsonOut = data.replace(/\s/g, '').replace(/\r?\n|\r/g, " ");
            fs.writeFile("data/json/selected.json", jsonOut,function(err) {
                if(err) 
                    res.json({ok: false, res: err});
                else
                    res.json({ok: true, res: 'System Set Success'});
            });
        });
    });

    router.get('/getsystem', function(req, res) {
        fs.readFile('data/json/selected.json', 'utf8', function (err,data) {
            if (err) 
                res.json({ok: false, res: err});
            else
                res.json({ok: true, res: data});
        }); 
    });

    return router;
}