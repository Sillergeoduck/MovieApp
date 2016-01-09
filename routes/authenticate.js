/**
 * Created by Hamid on 12/30/2015.
 */
var express 	= require('express');
var mongoose    = require('mongoose');
var apiRoutes = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./../public/javascripts/config'); // get our config file
var User = require('./../public/javascripts/models/user');
mongoose.createConnection(config.database); // connect to database
var app         = express();
app.set('superSecret', config.secret); // secret variable
var userSign = {};
// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
           /* if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }*/
            userSign = user;
            res.json({
                success: true,
                password: user.password
            });
        }

    });
});

apiRoutes.post('/authenticate/token', function(req, res) {
    var token = jwt.sign(userSign, app.get('superSecret'), {
       // expiresInMinutes: 1440 // expires in 24 hours
        expiresIn: 1440 // expires in 24 hours
    });

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        username : userSign.name
    });
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

apiRoutes.get('/check', function(req, res) {
    res.json(req.decoded);
});

module.exports = apiRoutes;