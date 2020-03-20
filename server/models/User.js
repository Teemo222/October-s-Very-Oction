/* Student mongoose model */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
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
	}
});

UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			})
		})
	} else {
		next();
	}
})

const User = mongoose.model('User', UserSchema);
module.exports = { User }