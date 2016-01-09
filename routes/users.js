var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../public/javascripts/models/user');
var config = require('../public/javascripts/config');
mongoose.connect(config.database, function (err, db) {
  if (err){
    console.log('error...');
    console.log(err);
  }
  else
    console.log('database is connected and movieDB has been created...!')
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res) {
  console.log(req.body);

  (new User({
    name: req.body.name,
    password: req.body.password,
    admin: false,
    email: req.body.email
  })).save(function (err,data) {
    if (err) {
      res.json(500, { message: 'Could not connect to the database.'});
    } else {
      res.json(200, { message: 'Successfully register data ... ' });
    }
  });
});

module.exports = router;
