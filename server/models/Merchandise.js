/* Student mongoose model */
const mongoose = require('mongoose')

const Merchandise = mongoose.model('Merchandise', {
	itemName: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	itemCategory: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	itemDescription: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	itemImageSrc: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	bids: {
		type: Array,
	},
	asks: {
		type: Array,
	},
	orderHistory: {
		type: Array,
	}
})

module.exports = { Merchandise }