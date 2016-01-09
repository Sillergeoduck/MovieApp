var express = require('express');
//var router = express.Router();
var router = require('./authenticate');
var mongoose = require('mongoose');
var Review = require('../public/javascripts/models/review');
var config = require('../public/javascripts/config');
mongoose.connect(config.database, function (err, db) {
    if (err){
        console.log('error...');
        console.log(err);
    }
    else
        console.log('database is connected and movieDB has been created...!')
});

router.post('/review', function (req, res) {
    console.log(req.body);

    (new Review({
        username: req.body.username,
        review: req.body.review,
        movieId: Number(req.body.movieId),
        register: req.body.register
    })).save(function (err,data) {
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});

router.put('/reviewId/:id', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
        if (err)
            return res.send(err);

        for (var prop in req.body) {
            review[prop] = req.body[prop];
        }

        // save the movie
        review.save(function(err) {
            if (err) {
                return res.send(err);
            }
            res.json(200, {message: 'Movie updated!'});
        });
    });
});

router.delete('/reviewId/:id', function (req, res) {
    Review.remove({
        _id: req.params.id
    }, function(err, review) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });

    });
});

module.exports = router;