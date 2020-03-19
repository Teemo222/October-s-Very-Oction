/* Student mongoose model */
const mongoose = require('mongoose')

const User = mongoose.model('User', {
	username: {
		type: String,
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
	}
})

module.exports = { User }