/* Student mongoose model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Authenticator = mongoose.model('Authenticator', {
	userId: { 
		type: Schema.Types.ObjectId, 
	ref: 'User' 
	},
    tasks: {
        type: Array
    }
})

module.exports = { Authenticator }