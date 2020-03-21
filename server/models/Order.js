/* Student mongoose model */
const mongoose = require('mongoose')

const Order = mongoose.model('Order', {
	price: Number,
	item : {
		type: mongoose.Schema.Types.ObjectId,
		ref:"Merchandise"
	},
	buyer : {
		type: mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	seller : {
		type: mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
})

module.exports = { Order }