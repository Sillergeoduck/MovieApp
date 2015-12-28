var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movieDB', function (err, db) {
    if (err){
        console.log('error...');
    }
    else
        console.log('database is connected and movieDB has been created...!')
});

var Review = mongoose.model('Review', {
    username: 'string',
    review: 'string',
    movieId: 'number',
    register: 'string'
});


router.get('/review', function (req, res) {
    //res.render('review');
    Review.find(function(err, reviews) {
        if (err)
            res.send(err);

        res.json(200, reviews);
    });
});

router.get('/review/:movieId', function (req, res) {
    Review.findOne({movieId:req.params.movieId },function(err, reviews) {
        if (err)
            res.send(err);

        res.json(200, reviews);
    });
});

router.get('/reviewId/:id', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
        if (err)
            res.send(err);
        res.json(200,review);
    });
});

router.post('/review', function (req, res) {
    console.log(req.body);

    (new Review({
        username: req.body.username,
        review: req.body.review,
        movieId: Number(req.body.movieId),
        registerDate: req.body.date
    })).save(function (err,data) {
            console.log(err);
            console.log(data);
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