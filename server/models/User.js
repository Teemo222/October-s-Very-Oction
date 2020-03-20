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

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema);
module.exports = { User }