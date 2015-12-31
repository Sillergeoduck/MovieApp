var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Review', new Schema({
	username: 'string',
	review: 'string',
	movieId: 'number',
	register: 'string'
}));