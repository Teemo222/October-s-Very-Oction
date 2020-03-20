/* Student mongoose model */
const mongoose = require('mongoose')

const Authenticator = mongoose.model('Authenticator', {
	username: {
		type: String,
		unique: true,  // unique username
		required: true,
		minlegth: 1,
		trim: true
	},
    tasks: {
        type: Array
    }
})

module.exports = { Authenticator }