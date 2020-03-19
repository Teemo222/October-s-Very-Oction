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
	password: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	purchaseHistory: {
		type: Array
	},
	sellingHistory: {
		type: Array,
	},
	address: {
		type: String,
		trim: true
	},
	creditCardNumber: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
    },
    tasks: {
        type: Array
    }
})

module.exports = { Authenticator }